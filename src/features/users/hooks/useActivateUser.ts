import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/entities/users/api";
import { usersKeys } from "./usersKeys";

export function useActivateUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: usersApi.reactivateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
  return {
    activateUser: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data ?? null,
  };
}

export default useActivateUser;
