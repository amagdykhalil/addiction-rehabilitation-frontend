import { usersApi, type UpdateUserRolesParams } from "@/entities/users/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersKeys } from "./usersKeys";
import type { ApiResponse } from "@/shared/types";

export function useUpdateUserRoles() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ApiResponse<boolean>,
    Error,
    {
      params: UpdateUserRolesParams;
    }
  >({
    mutationFn: (data) => usersApi.updateUserRoles(data.params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
  return {
    editUserRoles: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data ?? null,
  };
}

export default useUpdateUserRoles;
