import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patientsApi } from "@/entities/patients/api";
import type { Patient } from "@/entities/patients/model";
import type { ApiResponse } from "@/shared/types";
import { usersKeys } from "@/features/users/hooks";

export function useUpdatePatient() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ApiResponse<boolean>,
    Error,
    { patient: Omit<Patient, "FullName"> }
  >({
    mutationFn: ({ patient }) => patientsApi.updatePatient(patient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });

  return {
    updatePatient: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data?.result ?? null,
  };
}

export default useUpdatePatient;
