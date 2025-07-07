import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/entities/users/api";
import type { ApiResponse } from "@/shared/types";
import { usersKeys } from "./usersKeys";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ApiResponse<null>, Error, string>({
    mutationFn: (id: string) => usersApi.deleteUser(id),
  });

  const deleteUser = (
    id: string,
    { onSuccess }: { onSuccess?: () => void } = {},
  ) => {
    mutation.mutate(id, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: usersKeys.all });
        }, 0);
      },
    });
  };

  return {
    deleteUser,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data?.result ?? null,
  };
}

export default useDeleteUser;
