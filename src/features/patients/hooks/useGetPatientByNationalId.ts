import { useQuery } from "@tanstack/react-query";
import { patientsApi } from "@/entities/patients/api";
import type { Patient } from "@/entities/patients/model";
import type { ApiResponse } from "@/shared/types";
import { patientsKeys } from "./patientsKeys";

export function useGetPatientByNationalId(nationalId: string) {
  const query = useQuery<ApiResponse<Patient>, Error>({
    queryKey: [...patientsKeys.all, "by-national-id", nationalId],
    queryFn: () => patientsApi.getPatientByNationalId(nationalId),
    enabled: !!nationalId,
  });

  return {
    patient: query.data?.result ?? null,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useGetPatientByNationalId;
