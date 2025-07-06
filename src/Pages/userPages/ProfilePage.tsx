import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useTranslation } from "react-i18next";
import { UserForm } from "@/features/users/ui/UserForm";
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USER_KEYS } from "@/entities/user/lib/translationKeys";
import { PageHeader } from "@/shared/ui";
import { mapFormDataToUser } from "@/features/users/ui/utils/formUtils";
import type { UserFormData } from "@/features/users/ui/types";
import { useAuth } from "@/entities/auth/model/useAuth";
import { toast } from "sonner";

export const ProfilePage = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.user]);
  const { authData } = useAuth();
  const userId = authData?.userId as string;
  const { editUser, isLoading } = useUpdateUser();

  const handleSubmit = async (data: UserFormData) => {
    const userData = mapFormDataToUser(data, userId);
    await editUser(
      {
        User: userData,
      },
      {
        onSuccess: () => {
          toast.success(
            t(USER_KEYS.profile.updated, { ns: NAMESPACE_KEYS.user })
          );
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(USER_KEYS.profile.title, { ns: NAMESPACE_KEYS.user })}
        subtitle={t(USER_KEYS.profile.subtitle, { ns: NAMESPACE_KEYS.user })}
      />
      <Card>
        <CardHeader>
          <CardTitle>
            {t(USER_KEYS.details.title, { ns: NAMESPACE_KEYS.user })}
          </CardTitle>
          <CardDescription>
            {t(USER_KEYS.details.subtitle, { ns: NAMESPACE_KEYS.user })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            userId={userId}
          />
        </CardContent>
      </Card>
    </div>
  );
};
