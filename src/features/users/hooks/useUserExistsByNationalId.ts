import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/entities/users/api";
import { usersKeys } from "./usersKeys";

export function useUserExistsByNationalId(nationalIdNumber: string) {
  const query = useQuery({
    queryKey: [...usersKeys.details(), "exists", { nationalIdNumber }],
    queryFn: () => usersApi.existsByNationalId(nationalIdNumber),
    enabled: !!nationalIdNumber,
  });
  return {
    exists: query.data?.result ?? false,
    userId: query.data?.result,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useUserExistsByNationalId;
