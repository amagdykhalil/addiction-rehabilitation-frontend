// src/shared/lib/authBroadcast.ts

import { store } from "@/app/stores";
import { logout, setCredentials } from "@/entities/auth/model";
import { BROADCAST_CHANNEL, BROADCAST_TYPE } from "@/shared/types/broadcast";
import type { IAuthenticationResponse } from "@/entities/auth/model/types";
import { mainQueryClient } from "@/app/queryClient";

import { ROUTES } from "@/shared/routes";
import { isAtLoginPage, isPublicRoute } from "@/shared/lib/auth";

export const broadcast = new BroadcastChannel(BROADCAST_CHANNEL.AUTH);

broadcast.onmessage = (event) => {
  switch (event.data?.type) {
    case BROADCAST_TYPE.LOGOUT:
      mainQueryClient.clear();

      store.dispatch(logout());
      if (!isPublicRoute()) window.location.href = ROUTES.LOGIN;
      break;

    case BROADCAST_TYPE.TOKEN_GENERATED: {
      const authData = event.data.payload as IAuthenticationResponse;
      store.dispatch(setCredentials(authData));
      if (isAtLoginPage()) window.location.href = "/";
      break;
    }
  }
};
