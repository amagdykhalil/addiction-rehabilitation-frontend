import type { Patient } from "@/entities/patients/model";
import { Gender } from "@/entities/patients/model";
import type { UseFormReturn } from "react-hook-form";
import type { PatientFormData } from "../types";

/**
 * Creates default form values for a patient form
 */
export function createPatientFormDefaultValues(
  patient?: Patient | null,
): PatientFormData {
  return {
    BirthDate: patient?.birthDate || "",
    FirstName: patient?.firstName || "",
    SecondName: patient?.secondName || "",
    ThirdName: patient?.thirdName || "",
    LastName: patient?.lastName || "",
    Gender: patient?.gender ?? Gender.Male,
    CallPhoneNumber: patient?.callPhoneNumber || "",
    NationalIdNumber: patient?.nationalIdNumber || "",
    PassportNumber: patient?.passportNumber || "",
    NationalityId: patient?.nationalityId ? Number(patient.nationalityId) : 0,
    NationalityName: patient?.nationalityName || "",
    PersonalImageURL: patient?.personalImageURL || "",
    idDocumentType: patient?.nationalIdNumber ? "national" : "passport",
  };
}

/**
 * Resets form with patient data
 */
export function resetFormWithPatientData(
  form: UseFormReturn<PatientFormData>,
  patient: Patient | null,
): void {
  if (patient) {
    form.reset(createPatientFormDefaultValues(patient));
  }
}

/**
 * Maps PatientFormData to Patient type for API calls
 */
export function mapFormDataToPatient(
  data: PatientFormData,
  patientId: string,
): Omit<Patient, "FullName"> {
  return {
    id: patientId,
    birthDate: data.BirthDate,
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
  };
}
