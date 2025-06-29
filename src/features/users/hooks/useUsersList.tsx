import { useQueryState, parseAsInteger } from "nuqs";
import { useGetUsers } from "@/features/users/hooks/useGetUsers";
import {
  Gender,
  UserSortBy,
  UserRole,
  UserStatus,
} from "@/entities/users/model/user";
import { SortDirection } from "@/entities/patients/model";
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
import { USER_KEYS } from "@/entities/users/lib/translationKeys";

export function useUsersList() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.user]);

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
  const [role, setRole] = useQueryState("role", {
    defaultValue: "all",
    history: "push",
  });
  const [status, setStatus] = useQueryState("status", {
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
  const [selectedCountryId, setSelectedCountryId] = useQueryState("country", {
    defaultValue: "",
    history: "push",
  });

  const params = {
    pageNumber,
    pageSize,
    searchQuery: searchQuery?.trim() || undefined,
    gender: isNotNil(gender) && gender !== "all" ? Number(gender) : undefined,
    role: isNotNil(role) && role !== "all" ? Number(role) : undefined,
    status: isNotNil(status) && status !== "all" ? Number(status) : undefined,
    sortBy: Number(sortBy),
    sortDirection: Number(sortDirection),
    countryId: Number(selectedCountryId) || undefined,
  };

  const { pageResult, isLoading } = useGetUsers(params);
  const { countries, isLoading: isLoadingCountries } = useGetCountries();
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
        placeholder={t(USER_KEYS.filters.selectCountry, {
          ns: NAMESPACE_KEYS.user,
        })}
        className="!h-11"
      />
    );

    const filters: FilterConfig[] = [
      {
        type: "combobox",
        name: "gender",
        label: t(USER_KEYS.table.gender, { ns: NAMESPACE_KEYS.user }),
        value: gender,
        onChange: (v: string | number) => setGender(String(v)),
        options: [
          {
            label: t(USER_KEYS.filters.allRoles, {
              ns: NAMESPACE_KEYS.user,
            }),
            value: "all",
          },
          {
            label: t(USER_KEYS.gender.male, { ns: NAMESPACE_KEYS.user }),
            value: Gender.Male,
          },
          {
            label: t(USER_KEYS.gender.female, {
              ns: NAMESPACE_KEYS.user,
            }),
            value: Gender.Female,
          },
        ],
        placeholder: t(USER_KEYS.filters.allRoles, {
          ns: NAMESPACE_KEYS.user,
        }),
        discardedValues: ["all"],
      },
      {
        type: "combobox",
        name: "role",
        label: t(USER_KEYS.table.role, { ns: NAMESPACE_KEYS.user }),
        value: role,
        onChange: (v: string | number) => setRole(String(v)),
        options: [
          {
            label: t(USER_KEYS.filters.allRoles, {
              ns: NAMESPACE_KEYS.user,
            }),
            value: "all",
          },
          {
            label: t(USER_KEYS.role.admin, { ns: NAMESPACE_KEYS.user }),
            value: UserRole.Admin,
          },
          {
            label: t(USER_KEYS.role.doctor, { ns: NAMESPACE_KEYS.user }),
            value: UserRole.Doctor,
          },
          {
            label: t(USER_KEYS.role.nurse, { ns: NAMESPACE_KEYS.user }),
            value: UserRole.Nurse,
          },
          {
            label: t(USER_KEYS.role.receptionist, { ns: NAMESPACE_KEYS.user }),
            value: UserRole.Receptionist,
          },
        ],
        placeholder: t(USER_KEYS.filters.allRoles, {
          ns: NAMESPACE_KEYS.user,
        }),
        discardedValues: ["all"],
      },
      {
        type: "combobox",
        name: "status",
        label: t(USER_KEYS.table.status, { ns: NAMESPACE_KEYS.user }),
        value: status,
        onChange: (v: string | number) => setStatus(String(v)),
        options: [
          {
            label: t(USER_KEYS.filters.allStatuses, {
              ns: NAMESPACE_KEYS.user,
            }),
            value: "all",
          },
          {
            label: t(USER_KEYS.status.active, { ns: NAMESPACE_KEYS.user }),
            value: UserStatus.Active,
          },
          {
            label: t(USER_KEYS.status.inactive, { ns: NAMESPACE_KEYS.user }),
            value: UserStatus.Inactive,
          },
          {
            label: t(USER_KEYS.status.suspended, { ns: NAMESPACE_KEYS.user }),
            value: UserStatus.Suspended,
          },
        ],
        placeholder: t(USER_KEYS.filters.allStatuses, {
          ns: NAMESPACE_KEYS.user,
        }),
        discardedValues: ["all"],
      },
      {
        type: "custom",
        name: "country",
        label: t(USER_KEYS.filters.country, { ns: NAMESPACE_KEYS.user }),
        value: selectedCountryId,
        onChange: (v) => setSelectedCountryId(String(v)),
        component: countrySelectComponent,
        placeholder: t(USER_KEYS.filters.selectCountry, {
          ns: NAMESPACE_KEYS.user,
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
    role,
    setRole,
    status,
    setStatus,
    countries,
    setPageNumber,
    isLoadingCountries,
    t,
  ]);

  const sortOptions = [
    {
      label: t(USER_KEYS.table.userId, { ns: NAMESPACE_KEYS.user }),
      value: UserSortBy.Id.toString(),
    },
    {
      label: t(USER_KEYS.details.firstName, { ns: NAMESPACE_KEYS.user }),
      value: UserSortBy.FirstName.toString(),
    },
    {
      label: t(USER_KEYS.details.lastName, { ns: NAMESPACE_KEYS.user }),
      value: UserSortBy.LastName.toString(),
    },
    {
      label: t(USER_KEYS.table.email, { ns: NAMESPACE_KEYS.user }),
      value: UserSortBy.Email.toString(),
    },
    {
      label: t(USER_KEYS.table.role, { ns: NAMESPACE_KEYS.user }),
      value: UserSortBy.Role.toString(),
    },
    {
      label: t(USER_KEYS.table.status, { ns: NAMESPACE_KEYS.user }),
      value: UserSortBy.Status.toString(),
    },
    {
      label: t(USER_KEYS.table.createdAt, { ns: NAMESPACE_KEYS.user }),
      value: UserSortBy.CreatedAt.toString(),
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
    setRole("all");
    setStatus("all");
    setSortBy(UserSortBy.FirstName.toString());
    setSortDirection(SortDirection.Asc.toString());
    setPageNumber(1);
    setPageSize(10);
    setSelectedCountryId(null);
  };

  const handleDelete = async (userId: string) => {
    if (
      confirm(t(USER_KEYS.delete.confirm, { ns: NAMESPACE_KEYS.user }))
    ) {
      console.log("Deleting user:", userId);
      // Handle delete API call
    }
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
    handleDelete,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
  };
}