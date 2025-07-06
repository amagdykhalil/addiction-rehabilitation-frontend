import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/entities/users/api";
import { usersKeys } from "./usersKeys";
import type { Role } from "@/entities/users/model";
import type { ApiResponse } from "@/shared/types";
import { useTranslation } from "react-i18next";
import type { Locale } from "@/shared/i18n/constants/locales";

export function useGetUserRoles(userId: number) {
  const { i18n } = useTranslation();
  const current = i18n.language as Locale;
  const query = useQuery<ApiResponse<Role[]>, Error>({
    queryKey: usersKeys.roles(String(userId), current),
    queryFn: () => usersApi.getAllUserRoles(userId),
    enabled: !!userId,
  });
  return {
    roles: query.data?.result ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

export default useGetUserRoles;
