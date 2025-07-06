import { Gender } from "@/shared/types/enums";
import { z } from "zod";

export enum UserSortBy {
  Id,
  FirstName,
  LastName,
  NationalId,
}
export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
  secondName: z.string(),
  thirdName: z.string().optional(),
  lastName: z.string(),
  gender: z.nativeEnum(Gender),
  callPhoneNumber: z.string(),
  nationalIdNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  nationalityId: z.number(),
  nationalityName: z.string(),
  personalImageURL: z.string().optional(),
  isActive: z.boolean(),
  roles: z.array(z.string()),
});

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type Role = z.infer<typeof RoleSchema>;
