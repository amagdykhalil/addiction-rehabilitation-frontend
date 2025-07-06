import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "@/entities/roles/api";
import type { RemoveRolesParams } from "@/entities/roles/api";
import { rolesKeys } from "./rolesKeys";
import type { ApiResponse } from "@/shared/types";

export function useRemoveRoles() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ApiResponse<boolean>, Error, RemoveRolesParams>({
    mutationFn: rolesApi.removeRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.all });
    },
  });

  return {
    removeRoles: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data ?? null,
  };
}

export default useRemoveRoles;
