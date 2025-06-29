// src/features/auth/store/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthenticationResponse } from "./types";
import { localStorageService } from "@/shared/lib";

export const AUTH_KEY = "auth";

interface AuthState {
  authData: IAuthenticationResponse | null;
}

const initialState: AuthState = {
  authData:{
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJhaG1lZC5tYWdkeS5kZXY5QGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTc1MTExMjAwMSwiZXhwIjoxNzUxMTk4NDAxLCJpYXQiOjE3NTExMTIwMDEsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3QifQ.M19stb7YMS4vB4CJRK7EFpvItz-vSrDVhHEXICe3RJA",
    expiresOn: "2026-06-29",
    userId: "1",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<IAuthenticationResponse>) {
      state.authData = action.payload;
      localStorageService.set(AUTH_KEY, action.payload);
    },
    logout(state) {
      state.authData = null;
      localStorageService.remove(AUTH_KEY);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
