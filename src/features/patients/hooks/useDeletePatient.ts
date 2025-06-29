import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patientsApi } from "@/entities/patients/api";
import type { ApiResponse } from "@/shared/types";
import { patientsKeys } from "./patientsKeys";

export function useDeletePatient() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ApiResponse<null>, Error, string>({
    mutationFn: (id: string) => patientsApi.deletePatient(id),
  });

  const deletePatient = (
    id: string,
    { onSuccess }: { onSuccess?: () => void } = {},
  ) => {
    mutation.mutate(id, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: patientsKeys.all });
        }, 0);
      },
    });
  };

  return {
    deletePatient,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data?.result ?? null,
  };
}

export default useDeletePatient;
