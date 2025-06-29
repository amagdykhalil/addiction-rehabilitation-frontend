import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PatientForm } from "@/features/patients/ui/PatientForm";
import { useUpdatePatient } from "@/features/patients/hooks/useUpdatePatient";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { PATIENT_KEYS } from "@/entities/patients/lib/translationKeys";
import { PageHeader } from "@/shared/ui";
import type { PatientFormData } from "@/features/patients/ui/types";
import { mapFormDataToPatient } from "@/features/patients/ui/utils/formUtils";
import { Eye } from "lucide-react";

export default function EditPatientPage() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.patient]);
  const params = useParams();
  const navigate = useNavigate();
  const patientId = params.id as string;

  const { updatePatient, isLoading } = useUpdatePatient();

  const handleSubmit = async (data: PatientFormData) => {
    // Map form data to Patient type for API call
    const patientData = mapFormDataToPatient(data, patientId);

    await updatePatient(
      { patient: patientData },
      {
        onSuccess: () => {
          // Navigate back to patient details page after successful update
          navigate(`/patients/${patientId}`);
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(PATIENT_KEYS.edit, { ns: NAMESPACE_KEYS.patient })}
        subtitle={t(PATIENT_KEYS.details.title, { ns: NAMESPACE_KEYS.patient })}
        backTo={{
          href: `/patients/${patientId}`,
          label: t(PATIENT_KEYS.backToList, { ns: NAMESPACE_KEYS.patient }),
        }}
        actions={[
          {
            label: t(PATIENT_KEYS.list.viewDetails, {
              ns: NAMESPACE_KEYS.patient,
            }),
            href: `/patients/${patientId}`,
            variant: "outline",
            size: "default",
            icon: <Eye className="h-4 w-4 mr-2 rtl-flip" />,
          },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>
            {t(PATIENT_KEYS.details.title, { ns: NAMESPACE_KEYS.patient })}
          </CardTitle>
          <CardDescription>
            {t(PATIENT_KEYS.details.subtitle, { ns: NAMESPACE_KEYS.patient })}
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
