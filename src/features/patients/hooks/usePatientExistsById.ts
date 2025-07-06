import { useQuery } from "@tanstack/react-query";
import { patientsApi } from "@/entities/patients/api";
import type { ApiResponse } from "@/shared/types";
import { patientsKeys } from "./patientsKeys";

export function usePatientExistsById(id: string) {
  const query = useQuery<ApiResponse<boolean>, Error>({
    queryKey: [...patientsKeys.details(), "exists", { id }],
    queryFn: () => patientsApi.existsById(id),
    enabled: !!id,
  });

  return {
    exists: query.data?.result ?? false,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default usePatientExistsById;
