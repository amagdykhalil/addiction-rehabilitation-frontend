import { useQuery } from "@tanstack/react-query";
import { patientsApi } from "@/entities/patients/api";
import type { ApiResponse } from "@/shared/types";
import { patientsKeys } from "./patientsKeys";

export function useExistsByPassport(passportNumber: string) {
  const query = useQuery<ApiResponse<number | undefined>, Error>({
    queryKey: [...patientsKeys.details(), "exists", { passportNumber }],
    queryFn: () => patientsApi.existsByPassport(passportNumber),
    enabled: !!passportNumber,
  });

  return {
    exists: !!query.data?.result,
    patientId: query.data?.result,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useExistsByPassport;
