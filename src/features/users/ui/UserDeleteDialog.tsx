import { useDeleteUser } from "@/features/users/hooks";
import { DeleteDialog } from "@/shared/ui/DeleteDialog";
import { useTranslation } from "react-i18next";
import { USER_KEYS } from "@/entities/users/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";

interface UserDeleteDialogProps {
  userId: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export const UserDeleteDialog = ({
  userId,
  trigger,
  onSuccess,
}: UserDeleteDialogProps) => {
  const { t } = useTranslation([NAMESPACE_KEYS.user]);
  const { deleteUser, isLoading } = useDeleteUser();

  const handleDelete = async (onDeleteSuccess: () => void) => {
    await deleteUser(userId, {
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
      title={t(USER_KEYS.delete.button, { ns: NAMESPACE_KEYS.user })}
      description={t(USER_KEYS.delete.confirm, {
        ns: NAMESPACE_KEYS.user,
      })}
    />
  );
};

export default UserDeleteDialog;
