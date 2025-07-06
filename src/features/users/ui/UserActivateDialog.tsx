import { useActivateUser } from "@/features/users/hooks/useActivateUser";
import { useTranslation } from "react-i18next";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { Button } from "@/shared/ui/button";
import { Power } from "lucide-react";
import type { User } from "@/entities/users/model";
import ActionDialog from "@/shared/ui/ActionDialog";

interface UserActivateDialogProps {
  userId: number;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  user: User;
}

export const UserActivateDialog = ({
  userId,
  trigger,
  onSuccess,
  user,
}: UserActivateDialogProps) => {
  const { t } = useTranslation([NAMESPACE_KEYS.users]);
  const { activateUser, isLoading } = useActivateUser();
  const handleActivate = async (onActivateSuccess: () => void) => {
    await activateUser(String(userId), {
      onSuccess: () => {
        onActivateSuccess();
        onSuccess?.();
      },
    });
  };

  const defaultTrigger = (
    <Button
      variant="outline"
      className="w-full justify-normal bg-green-600 text-white hover:bg-green-700 hover:text-white border-none"
    >
      <Power className="mr-2 h-4 w-4 text-white" />
      {t(USERS_KEYS.activate.button, { ns: NAMESPACE_KEYS.users })}
    </Button>
  );
  return (
    <ActionDialog
      onAction={handleActivate}
      loading={isLoading}
      trigger={trigger || defaultTrigger}
      className="min-w-40"
      actionClassName="justify-normal bg-green-600 text-white hover:bg-green-700 hover:text-white border-none"
      title={t(USERS_KEYS.activate.button, { ns: NAMESPACE_KEYS.users })}
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
          {t(USERS_KEYS.activate.confirm, { ns: NAMESPACE_KEYS.users })}
        </div>
      }
    />
  );
};

export default UserActivateDialog;
