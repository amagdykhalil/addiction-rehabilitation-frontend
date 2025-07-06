import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "@/entities/roles/api";
import type { UpdateRoleParams } from "@/entities/roles/api";
import { rolesKeys } from "./rolesKeys";
import type { ApiResponse } from "@/shared/types";

export function useUpdateRole() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ApiResponse<boolean>, Error, UpdateRoleParams>({
    mutationFn: rolesApi.updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.all });
    },
  });

  return {
    updateRole: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data ?? null,
  };
}

export default useUpdateRole;
