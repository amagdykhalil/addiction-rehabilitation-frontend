import { useQuery } from "@tanstack/react-query";
import { patientsApi } from "@/entities/patients/api";
import type { Patient } from "@/entities/patients/model";
import type { ApiResponse } from "@/shared/types";
import { patientsKeys } from "./patientsKeys";
import type { Locale } from "@/shared/i18n/constants/locales";
import { useTranslation } from "react-i18next";

export function useGetPatient(id: string) {
  const { i18n } = useTranslation();
  const current = i18n.language as Locale;

  const query = useQuery<ApiResponse<Patient>, Error>({
    queryKey: patientsKeys.detail(id, current),
    queryFn: () => patientsApi.getPatient(id),
    enabled: !!id,
  });

  return {
    patient: query.data?.result ?? null,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useGetPatient;
