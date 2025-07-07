import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { UsersTable } from "@/features/users/ui/UsersTable";
import { PaginationBar } from "@/shared/ui/PaginationBar";
import { UsersPageHeader } from "@/features/users/ui/UsersPageHeader";
import { TableFilters } from "@/shared/ui/TableFilters";
import { useUsersList } from "@/features/users/hooks";
import { UsersMobileView } from "@/features/users/ui/UsersMobileView";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";

export const UsersListPage = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.users]);
  const {
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
  } = useUsersList();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <UsersPageHeader />
      {/* Filters */}
      <TableFilters
        filters={filters}
        sortConfig={sortConfig}
        searchQueryConfig={searchQueryConfig}
        resetPageNumber={() => setPageNumber(1)}
        searchPlaceholder={t(USERS_KEYS.search.searchPlaceholder, {
          ns: NAMESPACE_KEYS.users,
        })}
        onClear={onClear}
      />

      {/* Users List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {t(USERS_KEYS.list.userRecords, {
              ns: NAMESPACE_KEYS.users,
            })}
          </CardTitle>
          <CardDescription>
            {t(USERS_KEYS.list.showingUsers, {
              ns: NAMESPACE_KEYS.users,
            })}{" "}
            {totalCount}{" "}
            {t(USERS_KEYS.list.ofUsers, { ns: NAMESPACE_KEYS.users })}{" "}
            {totalCount}{" "}
            {t(USERS_KEYS.list.userRecords, {
              ns: NAMESPACE_KEYS.users,
            }).toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <UsersTable users={users} isLoading={isLoading} />
            </div>

            {/* Mobile Card View */}
            <UsersMobileView users={users} isLoading={isLoading} />
          </>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="py-4 px-4 sm:px-6">
              <PaginationBar
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={setPageNumber}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersListPage;
