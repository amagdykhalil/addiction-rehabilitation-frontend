// src/features/patients/ui/PatientsMobileView.tsx
import type { Patient } from "@/entities/patients/model/patient";
import { PatientCard } from "./PatientCard";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";

interface PatientsMobileViewProps {
  patients: Patient[];
  isLoading: boolean;
}

export const PatientsMobileView = ({
  patients,
  isLoading,
}: PatientsMobileViewProps) => {
  const { t } = useTranslation([NAMESPACE_KEYS.patient]);

  if (isLoading) {
    return (
      <div className="lg:hidden p-4 sm:p-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={`skeleton-card-${idx}`}
            className="mb-4 p-4 border rounded-lg animate-pulse"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-12 w-12 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="lg:hidden p-4 sm:p-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {t(PATIENTS_KEYS.list.noPatients, { ns: NAMESPACE_KEYS.patient })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:hidden p-4 sm:p-6">
      {patients.map((patient: Patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
};
