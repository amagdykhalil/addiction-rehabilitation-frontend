import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/entities/users/api";
import { usersKeys } from "./usersKeys";
import { useTranslation } from "react-i18next";
import type { Locale } from "@/shared/i18n/constants/locales";

export function useGetUser(id: string) {
  const { i18n } = useTranslation();
  const current = i18n.language as Locale;
  const query = useQuery({
    queryKey: usersKeys.detail(id, current),
    queryFn: () => usersApi.getUser(id),
    enabled: !!id,
  });
  return {
    user: query.data?.result ?? null,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useGetUser;
