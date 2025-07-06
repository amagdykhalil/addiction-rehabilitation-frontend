import type { UseFormReturn } from "react-hook-form";
import type { UserFormData } from "../types";
import { Gender } from "@/shared/types/enums";
import type { User } from "@/entities/users/model";

/**
 * Creates default form values for a User form
 */
export function createUserFormDefaultValues(User?: User | null): UserFormData {
  return {
    FirstName: User?.firstName || "",
    SecondName: User?.secondName || "",
    ThirdName: User?.thirdName || "",
    LastName: User?.lastName || "",
    Gender: User?.gender ?? Gender.Male,
    CallPhoneNumber: User?.callPhoneNumber || "",
    NationalIdNumber: User?.nationalIdNumber || "",
    PassportNumber: User?.passportNumber || "",
    NationalityId: User?.nationalityId ? Number(User.nationalityId) : 0,
    NationalityName: User?.nationalityName || "",
    PersonalImageURL: User?.personalImageURL || "",
    idDocumentType: User?.nationalIdNumber ? "national" : "passport",
    Email: "",
    Roles: [],
  };
}

/**
 * Resets form with User data
 */
export function resetFormWithUserData(
  form: UseFormReturn<UserFormData>,
  User: User | null
): void {
  if (User) {
    form.reset(createUserFormDefaultValues(User));
  }
}

/**
 * Maps UserFormData to User type for API calls
 */
export function mapFormDataToUser(
  data: UserFormData,
  UserId: string
): Omit<User, "isActive"> {
  return {
    id: Number(UserId),
    firstName: data.FirstName,
    secondName: data.SecondName,
    thirdName: data.ThirdName || "",
    lastName: data.LastName,
    gender: data.Gender,
    callPhoneNumber: data.CallPhoneNumber,
    nationalIdNumber: data.NationalIdNumber || "",
    passportNumber: data.PassportNumber || "",
    nationalityId: data.NationalityId,
    nationalityName: data.NationalityName || "",
    personalImageURL: data.PersonalImageURL || "",
    email: data?.Email || "",
    roles: (data?.Roles || []).map(String),
  };
}
