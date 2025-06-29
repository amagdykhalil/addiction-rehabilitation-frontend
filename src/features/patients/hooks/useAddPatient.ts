import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patientsApi } from "@/entities/patients/api";
import type { Patient } from "@/entities/patients/model";
import type { ApiResponse } from "@/shared/types";
import { patientsKeys } from "./patientsKeys";

export function useAddPatient() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ApiResponse<number>,
    Error,
    Omit<Patient, "Id" | "FullName">
  >({
    mutationFn: patientsApi.addPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientsKeys.all });
    },
  });

  return {
    addPatient: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data?.result ?? null,
  };
}

export default useAddPatient;
