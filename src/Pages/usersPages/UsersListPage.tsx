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
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USER_KEYS } from "@/entities/users/lib/translationKeys";

export default function UsersListPage() {
  const { t } = useTranslation([NAMESPACE_KEYS.user]);
  const {
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
        searchPlaceholder={t(USER_KEYS.search.searchPlaceholder, {
          ns: NAMESPACE_KEYS.user,
        })}
        onClear={onClear}
      />

      {/* Users List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {t(USER_KEYS.list.userRecords, {
              ns: NAMESPACE_KEYS.user,
            })}
          </CardTitle>
          <CardDescription>
            {t(USER_KEYS.list.showingUsers, {
              ns: NAMESPACE_KEYS.user,
            })}{" "}
            {totalCount}{" "}
            {t(USER_KEYS.list.ofUsers, { ns: NAMESPACE_KEYS.user })}{" "}
            {totalCount}{" "}
            {t(USER_KEYS.list.userRecords, {
              ns: NAMESPACE_KEYS.user,
            }).toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <UsersTable
                users={users}
                isLoading={isLoading}
                handleDelete={handleDelete}
              />
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
}