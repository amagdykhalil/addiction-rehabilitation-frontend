import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/entities/users/api";
import { usersKeys } from "./usersKeys";
import type { ApiResponse } from "@/shared/types";
import type { User } from "@/entities/users/model";

export function useAddUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ApiResponse<number>,
    Error,
    Omit<User, "Id" | "isActive" | "nationalityName">
  >({
    mutationFn: usersApi.addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });

  return {
    addUser: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data?.result ?? null,
  };
}

export default useAddUser;
