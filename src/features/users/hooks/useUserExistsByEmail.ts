import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/entities/users/api";
import { usersKeys } from "./usersKeys";

export function useUserExistsByEmail(email: string) {
  const query = useQuery({
    queryKey: [...usersKeys.details(), "exists", { email }],
    queryFn: () => usersApi.existsByEmail(email),
    enabled: !!email,
  });
  return {
    exists: query.data?.result ?? false,
    userId: query.data?.result,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useUserExistsByEmail;
