import { useDeletePatient } from "@/features/patients/hooks/useDeletePatient";
import { DeleteDialog } from "@/shared/ui/DeleteDialog";
import { useTranslation } from "react-i18next";
import { PATIENT_KEYS } from "@/entities/patients/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
// import { useNavigate } from "react-router-dom";

interface PatientDeleteDialogProps {
  patientId: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export const PatientDeleteDialog = ({
  patientId,
  trigger,
  onSuccess,
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
      title={t(PATIENT_KEYS.delete.button, { ns: NAMESPACE_KEYS.patient })}
      description={t(PATIENT_KEYS.delete.confirm, {
        ns: NAMESPACE_KEYS.patient,
      })}
    />
  );
};

export default PatientDeleteDialog;
