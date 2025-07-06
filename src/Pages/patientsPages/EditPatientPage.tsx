import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PatientForm } from "@/features/patients/ui/PatientForm";
import { useUpdatePatient } from "@/features/patients/hooks/useUpdatePatient";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import { PageHeader } from "@/shared/ui";
import type { PatientFormData } from "@/features/patients/ui/types";
import { mapFormDataToPatient } from "@/features/patients/lib/formUtils";
import { Eye } from "lucide-react";
import { ROUTES } from "@/shared/routes";

export default function AddPatientPage() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.patient]);
  const params = useParams();
  const navigate = useNavigate();
  const patientId = params.patientId as string;

  const { updatePatient, isLoading } = useUpdatePatient();

  const handleSubmit = async (data: PatientFormData) => {
    // Map form data to Patient type for API call
    const patientData = mapFormDataToPatient(data, patientId);

    await updatePatient(
      { patient: patientData },
      {
        onSuccess: () => {
          // Navigate back to patient details page after successful update
          navigate(
            generatePath(
              `${ROUTES.PATIENTS.MAIN_PATH}/${ROUTES.PATIENTS.DETAIL}`,
              {
                patientId,
              },
            ),
          );
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(PATIENTS_KEYS.edit, { ns: NAMESPACE_KEYS.patient })}
        subtitle={t(PATIENTS_KEYS.details.title, {
          ns: NAMESPACE_KEYS.patient,
        })}
        backTo={{
          href: generatePath(
            `${ROUTES.PATIENTS.MAIN_PATH}/${ROUTES.PATIENTS.DETAIL}`,
            {
              patientId,
            },
          ),
          label: t(PATIENTS_KEYS.backToList, { ns: NAMESPACE_KEYS.patient }),
        }}
        actions={[
          {
            label: t(PATIENTS_KEYS.list.viewDetails, {
              ns: NAMESPACE_KEYS.patient,
            }),
            href: generatePath(
              `${ROUTES.PATIENTS.MAIN_PATH}/${ROUTES.PATIENTS.DETAIL}`,
              {
                patientId,
              },
            ),
            variant: "outline",
            size: "default",
            icon: <Eye className="h-4 w-4 mr-2 rtl-flip" />,
          },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>
            {t(PATIENTS_KEYS.details.title, { ns: NAMESPACE_KEYS.patient })}
          </CardTitle>
          <CardDescription>
            {t(PATIENTS_KEYS.details.subtitle, { ns: NAMESPACE_KEYS.patient })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PatientForm
            patientId={patientId}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
