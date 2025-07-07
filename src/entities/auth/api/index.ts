import { BaseFetch } from "@/shared/api";
import type {
  ILoginRequest,
  IAuthenticationResponse,
} from "@/entities/auth/model/types";

interface IForgotPasswordRequest {
  email: string;
}
interface IResetPasswordRequest {
  email: string;
  resetCode: string;
  newPassword: string;
}
interface IChangePasswordRequest {
  userId: number;
  oldPassword: string;
  newPassword: string;
}
interface IChangeEmailRequest {
  userId: number;
  newEmail: string;
}

async function login(data: ILoginRequest) {
  return BaseFetch<IAuthenticationResponse>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
async function logout() {
  return BaseFetch<void>("/auth/revoke-token", {
    method: "POST",
  });
}
async function forgotPassword(data: IForgotPasswordRequest) {
  return BaseFetch("/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
async function resetPassword(data: IResetPasswordRequest) {
  return BaseFetch("/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
async function resendConfirmationEmail(email: string) {
  return BaseFetch("/auth/resend-confirmation-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}
async function changePassword(data: IChangePasswordRequest) {
  return BaseFetch("/auth/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
async function requestChangeEmail(data: IChangeEmailRequest) {
  return BaseFetch("/auth/change-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export const authApi = {
  login,
  logout,
  forgotPassword,
  resetPassword,
  resendConfirmationEmail,
  changePassword,
  requestChangeEmail,
};
