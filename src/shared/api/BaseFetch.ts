// src/shared/services/api.ts
import { store } from "@/app/stores";
import { type IAuthenticationResponse } from "@/entities/auth/model";
import { localStorageService } from "../lib";
import { attachAuthHeader, isTokenRefreshing } from "../lib/auth";
import { AUTH_KEY } from "@/entities/auth/model/authSlice";
import type { ApiResponse } from "../types";
import { refreshToken } from "./refreshToken";
import { addToQueue } from "./requestQueue";
const API_BASE = import.meta.env.APP_API_URL;

export async function BaseFetch<T = unknown>(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<ApiResponse<T>> {
  // Attach token

  try {
    const authData =
      store.getState().authSlice.authData ||
      localStorageService.get<IAuthenticationResponse>(AUTH_KEY);

    const token = authData?.accessToken;
    const headers = new Headers(init.headers);
    if (token) attachAuthHeader(headers, token);

    let response = await fetch(`${API_BASE}${input}`, {
      ...init,
      signal: init.signal,
      headers,
      credentials: "include",
    });
    // If 401 → try refresh under lock
    if (response.status === 401) {
      if (isTokenRefreshing()) {
        // Queue this request to be retried after refresh
        return new Promise((resolve) => {
          addToQueue(async () => {
            const retryResponse = await BaseFetch<T>(input, init);
            resolve(retryResponse);
            return retryResponse;
          });
        });
      }

      const newAuth = await refreshToken();
      if (newAuth) {
        // retry original request with fresh token
        attachAuthHeader(headers, token);
        response = await fetch(`${API_BASE}${input}`, {
          ...init,
          headers,
          credentials: "include",
        });
      }
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        statusCode: 204,
        isSuccess: true,
        result: null as unknown as T,
        errors: [],
      } as ApiResponse;
    }

    const data = (await response.json()) as ApiResponse<T>;
    // Return the ApiResponse object directly, even if it's not successful
    // This allows the calling code to handle the error appropriately
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.log("❌ Request was cancelled");
    } else {
      console.error("🔥 Request failed:", error);
    }

    // Return a default error response to satisfy the return type
    return {
      statusCode: 500,
      isSuccess: false,
      result: null as unknown as T,
      errors: [{ message: "An unexpected error occurred" }],
    } as ApiResponse<T>;
  }
}
