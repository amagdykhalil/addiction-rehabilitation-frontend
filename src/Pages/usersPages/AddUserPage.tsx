import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { generatePath, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserForm } from "@/features/users/ui/UserForm";
import { useAddUser } from "@/features/users/hooks";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { PageHeader } from "@/shared/ui";
import type { UserFormData } from "@/features/users/models/types";
import { mapFormDataToUser } from "@/features/users//models/formUtils";
import { ROUTES } from "@/shared/routes";

export default function AddUserPage() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.users]);
  const navigate = useNavigate();
  const { addUser, isLoading } = useAddUser();

  const handleSubmit = async (data: UserFormData) => {
    const userData = mapFormDataToUser(data, "");
    await addUser(userData, {
      onSuccess: (response) => {
        if (response?.result) {
          navigate(
            generatePath(`${ROUTES.USERS.MAIN_PATH}/${ROUTES.USERS.DETAIL}`, {
              userId: String(response.result),
            })
          );
        } else {
          navigate(ROUTES.USERS.MAIN_PATH);
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(USERS_KEYS.add, { ns: NAMESPACE_KEYS.users })}
        subtitle={t(USERS_KEYS.details.title, { ns: NAMESPACE_KEYS.users })}
        backTo={{
          href: ROUTES.USERS.MAIN_PATH,
          label: t(USERS_KEYS.backToList, { ns: NAMESPACE_KEYS.users }),
        }}
      />
      <Card>
        <CardHeader>
          <CardTitle>
            {t(USERS_KEYS.details.title, { ns: NAMESPACE_KEYS.users })}
          </CardTitle>
          <CardDescription>
            {t(USERS_KEYS.details.subtitle, { ns: NAMESPACE_KEYS.users })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
