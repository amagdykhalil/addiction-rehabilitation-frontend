import { useQuery } from "@tanstack/react-query";
import { patientsApi } from "@/entities/patients/api";
import type { Patient } from "@/entities/patients/model";
import type { ApiResponse } from "@/shared/types";
import { patientsKeys } from "./patientsKeys";

export function useGetPatientByPassportNumber(passportNumber: string) {
  const query = useQuery<ApiResponse<Patient>, Error>({
    queryKey: [...patientsKeys.all, "by-passport", passportNumber],
    queryFn: () => patientsApi.getPatientByPassportNumber(passportNumber),
    enabled: !!passportNumber,
  });

  return {
    patient: query.data?.result ?? null,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useGetPatientByPassportNumber;
