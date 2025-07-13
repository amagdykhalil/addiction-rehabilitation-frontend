import { useDeleteUser } from "@/features/users/hooks";
import { DeleteDialog } from "@/shared/ui/DeleteDialog";
import { useTranslation } from "react-i18next";
import { COMMON_KEYS, NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USER_KEYS } from "@/entities/user/lib/translationKeys";

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
  const { t } = useTranslation([NAMESPACE_KEYS.user, NAMESPACE_KEYS.common]);
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
      title={t(COMMON_KEYS.delete.button, { ns: NAMESPACE_KEYS.user })}
      description={t(USER_KEYS.delete.confirm, {
        ns: NAMESPACE_KEYS.user,
      })}
    />
  );
};

export default UserDeleteDialog;
