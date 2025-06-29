import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USER_KEYS } from "@/entities/users/lib/translationKeys";
import { PageHeader } from "@/shared/ui";
import { USERS_ROUTES } from "@/entities/users/routes";

export default function AddUserPage() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.user]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(USER_KEYS.form.addUser, { ns: NAMESPACE_KEYS.user })}
        subtitle={t(USER_KEYS.details.title, { ns: NAMESPACE_KEYS.user })}
        backTo={{
          href: USERS_ROUTES.MAIN_PATH,
          label: t(USER_KEYS.backToList, { ns: NAMESPACE_KEYS.user }),
        }}
      />

      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Add user page - Implementation needed
        </p>
      </div>
    </div>
  );
}