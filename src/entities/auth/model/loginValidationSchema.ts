import { z } from "zod";
import type { TFunction } from "i18next";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";

export const getLoginValidationSchema = (t: TFunction) => {
  return z.object({
    email: z
      .string()
      .email({
        message: t(AUTH_KEYS.errors.invalidEmail, { ns: NAMESPACE_KEYS.auth }),
      })
      .min(1, {
        message: t(AUTH_KEYS.errors.emailRequired, { ns: NAMESPACE_KEYS.auth }),
      }),
    password: z.string().min(6, {
      message: t(AUTH_KEYS.errors.passwordMinLength, {
        ns: NAMESPACE_KEYS.auth,
        count: 6,
      }),
    }),
  });
};
