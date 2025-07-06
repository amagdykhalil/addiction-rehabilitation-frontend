import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/entities/users/api";
import { usersKeys } from "./usersKeys";

export function useUserExistsById(id: string) {
  const query = useQuery({
    queryKey: [...usersKeys.details(), "exists", { id }],
    queryFn: () => usersApi.existsById(id),
    enabled: !!id,
  });
  return {
    exists: query.data?.result ?? false,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useUserExistsById;
