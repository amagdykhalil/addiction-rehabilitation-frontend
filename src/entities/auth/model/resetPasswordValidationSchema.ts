import { z } from "zod";
import type { TFunction } from "i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { AUTH_KEYS } from "../lib/translationKeys";

export const getResetPasswordValidationSchema = (t: TFunction) => {
  return z
    .object({
      newPassword: z
        .string()
        .min(8, {
          message: t(AUTH_KEYS.errors.passwordTooShort, {
            ns: NAMESPACE_KEYS.auth,
          }),
        })
        .max(20, {
          message: t(AUTH_KEYS.errors.passwordMaxLength, {
            ns: NAMESPACE_KEYS.auth,
          }),
        })
        .regex(/[0-9]/, {
          message: t(AUTH_KEYS.errors.passwordDigit, {
            ns: NAMESPACE_KEYS.auth,
          }),
        })
        .regex(/[A-Z]/, {
          message: t(AUTH_KEYS.errors.passwordUpper, {
            ns: NAMESPACE_KEYS.auth,
          }),
        })
        .regex(/[a-z]/, {
          message: t(AUTH_KEYS.errors.passwordLower, {
            ns: NAMESPACE_KEYS.auth,
          }),
        })
        .regex(/[^a-zA-Z0-9]/, {
          message: t(AUTH_KEYS.errors.passwordNonAlpha, {
            ns: NAMESPACE_KEYS.auth,
          }),
        }),
      confirmPassword: z.string().min(1, {
        message: t(AUTH_KEYS.errors.confirmPasswordRequired, {
          ns: NAMESPACE_KEYS.auth,
        }),
      }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t(AUTH_KEYS.errors.passwordsDoNotMatch, {
        ns: NAMESPACE_KEYS.auth,
      }),
      path: ["confirmPassword"],
    });
};
