import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserForm } from "@/features/users/ui/UserForm";
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { PageHeader } from "@/shared/ui";
import { USERS_ROUTES } from "@/entities/users/routes/usersRoutesPaths";
import { Eye } from "lucide-react";
import { mapFormDataToUser } from "@/features/users/ui/utils/formUtils";
import type { UserFormData } from "@/features/users/ui/types";

export default function EditUserPage() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.users]);
  const params = useParams();
  const navigate = useNavigate();
  const userId = params.userId as string;
  const { editUser, isLoading } = useUpdateUser();

  const handleSubmit = async (data: UserFormData) => {
    const userData = mapFormDataToUser(data, userId);
    await editUser(
      {
        User: userData,
      },
      {
        onSuccess: () => {
          navigate(
            generatePath(`${USERS_ROUTES.MAIN_PATH}/${USERS_ROUTES.DETAIL}`, {
              userId,
            }),
          );
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(USERS_KEYS.edit, { ns: NAMESPACE_KEYS.users })}
        subtitle={t(USERS_KEYS.details.title, { ns: NAMESPACE_KEYS.users })}
        backTo={{
          href: generatePath(`${USERS_ROUTES.MAIN_PATH}`),
          label: t(USERS_KEYS.backToList, { ns: NAMESPACE_KEYS.users }),
        }}
        actions={[
          {
            label: t(USERS_KEYS.list.viewDetails, { ns: NAMESPACE_KEYS.users }),
            href: generatePath(
              `${USERS_ROUTES.MAIN_PATH}/${USERS_ROUTES.DETAIL}`,
              {
                userId,
              },
            ),
            variant: "outline",
            size: "default",
            icon: <Eye className="h-4 w-4 mr-2 rtl-flip" />,
          },
        ]}
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
          <UserForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            userId={userId}
          />
        </CardContent>
      </Card>
    </div>
  );
}
