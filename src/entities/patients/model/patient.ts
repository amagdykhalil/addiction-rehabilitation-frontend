import { Gender } from "@/shared/types/enums";
import { z } from "zod";

// Enums for query parameters

export enum PatientSortBy {
  Id,
  FirstName,
  LastName,
  NationalId,
}

export const PatientSchema = z.object({
  id: z.string(),
  birthDate: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  thirdName: z.string(),
  lastName: z.string(),
  gender: z.nativeEnum(Gender),
  callPhoneNumber: z.string(),
  nationalIdNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  nationalityId: z.number(),
  nationalityName: z.string(),
  personalImageURL: z.string().optional(),
});

export type Patient = z.infer<typeof PatientSchema>;
