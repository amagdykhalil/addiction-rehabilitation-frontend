import { useDeletePatient } from "@/features/patients/hooks/useDeletePatient";
import { DeleteDialog } from "@/shared/ui/DeleteDialog";
import { useTranslation } from "react-i18next";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import type { Patient } from "@/entities/patients/model";
// import { useNavigate } from "react-router-dom";

interface PatientDeleteDialogProps {
  patientId: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  patient: Patient;
}

export const PatientDeleteDialog = ({
  patientId,
  trigger,
  onSuccess,
  patient,
}: PatientDeleteDialogProps) => {
  const { t } = useTranslation([NAMESPACE_KEYS.patient]);
  const { deletePatient, isLoading } = useDeletePatient();
  //   const navigate = useNavigate();
  const handleDelete = async (onDeleteSuccess: () => void) => {
    await deletePatient(patientId, {
      onSuccess: () => {
        onDeleteSuccess();
        onSuccess?.();
      },
    });
  };

  return (
    <DeleteDialog
      onDelete={handleDelete}
      loading={isLoading}
      trigger={trigger}
      className="min-w-40"
      title={t(PATIENTS_KEYS.delete.button, { ns: NAMESPACE_KEYS.patient })}
      description={
        <div>
          {patient && (
            <div className="mb-2 text-muted-foreground">
              {t(PATIENTS_KEYS.form.patient, { ns: NAMESPACE_KEYS.patient })}:{" "}
              <b>
                {patient.firstName} {patient.lastName}
              </b>{" "}
              (ID: {patientId})
            </div>
          )}
          {t(PATIENTS_KEYS.delete.confirm, {
            ns: NAMESPACE_KEYS.patient,
          })}
        </div>
      }
    />
  );
};

export default PatientDeleteDialog;
