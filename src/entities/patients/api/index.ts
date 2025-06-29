import { BaseFetch } from "@/shared/api";
import type {
  Patient,
  PaginatedResult,
  Gender,
  PatientSortBy,
  SortDirection,
} from "../model";
import { isNotNil } from "@/shared/lib/utils";
// import type { ApiResponse } from "@/shared/types";

// 1. Get a single patient by id
async function getPatient(id: string) {
  return BaseFetch<Patient>(`/Patients/${id}`);
}

// 2. Get a list of patients with filters and pagination
export interface GetPatientsParams {
  pageNumber?: number;
  pageSize?: number;
  searchQuery?: string;
  gender?: Gender;
  countryId?: number;
  sortBy?: PatientSortBy;
  sortDirection?: SortDirection;
}

async function getPatients(
  params: GetPatientsParams = {},
  signal?: AbortSignal,
) {
  const query = new URLSearchParams();
  if (params.pageNumber)
    query.append("pageNumber", params.pageNumber.toString());
  if (params.pageSize) query.append("pageSize", params.pageSize.toString());
  if (params.searchQuery) query.append("searchQuery", params.searchQuery);
  if (isNotNil(params.gender)) query.append("gender", params.gender.toString());
  if (isNotNil(params.countryId))
    query.append("nationalityId", params.countryId.toString());
  if (isNotNil(params.sortBy)) query.append("sortBy", params.sortBy.toString());
  if (isNotNil(params.sortDirection))
    query.append("sortDirection", params.sortDirection.toString());

  const result = await BaseFetch<PaginatedResult<Patient>>(
    `/Patients?${query.toString()}`,
    {
      signal,
    },
  );

  return result;
}

// 3. Add a new patient
async function addPatient(patient: Omit<Patient, "Id" | "FullName">) {
  return BaseFetch<number>("/Patients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
}

// 4. Update a patient
async function updatePatient(patient: Omit<Patient, "FullName">) {
  return BaseFetch<boolean>(`/Patients`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
}

// 5. Delete a patient
async function deletePatient(id: string) {
  return BaseFetch<null>(`/Patients/${id}`, {
    method: "DELETE",
  });
}

// Get patient by national ID
async function getPatientByNationalId(nationalId: string) {
  return BaseFetch<Patient>(`/Patients/by-national-id/${nationalId}`);
}

// Get patient by passport number
async function getPatientByPassportNumber(passportNumber: string) {
  return BaseFetch<Patient>(`/Patients/by-passport/${passportNumber}`);
}

// Check if patient exists by ID
async function existsById(id: string) {
  return BaseFetch<boolean>(`/Patients/exists-by-id/${id}`);
}

// Check if patient exists by passport number
async function existsByPassport(passportNumber: string) {
  return BaseFetch<number | undefined>(
    `/Patients/exists-by-passport/${passportNumber}`,
  );
}

// Check if patient exists by national ID
async function existsByNationalId(nationalId: string) {
  return BaseFetch<number | undefined>(
    `/Patients/exists-by-national-id/${nationalId}`,
  );
}

export const patientsApi = {
  getPatient,
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
  getPatientByNationalId,
  getPatientByPassportNumber,
  existsById,
  existsByPassport,
  existsByNationalId,
};
