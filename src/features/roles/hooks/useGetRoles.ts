import { useQuery } from "@tanstack/react-query";
import { rolesApi } from "@/entities/roles/api";
import { rolesKeys } from "./rolesKeys";
import type { RoleDto } from "@/entities/roles/api";
import type { ApiResponse } from "@/shared/types";

export function useGetRoles() {
  const query = useQuery<ApiResponse<RoleDto[]>, Error>({
    queryKey: rolesKeys.all,
    queryFn: () => rolesApi.getAllRoles(),
  });

  return {
    roles: query.data?.result ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useGetRoles;
