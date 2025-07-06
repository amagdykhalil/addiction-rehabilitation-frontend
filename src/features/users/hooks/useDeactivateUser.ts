import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/entities/users/api";
import { usersKeys } from "./usersKeys";

export function useDeactivateUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: usersApi.deactivateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
  return {
    deactivateUser: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data ?? null,
  };
}

export default useDeactivateUser;
