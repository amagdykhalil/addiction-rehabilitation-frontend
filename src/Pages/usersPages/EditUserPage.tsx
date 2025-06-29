import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USER_KEYS } from "@/entities/users/lib/translationKeys";
import { PageHeader } from "@/shared/ui";
import { Eye } from "lucide-react";

export default function EditUserPage() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.user]);
  const params = useParams();
  const userId = params.id as string;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(USER_KEYS.edit, { ns: NAMESPACE_KEYS.user })}
        subtitle={t(USER_KEYS.details.title, { ns: NAMESPACE_KEYS.user })}
        backTo={{
          href: `/users/${userId}`,
          label: t(USER_KEYS.backToList, { ns: NAMESPACE_KEYS.user }),
        }}
        actions={[
          {
            label: t(USER_KEYS.list.viewDetails, {
              ns: NAMESPACE_KEYS.user,
            }),
            href: `/users/${userId}`,
            variant: "outline",
            size: "default",
            icon: <Eye className="h-4 w-4 mr-2 rtl-flip" />,
          },
        ]}
      />

      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Edit user page - Implementation needed
        </p>
      </div>
    </div>
  );
}