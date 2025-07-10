import { useQueryState, parseAsInteger } from "nuqs";
import { useGetPatients } from "@/features/patients/hooks/useGetPatients";
import { PatientSortBy } from "@/entities/patients/model/patient";
import { isNotNil } from "@/shared/lib/utils";
import type {
  FilterConfig,
  SearchQueryConfig,
  SortConfig,
} from "@/shared/ui/TableFilters/types";
import { CountrySelect } from "@/shared/ui/SelectCountry";
import { useGetCountries } from "@/features/countries/hooks";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { COMMON_KEYS, NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import { Gender, SortDirection } from "@/shared/types/enums";

export function usePatientsList() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.patient]);

  const [pageNumber, setPageNumber] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ history: "push" })
  );
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10).withOptions({ history: "push" })
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
    countryId: Number(selectedCountryId) || undefined,
    sortBy: Number(sortBy),
    sortDirection: Number(sortDirection),
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
        placeholder={t(PATIENTS_KEYS.filters.selectCountry, {
          ns: NAMESPACE_KEYS.patient,
        })}
        className="!h-11"
      />
    );

    const filters: FilterConfig[] = [
      {
        type: "combobox",
        name: "gender",
        label: t(PATIENTS_KEYS.table.gender, { ns: NAMESPACE_KEYS.patient }),
        value: gender,
        onChange: (v: string | number) => setGender(String(v)),
        options: [
          {
            label: t(PATIENTS_KEYS.filters.allGenders, {
              ns: NAMESPACE_KEYS.patient,
            }),
            value: "all",
          },
          {
            label: t(COMMON_KEYS.gender.male, { ns: NAMESPACE_KEYS.common }),
            value: Gender.Male,
          },
          {
            label: t(COMMON_KEYS.gender.female, {
              ns: NAMESPACE_KEYS.common,
            }),
            value: Gender.Female,
          },
        ],
        placeholder: t(PATIENTS_KEYS.filters.allGenders, {
          ns: NAMESPACE_KEYS.patient,
        }),
        discardedValues: ["all"],
      },
      {
        type: "custom",
        name: "country",
        label: t(PATIENTS_KEYS.filters.country, { ns: NAMESPACE_KEYS.patient }),
        value: selectedCountryId,
        onChange: (v) => setSelectedCountryId(String(v)),
        component: countrySelectComponent,
        placeholder: t(PATIENTS_KEYS.filters.selectCountry, {
          ns: NAMESPACE_KEYS.patient,
        }),
        getActiveValue: () => {
          if (isLoadingCountries) return null;
          const country = countries?.find(
            (c) => c.id == Number(selectedCountryId)
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
      label: t(PATIENTS_KEYS.table.patientId, { ns: NAMESPACE_KEYS.patient }),
      value: PatientSortBy.Id.toString(),
    },
    {
      label: t(PATIENTS_KEYS.details.firstName, { ns: NAMESPACE_KEYS.patient }),
      value: PatientSortBy.FirstName.toString(),
    },
    {
      label: t(PATIENTS_KEYS.details.lastName, { ns: NAMESPACE_KEYS.patient }),
      value: PatientSortBy.LastName.toString(),
    },
    {
      label: t(PATIENTS_KEYS.table.nationalId, { ns: NAMESPACE_KEYS.patient }),
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
      confirm(t(PATIENTS_KEYS.delete.confirm, { ns: NAMESPACE_KEYS.patient }))
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
