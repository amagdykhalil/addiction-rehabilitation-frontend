import React, { useEffect } from "react";
import { Button } from "@/shared/ui/button";
import ActionDialog from "@/shared/ui/ActionDialog";
import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { useForm, FormProvider } from "react-hook-form";
import { useGetUserRoles } from "@/features/users/hooks";
import { useUpdateUserRoles } from "@/features/users/hooks";
import { toast } from "sonner";
import { UserRolesSelect } from "./UserRolesSelect";
import { Skeleton } from "@/shared/ui/skeleton";
import type { User } from "@/entities/users/model";

interface UpdateUserRolesDialogProps {
  userId: number;
  user: User;
  trigger?: React.ReactNode;
}

const UpdateUserRolesDialog: React.FC<UpdateUserRolesDialogProps> = ({
  userId,
  user,
  trigger,
}) => {
  const { t } = useTranslation([NAMESPACE_KEYS.users, NAMESPACE_KEYS.common]);
  const { roles: initialRoles, isLoading } = useGetUserRoles(userId);
  const { editUserRoles, isLoading: isUpdatingRoles } = useUpdateUserRoles();
  const methods = useForm<{ Roles: number[] }>({
    defaultValues: { Roles: [] },
  });

  // 2) whenever initialRoles loads, reset the form value
  useEffect(() => {
    if (!isLoading) {
      methods.reset({
        Roles: initialRoles.map((r) => r.id),
      });
    }
  }, [initialRoles, isLoading, methods]);

  const handleUpdateRoles = async (onSuccess: () => void) => {
    const values = methods.getValues();
    editUserRoles(
      { params: { userId, roleIds: values.Roles } },
      {
        onSuccess: () => {
          toast.success(
            t(USERS_KEYS.roles.updateSuccess, { ns: NAMESPACE_KEYS.users })
          );
          onSuccess();
        },
      }
    );
  };

  return (
    <ActionDialog
      onAction={handleUpdateRoles}
      loading={isUpdatingRoles || isLoading}
      className="min-w-40"
      variant="default"
      title={t(USERS_KEYS.roles.updateTitle, { ns: NAMESPACE_KEYS.users })}
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
          {t(USERS_KEYS.roles.updateDescription, { ns: NAMESPACE_KEYS.users })}
        </div>
      }
      trigger={
        trigger || (
          <Button variant="ghost" className="w-full justify-normal font-normal">
            <Users className="mr-2 h-4 w-4" />
            {t(USERS_KEYS.roles.update, { ns: NAMESPACE_KEYS.users })}
          </Button>
        )
      }
    >
      <FormProvider {...methods}>
        {isLoading ? (
          <div className="flex flex-col gap-2 py-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full rounded" />
            ))}
          </div>
        ) : (
          <UserRolesSelect />
        )}
      </FormProvider>
    </ActionDialog>
  );
};

export default UpdateUserRolesDialog;
