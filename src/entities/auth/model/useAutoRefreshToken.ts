// src/shared/hooks/useAutoRefreshToken.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { store } from "@/app/stores";
import {  type IAuthenticationResponse } from "@/entities/auth/model";
import { localStorageService } from "@/shared/lib";

import { attemptRefresh } from "@/shared/api"; 
import { TOKEN_REFRESH_INTERVAL, TOKEN_REFRESH_THRESHOLD } from "@/shared/config";
import { refreshLock } from "@/shared/lib/auth";

export function useAutoRefreshToken() {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(async () => {
      const tokenData =
        store.getState().authSlice.authData ||
        localStorageService.get<IAuthenticationResponse>("authData");

      const exp = tokenData?.userId
        ? new Date(tokenData.accessTokenExpiresAt).getTime()
        : null;

         // trigger a refresh if expiry is within the threshold
      if (exp && exp - Date.now() < TOKEN_REFRESH_THRESHOLD) {
          if (refreshLock.isLocked()) {
            return null;
          }
          
          refreshLock.lock();
          await attemptRefresh();
      }
    }, TOKEN_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);
}