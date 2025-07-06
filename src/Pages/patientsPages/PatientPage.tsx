import { useParams, useNavigate, generatePath } from "react-router-dom";
import { useGetPatient } from "@/features/patients/hooks/useGetPatient";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import { PatientPageSkeleton, ErrorCard, PageHeader } from "@/shared/ui";
import {
  PatientProfileCard,
  PersonalInformationCard,
  ContactAndIdentificationCard,
} from "./components";
import PatientDeleteDialog from "@/features/patients/ui/PatientDeleteDialog";
import { PATIENTS_ROUTES } from "@/entities/patients/routes";
import { Edit } from "lucide-react";

export default function PatientDetailsPage() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.patient]);
  const params = useParams();
  const patientId = params.patientId as string;

  const { patient, isLoading, error } = useGetPatient(patientId);
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate(PATIENTS_ROUTES.MAIN_PATH);
  };
  if (isLoading) {
    return <PatientPageSkeleton />;
  }

  if (error || !patient) {
    return (
      <ErrorCard
        title={t(PATIENTS_KEYS.notFound.title, { ns: NAMESPACE_KEYS.patient })}
        message={t(PATIENTS_KEYS.notFound.message, {
          ns: NAMESPACE_KEYS.patient,
          id: patientId,
        })}
        backToPath={PATIENTS_ROUTES.MAIN_PATH}
        backToText={t(PATIENTS_KEYS.backToList, { ns: NAMESPACE_KEYS.patient })}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(PATIENTS_KEYS.details.title, { ns: NAMESPACE_KEYS.patient })}
        subtitle={t(PATIENTS_KEYS.details.subtitle, {
          ns: NAMESPACE_KEYS.patient,
        })}
        backTo={{
          href: PATIENTS_ROUTES.MAIN_PATH,
          label: t(PATIENTS_KEYS.backToList, { ns: NAMESPACE_KEYS.patient }),
        }}
        actions={[
          {
            label: t(PATIENTS_KEYS.edit, { ns: NAMESPACE_KEYS.patient }),
            href: generatePath(
              `${PATIENTS_ROUTES.MAIN_PATH}/${PATIENTS_ROUTES.EDIT}`,
              {
                patientId,
              }
            ),
            variant: "outline",
            size: "default",
            icon: <Edit className="h-4 w-4 mr-2" />,
          },
          <PatientDeleteDialog
            patientId={patient.id}
            onSuccess={onSuccess}
            patient={patient}
          />,
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PatientProfileCard patient={patient} />

        <div className="lg:col-span-2 space-y-6">
          <PersonalInformationCard patient={patient} />
          <ContactAndIdentificationCard patient={patient} />
        </div>
      </div>
    </div>
  );
}
