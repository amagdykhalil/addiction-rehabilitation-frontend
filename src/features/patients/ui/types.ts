import { z } from "zod";
import type { TFunction } from "i18next";
import { VALIDATOR_KEYS } from "@/shared/i18n/keys/validatorKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { Gender } from "@/shared/types/enums";

// Create validation schema function that accepts translation function
export const createPatientFormSchema = (t: TFunction) =>
  z
    .object({
      BirthDate: z
        .string()
        .min(1, t(VALIDATOR_KEYS.required, { ns: NAMESPACE_KEYS.validator }))
        .refine((date) => new Date(date) < new Date(), {
          message: t(VALIDATOR_KEYS.mustBeInPast, {
            ns: NAMESPACE_KEYS.validator,
          }),
        }),
      FirstName: z
        .string()
        .min(1, t(VALIDATOR_KEYS.required, { ns: NAMESPACE_KEYS.validator }))
        .min(
          2,
          t(VALIDATOR_KEYS.betweenLength, {
            ns: NAMESPACE_KEYS.validator,
            min: 2,
            max: 50,
          })
        )
        .max(
          50,
          t(VALIDATOR_KEYS.betweenLength, {
            ns: NAMESPACE_KEYS.validator,
            min: 2,
            max: 50,
          })
        ),
      SecondName: z
        .string()
        .min(1, t(VALIDATOR_KEYS.required, { ns: NAMESPACE_KEYS.validator }))
        .min(
          2,
          t(VALIDATOR_KEYS.betweenLength, {
            ns: NAMESPACE_KEYS.validator,
            min: 2,
            max: 50,
          })
        )
        .max(
          50,
          t(VALIDATOR_KEYS.betweenLength, {
            ns: NAMESPACE_KEYS.validator,
            min: 2,
            max: 50,
          })
        ),
      ThirdName: z
        .string()
        .min(
          2,
          t(VALIDATOR_KEYS.betweenLength, {
            ns: NAMESPACE_KEYS.validator,
            min: 2,
            max: 50,
          })
        )
        .max(
          50,
          t(VALIDATOR_KEYS.betweenLength, {
            ns: NAMESPACE_KEYS.validator,
            min: 2,
            max: 50,
          })
        )
        .optional()
        .or(z.literal("")),
      LastName: z
        .string()
        .min(1, t(VALIDATOR_KEYS.required, { ns: NAMESPACE_KEYS.validator }))
        .min(
          2,
          t(VALIDATOR_KEYS.betweenLength, {
            ns: NAMESPACE_KEYS.validator,
            min: 2,
            max: 50,
          })
        )
        .max(
          50,
          t(VALIDATOR_KEYS.betweenLength, {
            ns: NAMESPACE_KEYS.validator,
            min: 2,
            max: 50,
          })
        ),
      Gender: z.nativeEnum(Gender, {
        errorMap: () => ({
          message: t(VALIDATOR_KEYS.isInEnum, { ns: NAMESPACE_KEYS.validator }),
        }),
      }),
      CallPhoneNumber: z
        .string()
        .min(1, t(VALIDATOR_KEYS.required, { ns: NAMESPACE_KEYS.validator }))
        .regex(
          /^(010|011|012|015)[0-9]{8}$/,
          t(VALIDATOR_KEYS.phoneNumberInvalid, {
            ns: NAMESPACE_KEYS.validator,
          })
        ),
      NationalIdNumber: z.string().optional(),
      PassportNumber: z.string().optional(),
      NationalityId: z
        .number()
        .min(1, t(VALIDATOR_KEYS.required, { ns: NAMESPACE_KEYS.validator })),
      NationalityName: z.string().optional(),
      PersonalImageURL: z.string().optional(),
      idDocumentType: z.enum(["national", "passport"]),
    })
    .refine(
      (data) => {
        // Either NationalIdNumber or PassportNumber must be provided
        return !!(data.NationalIdNumber?.trim() || data.PassportNumber?.trim());
      },
      {
        message: t(VALIDATOR_KEYS.identificationRequired, {
          ns: NAMESPACE_KEYS.validator,
        }),
        path: ["idDocumentType"],
      }
    )
    .refine(
      (data) => {
        // If NationalIdNumber is provided, it must match the format
        if (data.NationalIdNumber?.trim()) {
          return /^[0-9]{14}$/.test(data.NationalIdNumber);
        }
        return true;
      },
      {
        message: t(VALIDATOR_KEYS.invalidFormat, {
          ns: NAMESPACE_KEYS.validator,
        }),
        path: ["NationalIdNumber"],
      }
    )
    .refine(
      (data) => {
        // If PassportNumber is provided, it must match the format
        if (data.PassportNumber?.trim()) {
          return /^[A-Z0-9]{6,9}$/.test(data.PassportNumber);
        }
        return true;
      },
      {
        message: t(VALIDATOR_KEYS.invalidFormat, {
          ns: NAMESPACE_KEYS.validator,
        }),
        path: ["PassportNumber"],
      }
    );

export type PatientFormData = z.infer<
  ReturnType<typeof createPatientFormSchema>
>;

export interface PatientFormProps {
  patientId?: string;
  onSubmit: (data: PatientFormData) => void;
  isLoading?: boolean;
}
