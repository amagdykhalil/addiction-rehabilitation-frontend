import type { IAuthenticationResponse } from "@/entities/auth/model";
import { useAuth } from "@/entities/auth/model/useAuth";
import {
  getInitPromise,
  getStatusPromise,
  setAuthInitializerPromise,
} from "@/features/auth/models/AutoLogin";
import { refreshToken } from "@/shared/api";
import { isAtLoginPage, isAuthExpired } from "@/shared/lib/auth";
import { goToHome } from "@/shared/lib/auth/auth";
import { useRef } from "react";

export const useAuthInitializer = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { authData } = useAuth();

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function scheduleNext(newAuthData?: IAuthenticationResponse | null) {
    if (!newAuthData) return;

    const expiresAt = new Date(newAuthData.expiresOn).getTime();
    const refreshThreshold = Number(
      import.meta.env.APP_TOKEN_REFRESH_THRESHOLD,
    );
    const msUntilThreshold = expiresAt - Date.now() - refreshThreshold;

    clearTimer();

    timerRef.current = setTimeout(async () => {
      await triggerRefresh();
    }, msUntilThreshold);
  }

  async function triggerRefresh() {
    try {
      const newAuth = await refreshToken();
      if (newAuth) await scheduleNext(newAuth);
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  }

  if (getInitPromise() === null) {
    // If we already have a valid, unexpired token, skip refreshing
    if (authData && !isAuthExpired(authData)) {
      // Immediately schedule the next auto-refresh
      scheduleNext(authData);
      if (isAtLoginPage()) goToHome();
      // Mark as "done" by setting to a resolved promise
      setAuthInitializerPromise(Promise.resolve(), "fulfilled");
    } else {
      // Otherwise, attempt a refresh
      setAuthInitializerPromise(
        (async () => {
          try {
            setAuthInitializerPromise(getInitPromise(), "pending");
            const newAuth = await refreshToken();
            if (newAuth) {
              scheduleNext(newAuth);
              if (isAtLoginPage()) goToHome();
            }
          } catch (err) {
            console.error("Token refresh failed:", err);
            setAuthInitializerPromise(Promise.resolve(), "rejected");
          } finally {
            setAuthInitializerPromise(Promise.resolve(), "fulfilled");
          }
        })(),
        "pending",
      );
    }
  }

  // Suspend render until initialization promise resolves
  if (getStatusPromise() === "pending") {
    throw getInitPromise();
  }

  return null;
};
