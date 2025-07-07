import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { usersApi } from "@/entities/users/api";
import type { GetUsersParams } from "@/entities/users/api";
import type { User } from "@/entities/users/model";
import type { PaginatedResult } from "@/shared/types/paginatedResult";
import type { ApiResponse } from "@/shared/types";
import { usersKeys } from "./usersKeys";
import type { Locale } from "@/shared/i18n/constants/locales";
import { useTranslation } from "react-i18next";

export function useGetUsers(params: GetUsersParams = {}) {
  const { i18n } = useTranslation();
  const current = i18n.language as Locale;
  const queryClient = useQueryClient();
  const query = useQuery<ApiResponse<PaginatedResult<User>>, Error>({
    queryKey: usersKeys.list(params as Record<string, unknown>, current),
    queryFn: ({ signal }) => usersApi.getUsers(params, signal),
  });

  // Prefetch next and previous pages for better UX
  useEffect(() => {
    if (!params.pageNumber || !query.data?.result?.totalPages) return;
    const { pageNumber } = params;
    const totalPages = query.data.result.totalPages;
    // Prefetch next page
    if (pageNumber < totalPages) {
      const nextParams = { ...params, pageNumber: pageNumber + 1 };
      queryClient.prefetchQuery({
        queryKey: usersKeys.list(
          nextParams as Record<string, unknown>,
          current,
        ),
        queryFn: ({ signal }) => usersApi.getUsers(nextParams, signal),
      });
    }
    // Prefetch previous page
    if (pageNumber > 1) {
      const prevParams = { ...params, pageNumber: pageNumber - 1 };
      queryClient.prefetchQuery({
        queryKey: usersKeys.list(
          prevParams as Record<string, unknown>,
          current,
        ),
        queryFn: ({ signal }) => usersApi.getUsers(prevParams, signal),
      });
    }
  }, [params, query.data, queryClient, current]);

  return {
    pageResult: query.data?.result,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useGetUsers;
