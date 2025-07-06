import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { VALIDATOR_KEYS } from "@/shared/i18n/keys";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createAddRolesSchema = (t: TFunction) =>
  z.object({
    roles: z
      .array(
        z.object({
          name_en: z
            .string()
            .min(
              2,
              t(VALIDATOR_KEYS.required, { ns: NAMESPACE_KEYS.validator }),
            )
            .max(
              256,
              t(VALIDATOR_KEYS.betweenLength, {
                ns: NAMESPACE_KEYS.validator,
                min: 2,
                max: 256,
              }),
            ),
          name_ar: z
            .string()
            .min(
              2,
              t(VALIDATOR_KEYS.required, { ns: NAMESPACE_KEYS.validator }),
            )
            .max(
              256,
              t(VALIDATOR_KEYS.betweenLength, {
                ns: NAMESPACE_KEYS.validator,
                min: 2,
                max: 256,
              }),
            ),
        }),
      )
      .min(1),
  });

export type AddRolesSchemaData = z.infer<
  ReturnType<typeof createAddRolesSchema>
>;

export const CreateEditRoleSchema = (t: TFunction) =>
  z.object({
    name_en: z
      .string()
      .min(2, t(VALIDATOR_KEYS.required, { ns: NAMESPACE_KEYS.validator }))
      .max(
        256,
        t(VALIDATOR_KEYS.betweenLength, {
          ns: NAMESPACE_KEYS.validator,
          min: 2,
          max: 256,
        }),
      ),
    name_ar: z
      .string()
      .min(2, t(VALIDATOR_KEYS.required, { ns: NAMESPACE_KEYS.validator }))
      .max(
        256,
        t(VALIDATOR_KEYS.betweenLength, {
          ns: NAMESPACE_KEYS.validator,
          min: 2,
          max: 256,
        }),
      ),
  });

export type EditRoleSchemaData = z.infer<
  ReturnType<typeof CreateEditRoleSchema>
>;
