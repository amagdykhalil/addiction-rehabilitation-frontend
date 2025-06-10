// src/shared/lib/authBroadcast.ts

import { store } from '@/app/stores';
import { logout, setCredentials } from '@/entities/auth/model';
import { BROADCAST_CHANNEL, BROADCAST_TYPE } from '../types/broadcast';
import type { IAuthenticationResponse } from '@/entities/auth/model/types';

export const broadcast = new BroadcastChannel(BROADCAST_CHANNEL.AUTH);

broadcast.onmessage = (event) => {
  switch (event.data?.type) {

    case BROADCAST_TYPE.LOGOUT:
      store.dispatch(logout());
      window.location.href = '/login';
      break;
    case BROADCAST_TYPE.TOKEN_REFRESHED:
      const authData = event.data.payload as IAuthenticationResponse;
      store.dispatch(setCredentials(authData));
      break;
  }
};