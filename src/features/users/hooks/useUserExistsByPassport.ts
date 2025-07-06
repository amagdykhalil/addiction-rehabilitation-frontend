import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/entities/users/api";
import { usersKeys } from "./usersKeys";

export function useUserExistsByPassport(passportNumber: string) {
  const query = useQuery({
    queryKey: [...usersKeys.details(), "exists", { passportNumber }],
    queryFn: () => usersApi.existsByPassport(passportNumber),
    enabled: !!passportNumber,
  });
  return {
    exists: query.data?.result ?? false,
    userId: query.data?.result,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useUserExistsByPassport;
