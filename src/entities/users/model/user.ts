import { z } from "zod";
import { Gender } from "@/entities/patients/model";

// Enums for query parameters
export enum UserRole {
  Admin = 0,
  Doctor = 1,
  Nurse = 2,
  Receptionist = 3,
}

export enum UserStatus {
  Active = 0,
  Inactive = 1,
  Suspended = 2,
}

export enum UserSortBy {
  Id,
  FirstName,
  LastName,
  Email,
  Role,
  Status,
  CreatedAt,
}

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  thirdName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  gender: z.nativeEnum(Gender),
  callPhoneNumber: z.string(),
  nationalIdNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  nationalityId: z.number(),
  nationalityName: z.string(),
  personalImageURL: z.string().optional(),
  role: z.nativeEnum(UserRole),
  status: z.nativeEnum(UserStatus),
  createdAt: z.string(),
  lastLoginAt: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export interface PaginatedResult<T> {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  data: T[];
}