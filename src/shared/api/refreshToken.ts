import type { IAuthenticationResponse } from '@/entities/auth/model/types';
import { setCredentials } from '@/entities/auth/model';
import { refreshLock } from '../lib/auth';
import { store } from '@/app/stores';
import { retryQueuedRequests } from './requestQueue';
import type { ApiResponse } from '../types';
import { BROADCAST_TYPE } from '../types/broadcast';
import { handleUnauthorized } from '../lib';
import { broadcast } from '../lib/broadcasts';

const API_BASE = import.meta.env.APP_API_URL;

export async function attemptRefresh(): Promise<IAuthenticationResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      handleUnauthorized();
      return null;
    }

    const data = await res.json() as ApiResponse<IAuthenticationResponse>;
    
    if (!data.isSuccess || !data.result) {
      handleUnauthorized();
      return null;
    }

    store.dispatch(setCredentials(data.result));
    broadcast.postMessage({ 
      type: BROADCAST_TYPE.TOKEN_REFRESHED, 
      payload: data.result 
    });
    
    // Retry queued requests
    await retryQueuedRequests();

    return data.result;
  } catch {
    handleUnauthorized();
    return null;
  } finally {
    refreshLock.unlock();
  }
}

export const refreshToken = async (): Promise<IAuthenticationResponse | null> => {
  if (refreshLock.isLocked()) {
    return null;
  }

  refreshLock.lock();
  return attemptRefresh();
};