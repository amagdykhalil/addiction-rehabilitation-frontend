import { usersApi } from "@/entities/users/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersKeys } from "./usersKeys";
import type { ApiResponse } from "@/shared/types";
import type { User } from "@/entities/users/model";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ApiResponse<boolean>,
    Error,
    { User: Omit<User, "email" | "roles" | "isActive" | "nationalityName"> }
  >({
    mutationFn: (data) => usersApi.updateUser(data.User),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
  return {
    editUser: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data ?? null,
  };
}

export default useUpdateUser;
