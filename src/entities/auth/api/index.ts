import { BaseFetch } from "@/shared/api/BaseFetch";
import type { ILoginRequest, IAuthenticationResponse } from "../model/types";

interface IForgotPasswordRequest {
  email: string;
}
interface IResetPasswordRequest {
  email: string;
  resetCode: string;
  newPassword: string;
}

export const authApi = {
  login: (data: ILoginRequest) =>
    BaseFetch<IAuthenticationResponse>("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
  logout: () =>
    BaseFetch<void>("/auth/revoke-token", {
      method: "POST",
    }),
  forgotPassword: (data: IForgotPasswordRequest) =>
    BaseFetch("/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
  resetPassword: (data: IResetPasswordRequest) =>
    BaseFetch("/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
};
