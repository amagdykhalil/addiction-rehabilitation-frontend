// src/features/auth/store/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthenticationResponse } from "./types";
import { localStorageService } from "@/shared/lib";

interface AuthState {
  authData: IAuthenticationResponse | null;
}

export const AUTH_KEY = "auth_data";

const initialState: AuthState = {
  authData: localStorageService.get(AUTH_KEY) || null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<IAuthenticationResponse>) {
      state.authData = action.payload;
      localStorageService.set(AUTH_KEY,action.payload);
    },
    logout(state) {
      state.authData = null;
      localStorageService.remove(AUTH_KEY);
    },
  },
});


export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;