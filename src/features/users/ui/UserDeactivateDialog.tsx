import { useDeactivateUser } from "@/features/users/hooks/useDeactivateUser";
import ActionDialog from "@/shared/ui/ActionDialog";
import { useTranslation } from "react-i18next";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { Button } from "@/shared/ui/button";
import { Power } from "lucide-react";
import type { User } from "@/entities/users/model";

interface UserDeactivateDialogProps {
  userId: number;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  user: User;
}

export const UserDeactivateDialog = ({
  userId,
  trigger,
  onSuccess,
  user,
}: UserDeactivateDialogProps) => {
  const { t } = useTranslation([NAMESPACE_KEYS.users]);
  const { deactivateUser, isLoading } = useDeactivateUser();
  const handleDeactivate = async (onDeactivateSuccess: () => void) => {
    await deactivateUser(String(userId), {
      onSuccess: () => {
        onDeactivateSuccess();
        onSuccess?.();
      },
    });
  };
  const defaultTrigger = (
    <Button
      variant="outline"
      className="w-full justify-normal bg-red-600 text-white hover:bg-red-700 hover:text-white border-none"
    >
      <Power className="mr-2 h-4 w-4 text-white" />
      {t(USERS_KEYS.deactivate.button, { ns: NAMESPACE_KEYS.users })}
    </Button>
  );
  return (
    <ActionDialog
      onAction={handleDeactivate}
      loading={isLoading}
      trigger={trigger || defaultTrigger}
      className="min-w-40"
      title={t(USERS_KEYS.deactivate.button, { ns: NAMESPACE_KEYS.users })}
      description={
        <div>
          {user && (
            <div className="mb-2 text-muted-foreground">
              {t(USERS_KEYS.roles.userInfo, { ns: NAMESPACE_KEYS.users })}:{" "}
              <b>
                {user.firstName} {user.lastName}
              </b>{" "}
              (ID: {userId})
            </div>
          )}

          {t(USERS_KEYS.deactivate.confirm, { ns: NAMESPACE_KEYS.users })}
        </div>
      }
    />
  );
};

export default UserDeactivateDialog;
