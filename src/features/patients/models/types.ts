import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import { NAMESPACE_KEYS, VALIDATOR_KEYS } from "@/shared/i18n/keys";
import type { TFunction } from "i18next";
import { z } from "zod";

export const SECTION_KEYS = [
  "changeEmail",
  "changePassword",
  "notifications",
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export const getChangePasswordSchema = (t: TFunction) =>
  z
    .object({
      oldPassword: z.string().min(1, {
        message: t(AUTH_KEYS.errors.passwordRequired, {
          ns: NAMESPACE_KEYS.auth,
        }),
      }),
      newPassword: z
        .string()
        .min(8, {
          message: t(AUTH_KEYS.errors.passwordTooShort, {
            ns: NAMESPACE_KEYS.auth,
          }),
        })
        .max(20, {
          message: t(VALIDATOR_KEYS.password.passwordMaxLength, {
            ns: NAMESPACE_KEYS.validator,
          }),
        })
        .regex(/[0-9]/, {
          message: t(VALIDATOR_KEYS.password.passwordDigit, {
            ns: NAMESPACE_KEYS.validator,
          }),
        })
        .regex(/[A-Z]/, {
          message: t(VALIDATOR_KEYS.password.passwordUpper, {
            ns: NAMESPACE_KEYS.validator,
          }),
        })
        .regex(/[a-z]/, {
          message: t(VALIDATOR_KEYS.password.passwordLower, {
            ns: NAMESPACE_KEYS.validator,
          }),
        })
        .regex(/[^a-zA-Z0-9]/, {
          message: t(VALIDATOR_KEYS.password.passwordNonAlpha, {
            ns: NAMESPACE_KEYS.validator,
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
