import { useQueryState, parseAsInteger } from "nuqs";
import { useGetUsers } from "@/features/users/hooks";
import { UserSortBy } from "@/entities/users/model";
import { isNotNil } from "@/shared/lib/utils";
import type {
  FilterConfig,
  SearchQueryConfig,
  SortConfig,
} from "@/shared/ui/TableFilters/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { Gender, SortDirection } from "@/shared/types/enums";
import { COMMON_KEYS } from "@/shared/i18n/keys";
import { CountrySelect } from "@/shared/ui/SelectCountry";
import { useGetCountries } from "@/features/countries/hooks";
import { useGetRoles } from "@/features/roles/hooks";
import { useCurrentLanguage } from "@/shared/hooks";

export function useUsersList() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.users]);

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
    defaultValue: UserSortBy.Id.toString(),
    history: "push",
  });
  const [sortDirection, setSortDirection] = useQueryState("sortOrder", {
    defaultValue: SortDirection.Asc.toString(),
    history: "push",
  });
  const [role, setRole] = useQueryState("role", {
    defaultValue: "all",
    history: "push",
  });
  const [isActive, setIsActive] = useQueryState("isActive", {
    defaultValue: "all",
    history: "push",
  });
  const [selectedCountryId, setSelectedCountryId] = useQueryState("country", {
    defaultValue: "",
    history: "push",
  });

  // Fetch roles for filter
  const { roles, isLoading: rolesLoading } = useGetRoles();

  const params = {
    pageNumber,
    pageSize,
    searchQuery: searchQuery?.trim() || undefined,
    gender: isNotNil(gender) && gender !== "all" ? Number(gender) : undefined,
    countryId: Number(selectedCountryId) || undefined,
    roleId: role !== "all" ? role : undefined,
    isActive: isActive === "all" ? undefined : isActive === "active",
    sortBy: Number(sortBy),
    sortDirection: Number(sortDirection),
  };

  const { pageResult, isLoading } = useGetUsers(params);
  const { countries, isLoading: isLoadingCountries } = useGetCountries();
  const { isArabic } = useCurrentLanguage();
  const { data: users = [] } = pageResult || {};
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
        placeholder={t(USERS_KEYS.filters.selectCountry, {
          ns: NAMESPACE_KEYS.users,
        })}
        className="!h-11"
      />
    );

    const filters: FilterConfig[] = [
      {
        type: "combobox",
        name: "gender",
        label: t(USERS_KEYS.table.gender, { ns: NAMESPACE_KEYS.users }),
        value: gender,
        onChange: (v: string | number) => setGender(String(v)),
        options: [
          {
            label: t(USERS_KEYS.filters.allGenders, {
              ns: NAMESPACE_KEYS.users,
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
        placeholder: t(USERS_KEYS.filters.allGenders, {
          ns: NAMESPACE_KEYS.users,
        }),
        discardedValues: ["all"],
      },
      {
        type: "custom",
        name: "country",
        label: t(USERS_KEYS.filters.country, { ns: NAMESPACE_KEYS.users }),
        value: selectedCountryId,
        onChange: (v) => setSelectedCountryId(String(v)),
        component: countrySelectComponent,
        placeholder: t(USERS_KEYS.filters.selectCountry, {
          ns: NAMESPACE_KEYS.users,
        }),
        getActiveValue: () => {
          if (isLoadingCountries) return null;
          const country = countries?.find(
            (c) => c.id == Number(selectedCountryId)
          );
          return country?.name ? country.name : null;
        },
      },
      {
        type: "combobox",
        name: "role",
        label: t(USERS_KEYS.filters.role, { ns: NAMESPACE_KEYS.users }),
        value: role,
        onChange: (v: string | number) => setRole(String(v)),
        options: [
          {
            label: t(USERS_KEYS.filters.allRoles, {
              ns: NAMESPACE_KEYS.users,
            }),
            value: "all",
          },
          ...(rolesLoading
            ? [
                {
                  label: t(COMMON_KEYS.loading, { ns: NAMESPACE_KEYS.common }),
                  value: "load",
                },
              ]
            : Array.isArray(roles)
              ? roles.map((r) => ({
                  label: isArabic ? r.name_ar : r.name_en,
                  value: r.id,
                }))
              : []),
        ],
        placeholder: t(USERS_KEYS.filters.allRoles, {
          ns: NAMESPACE_KEYS.users,
        }),
        discardedValues: ["all", "load"],
      },
      {
        type: "combobox",
        name: "isActive",
        label: t(USERS_KEYS.filters.isActive, { ns: NAMESPACE_KEYS.users }),
        value: isActive,
        onChange: (v: string | number) => setIsActive(String(v)),
        options: [
          {
            label: t(USERS_KEYS.filters.isActive, {
              ns: NAMESPACE_KEYS.users,
            }),
            value: "all",
          },
          {
            label: t(USERS_KEYS.filters.active, {
              ns: NAMESPACE_KEYS.users,
            }),
            value: "active",
          },
          {
            label: t(USERS_KEYS.filters.inactive, {
              ns: NAMESPACE_KEYS.users,
            }),
            value: "inactive",
          },
        ],
        placeholder: t(USERS_KEYS.filters.isActive, {
          ns: NAMESPACE_KEYS.users,
        }),
        discardedValues: ["all"],
      },
    ];
    return { filters };
  }, [
    gender,
    setGender,
    role,
    setRole,
    isActive,
    setIsActive,
    roles,
    t,
    rolesLoading,
    countries,
    isLoadingCountries,
    selectedCountryId,
    setSelectedCountryId,
    setPageNumber,
    isArabic,
  ]);

  const sortOptions = [
    {
      label: t(USERS_KEYS.table.userId, { ns: NAMESPACE_KEYS.users }),
      value: UserSortBy.Id.toString(),
    },
    {
      label: t(USERS_KEYS.details.firstName, { ns: NAMESPACE_KEYS.users }),
      value: UserSortBy.FirstName.toString(),
    },
    {
      label: t(USERS_KEYS.details.lastName, { ns: NAMESPACE_KEYS.users }),
      value: UserSortBy.LastName.toString(),
    },
    {
      label: t(USERS_KEYS.table.nationalId, { ns: NAMESPACE_KEYS.users }),
      value: UserSortBy.NationalId.toString(),
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
    setSortBy(UserSortBy.FirstName.toString());
    setSortDirection(SortDirection.Asc.toString());
    setPageNumber(1);
    setPageSize(10);
    setRole("all");
    setIsActive("all");
    setSelectedCountryId(null);
  };

  return {
    users,
    totalCount,
    totalPages,
    isLoading,
    filters,
    sortConfig,
    searchQueryConfig,
    onClear,
    pageNumber,
    setPageNumber,
  };
}
