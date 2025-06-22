// src/features/auth/model/types.ts
import { z } from "zod";

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export type ILoginRequest = z.infer<typeof LoginRequestSchema>;

export const AuthenticationResponseSchema = z.object({
  userId: z.string(),
  accessToken: z.string(),
  expiresOn: z.string(),
});

export type IAuthenticationResponse = z.infer<
  typeof AuthenticationResponseSchema
>;
