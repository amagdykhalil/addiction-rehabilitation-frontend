import { z } from "zod";
import type { TFunction } from "i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";

export const getForgotPasswordValidationSchema = (t: TFunction) => {
  return z.object({
    email: z
      .string()
      .email({
        message: t(AUTH_KEYS.errors.invalidEmail, { ns: NAMESPACE_KEYS.auth }),
      })
      .min(1, {
        message: t(AUTH_KEYS.errors.emailRequiredForgot, {
          ns: NAMESPACE_KEYS.auth,
        }),
      }),
  });
};
