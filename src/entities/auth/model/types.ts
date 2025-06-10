// src/features/auth/model/types.ts
export interface IAuthenticationResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  userId: string;
}