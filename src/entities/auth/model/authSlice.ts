// src/features/auth/store/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthenticationResponse } from "./types";
import { localStorageService } from "@/shared/lib";

export const AUTH_KEY = "auth";

interface AuthState {
  authData: IAuthenticationResponse | null;
}

const initialState: AuthState = {
  authData: localStorageService.get(AUTH_KEY) ||
    { 
      userId: "1",
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJhbTI1OTIzNzlAZ21haWwuY29tIiwicm9sZSI6WyJBZG1pbiIsIlN1cGVyIEFkbWluIl0sIm5iZiI6MTc1MjQ0MTc1MCwiZXhwIjoxNzUyNTI4MTUwLCJpYXQiOjE3NTI0NDE3NTAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3QifQ.qVSSV0QDE0Q7wSsEKQXa-oLcc0AGNLOtbnmc0ngV8pU",
  expiresOn: "2025-07-14",
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
