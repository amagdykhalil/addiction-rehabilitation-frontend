import { useQuery } from "@tanstack/react-query";
import { countriesApi } from "@/entities/countries/api";
import type { Country } from "@/entities/countries/model";
import type { ApiResponse } from "@/shared/types";
import { countriesKeys } from "./countriesKeys";
import { useTranslation } from "react-i18next";

export function useGetCountries() {
  const { i18n } = useTranslation();
  const query = useQuery<ApiResponse<Country[]>, Error>({
    queryKey: [...countriesKeys.all(), i18n.language],
    queryFn: countriesApi.getCountries,
  });

  return {
    countries: query.data?.result ?? [],
    isLoading: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}

export default useGetCountries;
