import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { getAge } from "@/shared/lib/utils";
import { PatientsTable } from "@/features/patients/ui/PatientsTable";
import { PaginationBar } from "@/shared/ui/PaginationBar";
import { PatientsPageHeader } from "@/features/patients/ui/PatientsPageHeader";
import { TableFilters } from "@/shared/ui/TableFilters";
import { usePatientsList } from "@/features/patients/hooks";
import { PatientsMobileView } from "@/features/patients/ui/PatientsMobileView";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";

export default function PatientsListPage() {
  const { t } = useTranslation([NAMESPACE_KEYS.patient]);
  const {
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
    setPageNumber,
  } = usePatientsList();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <PatientsPageHeader />
      {/* Filters */}
      <TableFilters
        filters={filters}
        sortConfig={sortConfig}
        searchQueryConfig={searchQueryConfig}
        resetPageNumber={() => setPageNumber(1)}
        searchPlaceholder={t(PATIENTS_KEYS.search.searchPlaceholder, {
          ns: NAMESPACE_KEYS.patient,
        })}
        onClear={onClear}
      />

      {/* Patients List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {t(PATIENTS_KEYS.list.patientRecords, {
              ns: NAMESPACE_KEYS.patient,
            })}
          </CardTitle>
          <CardDescription>
            {t(PATIENTS_KEYS.list.showingPatients, {
              ns: NAMESPACE_KEYS.patient,
            })}{" "}
            {totalCount}{" "}
            {t(PATIENTS_KEYS.list.ofPatients, { ns: NAMESPACE_KEYS.patient })}{" "}
            {totalCount}{" "}
            {t(PATIENTS_KEYS.list.patientRecords, {
              ns: NAMESPACE_KEYS.patient,
            }).toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <PatientsTable
                patients={patients}
                isLoading={isLoading}
                handleDelete={handleDelete}
                getAge={getAge}
              />
            </div>

            {/* Mobile Card View */}
            <PatientsMobileView patients={patients} isLoading={isLoading} />
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
