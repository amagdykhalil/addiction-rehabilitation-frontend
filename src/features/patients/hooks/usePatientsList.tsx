import { useQueryState, parseAsInteger } from "nuqs";
import { useGetPatients } from "@/features/patients/hooks/useGetPatients";
import {
  Gender,
  PatientSortBy,
  SortDirection,
} from "@/entities/patients/model/patient";
import { isNotNil } from "@/shared/lib/utils";
import type {
  FilterConfig,
  SearchQueryConfig,
  SortConfig,
} from "@/shared/ui/TableFilters/types";
import { CountrySelect } from "@/shared/ui/SelectCountry";
import useGetCountries from "@/features/countries/hooks/useGetCountries";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { PATIENT_KEYS } from "@/entities/patients/lib/translationKeys";

export function usePatientsList() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.patient]);

  const [pageNumber, setPageNumber] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ history: "push" }),
  );
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10).withOptions({ history: "push" }),
  );
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue: "",
    history: "replace",
  });
  const [gender, setGender] = useQueryState("gender", {
    defaultValue: "all",
    history: "push",
  });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: PatientSortBy.Id.toString(),
    history: "push",
  });
  const [sortDirection, setSortDirection] = useQueryState("sortOrder", {
    defaultValue: SortDirection.Asc.toString(),
    history: "push",
  });
  const [selectedCountryId, setSelectedCountryId] = useQueryState("country", {
    defaultValue: "",
    history: "push",
  });

  const params = {
    pageNumber,
    pageSize,
    searchQuery: searchQuery?.trim() || undefined,
    gender: isNotNil(gender) && gender !== "all" ? Number(gender) : undefined,
    sortBy: Number(sortBy),
    sortDirection: Number(sortDirection),
    countryId: Number(selectedCountryId) || undefined,
  };

  const { pageResult, isLoading } = useGetPatients(params);
  const { countries, isLoading: isLoadingCountries } = useGetCountries();
  const { data: patients = [] } = pageResult || {};
  const totalCount = pageResult?.totalCount ?? 0;
  const totalPages = pageResult?.totalPages ?? 0;

  const { filters } = useMemo(() => {
    const countrySelectComponent = (
      <CountrySelect
        value={Number(selectedCountryId)}
        onSelectCountry={(v) => {
          setPageNumber(1);
          setSelectedCountryId(String(v));
        }}
        placeholder={t(PATIENT_KEYS.filters.selectCountry, {
          ns: NAMESPACE_KEYS.patient,
        })}
        className="!h-11"
      />
    );

    const filters: FilterConfig[] = [
      {
        type: "combobox",
        name: "gender",
        label: t(PATIENT_KEYS.table.gender, { ns: NAMESPACE_KEYS.patient }),
        value: gender,
        onChange: (v: string | number) => setGender(String(v)),
        options: [
          {
            label: t(PATIENT_KEYS.filters.allGenders, {
              ns: NAMESPACE_KEYS.patient,
            }),
            value: "all",
          },
          {
            label: t(PATIENT_KEYS.gender.male, { ns: NAMESPACE_KEYS.patient }),
            value: Gender.Male,
          },
          {
            label: t(PATIENT_KEYS.gender.female, {
              ns: NAMESPACE_KEYS.patient,
            }),
            value: Gender.Female,
          },
        ],
        placeholder: t(PATIENT_KEYS.filters.allGenders, {
          ns: NAMESPACE_KEYS.patient,
        }),
        discardedValues: ["all"],
      },
      {
        type: "custom",
        name: "country",
        label: t(PATIENT_KEYS.filters.country, { ns: NAMESPACE_KEYS.patient }),
        value: selectedCountryId,
        onChange: (v) => setSelectedCountryId(String(v)),
        component: countrySelectComponent,
        placeholder: t(PATIENT_KEYS.filters.selectCountry, {
          ns: NAMESPACE_KEYS.patient,
        }),
        getActiveValue: () => {
          if (isLoadingCountries) return null;
          const country = countries?.find(
            (c) => c.id == Number(selectedCountryId),
          );
          return country?.name ? country.name : null;
        },
      },
    ];

    return { filters };
  }, [
    selectedCountryId,
    setSelectedCountryId,
    gender,
    setGender,
    countries,
    setPageNumber,
    isLoadingCountries,
    t,
  ]);

  const sortOptions = [
    {
      label: t(PATIENT_KEYS.table.patientId, { ns: NAMESPACE_KEYS.patient }),
      value: PatientSortBy.Id.toString(),
    },
    {
      label: t(PATIENT_KEYS.details.firstName, { ns: NAMESPACE_KEYS.patient }),
      value: PatientSortBy.FirstName.toString(),
    },
    {
      label: t(PATIENT_KEYS.details.lastName, { ns: NAMESPACE_KEYS.patient }),
      value: PatientSortBy.LastName.toString(),
    },
    {
      label: t(PATIENT_KEYS.table.nationalId, { ns: NAMESPACE_KEYS.patient }),
      value: PatientSortBy.NationalId.toString(),
    },
  ];

  const sortConfig: SortConfig = {
    sortBy,
    sortOptions,
    sortOrder: sortDirection,
    onSortByChange: setSortBy,
    onSortOrderChange: setSortDirection,
  };

  const searchQueryConfig: SearchQueryConfig = {
    searchQuery: searchQuery,
    onSearchQueryChange: setSearchQuery,
  };

  const onClear = () => {
    setSearchQuery("");
    setGender("all");
    setSortBy(PatientSortBy.FirstName.toString());
    setSortDirection(SortDirection.Asc.toString());
    setPageNumber(1);
    setPageSize(10);
    setSelectedCountryId(null);
  };

  const handleDelete = async (patientId: string) => {
    if (
      confirm(t(PATIENT_KEYS.delete.confirm, { ns: NAMESPACE_KEYS.patient }))
    ) {
      console.log("Deleting patient:", patientId);
      // Handle delete API call
    }
  };

  return {
    patients,
    totalCount,
    totalPages,
    isLoading,
    filters,
    sortConfig,
    searchQueryConfig,
    onClear,
    handleDelete,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
  };
}
