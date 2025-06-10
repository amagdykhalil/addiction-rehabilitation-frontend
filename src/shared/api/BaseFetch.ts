// src/shared/services/api.ts
import { store } from '@/app/stores';
import { type IAuthenticationResponse } from '@/entities/auth/model';
import { localStorageService } from '../lib';
import { refreshLock } from '../lib/auth';
import { AUTH_KEY } from '@/entities/auth/model/authSlice';
import type { ApiResponse } from '../types';
import { attemptRefresh } from './refreshToken';
import { addToQueue } from './requestQueue';

const API_BASE = import.meta.env.APP_API_URL;

export async function BaseFetch<T = unknown>(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<ApiResponse<T>> {
  // Attach token
  const authData = store.getState().authSlice.authData
    || localStorageService.get<IAuthenticationResponse>(AUTH_KEY);
    
  const token = authData?.accessToken;
  const headers = new Headers(init.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);

  let response = await fetch(`${API_BASE}${input}`, {
    ...init,
    headers,
    credentials: 'include',
  });

  // If 401 → try refresh under lock
  if (response.status === 401) {
    if (refreshLock.isLocked()) {
      // Queue this request to be retried after refresh
      return new Promise((resolve) => {
        addToQueue(async () => {
          try {
            const retryResponse = await BaseFetch<T>(input, init);
            resolve(retryResponse);
            return retryResponse;
          } catch (error) {
            throw error;
          }
        });
      });
    }

    refreshLock.lock();
    const newAuth = await attemptRefresh();
    if (newAuth) {
      // retry original request with fresh token
      headers.set('Authorization', `Bearer ${newAuth.accessToken}`);
      response = await fetch(`${API_BASE}${input}`, {
        ...init,
        headers,
        credentials: 'include',
      });
    }
  }

  const data = await response.json() as ApiResponse<T>;
  
  // Handle API errors
  if (!data.isSuccess) {
    const error = new Error(data.errors?.[0]?.message || 'An error occurred');
    error.name = 'ApiError';
    throw error;
  }

  return data;
}
