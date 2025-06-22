import type { IAuthenticationResponse } from "@/entities/auth/model/types";

export const isAuthExpired = (
  authData: IAuthenticationResponse | null,
): boolean => {
  if (!authData?.expiresOn) return true;

  const expiresAt = new Date(authData.expiresOn).getTime();
  const now = Date.now();

  return now >= expiresAt;
};
