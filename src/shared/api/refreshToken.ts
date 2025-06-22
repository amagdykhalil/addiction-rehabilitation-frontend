import type { IAuthenticationResponse } from "@/entities/auth/model/types";
import { handleAuthorized } from "../lib/auth";
import { retryQueuedRequests } from "./requestQueue";
import type { ApiResponse } from "../types";
import { handleUnauthorized } from "../lib";
import { setRefreshing, isTokenRefreshing } from "../lib/auth/refreshState";

const API_BASE = import.meta.env.APP_API_URL;

export async function refreshToken(): Promise<IAuthenticationResponse | null> {
  if (isTokenRefreshing()) return null;

  setRefreshing(true);
  try {
    const res = await fetch(`${API_BASE}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = (await res.json()) as ApiResponse<IAuthenticationResponse>;

    if (!data.isSuccess || !data.result) {
      throw new Error("Invalid response data");
    }

    handleAuthorized(data.result);

    // Retry queued requests
    await retryQueuedRequests();

    return data.result;
  } catch {
    handleUnauthorized();
    return null;
  } finally {
    setRefreshing(false);
  }
}
