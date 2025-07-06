import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { generatePath, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PatientForm } from "@/features/patients/ui/PatientForm";
import { useAddPatient } from "@/features/patients/hooks/useAddPatient";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import { PageHeader } from "@/shared/ui";
import type { PatientFormData } from "@/features/patients/ui/types";
import { mapFormDataToPatient } from "@/features/patients/ui/utils/formUtils";
import { PATIENTS_ROUTES } from "@/entities/patients/routes";

export default function AddPatientPage() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.patient]);
  const navigate = useNavigate();

  const { addPatient, isLoading } = useAddPatient();

  const handleSubmit = async (data: PatientFormData) => {
    // Map form data to Patient type for API call (without id for new patient)
    const patientData = mapFormDataToPatient(data, "");

    await addPatient(patientData, {
      onSuccess: (response) => {
        // Navigate to the newly created patient's details page
        if (response?.result) {
          navigate(
            generatePath(
              `${PATIENTS_ROUTES.MAIN_PATH}/${PATIENTS_ROUTES.DETAIL}`,
              {
                patientId: String(response.result),
              },
            ),
          );
        } else {
          // Fallback to patients list if no id returned
          navigate(PATIENTS_ROUTES.MAIN_PATH);
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(PATIENTS_KEYS.form.addPatient, { ns: NAMESPACE_KEYS.patient })}
        subtitle={t(PATIENTS_KEYS.details.title, {
          ns: NAMESPACE_KEYS.patient,
        })}
        backTo={{
          href: PATIENTS_ROUTES.MAIN_PATH,
          label: t(PATIENTS_KEYS.backToList, { ns: NAMESPACE_KEYS.patient }),
        }}
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
          <PatientForm onSubmit={handleSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
