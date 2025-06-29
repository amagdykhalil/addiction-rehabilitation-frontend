import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { patientsApi } from "@/entities/patients/api";
import type { GetPatientsParams } from "@/entities/patients/api";
import type { Patient, PaginatedResult } from "@/entities/patients/model";
import type { ApiResponse } from "@/shared/types";
import { patientsKeys } from "./patientsKeys";
import type { Locale } from "@/shared/i18n/constants/locales";
import { useTranslation } from "react-i18next";

export function useGetPatients(params: GetPatientsParams = {}) {
  const { i18n } = useTranslation();
  const current = i18n.language as Locale;
  const queryClient = useQueryClient();
  const query = useQuery<ApiResponse<PaginatedResult<Patient>>, Error>({
    queryKey: patientsKeys.list(params as Record<string, unknown>, current),
    queryFn: ({ signal }) => patientsApi.getPatients(params, signal),
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
        queryKey: patientsKeys.list(
          nextParams as Record<string, unknown>,
          current,
        ),
        queryFn: ({ signal }) => patientsApi.getPatients(nextParams, signal),
      });
    }
    // Prefetch previous page
    if (pageNumber > 1) {
      const prevParams = { ...params, pageNumber: pageNumber - 1 };
      queryClient.prefetchQuery({
        queryKey: patientsKeys.list(
          prevParams as Record<string, unknown>,
          current,
        ),
        queryFn: ({ signal }) => patientsApi.getPatients(prevParams, signal),
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

export default useGetPatients;
