import { useQuery } from "@tanstack/react-query";
import { rolesApi } from "@/entities/roles/api";
import { rolesKeys } from "./rolesKeys";
import type { ApiResponse } from "@/shared/types";
import type { RoleDto } from "@/entities/roles/api";

export function useGetRoleById(id: number) {
  const query = useQuery<ApiResponse<RoleDto>, Error>({
    queryKey: rolesKeys.detail(id),
    queryFn: () => rolesApi.getRoleById(id),
    enabled: !!id,
  });

  return {
    role: query.data?.result ?? null,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useGetRoleById;
