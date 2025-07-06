import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "@/entities/roles/api";
import type { AddRolesParams } from "@/entities/roles/api";
import { rolesKeys } from "./rolesKeys";
import type { ApiResponse } from "@/shared/types";

export function useAddRoles() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ApiResponse<boolean>, Error, AddRolesParams>({
    mutationFn: rolesApi.addRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.all });
    },
  });

  return {
    addRoles: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data ?? null,
  };
}

export default useAddRoles;
