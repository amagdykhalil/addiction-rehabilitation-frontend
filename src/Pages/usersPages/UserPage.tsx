import { useParams } from "react-router-dom";
import { useGetUser } from "@/features/users/hooks/useGetUser";
import { USERS_ROUTES } from "@/entities/users/routes";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USER_KEYS } from "@/entities/users/lib/translationKeys";
import { PatientPageSkeleton, ErrorCard, PageHeader } from "@/shared/ui";

export default function UserDetailsPage() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.user]);
  const params = useParams();
  const userId = params.id as string;

  const { user, isLoading, error } = useGetUser(userId);

  if (isLoading) {
    return <PatientPageSkeleton />;
  }

  if (error || !user) {
    return (
      <ErrorCard
        title={t(USER_KEYS.notFound.title, { ns: NAMESPACE_KEYS.user })}
        message={t(USER_KEYS.notFound.message, {
          ns: NAMESPACE_KEYS.user,
          id: userId,
        })}
        backToPath={USERS_ROUTES.MAIN_PATH}
        backToText={t(USER_KEYS.backToList, { ns: NAMESPACE_KEYS.user })}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(USER_KEYS.details.title, { ns: NAMESPACE_KEYS.user })}
        subtitle={t(USER_KEYS.details.subtitle, {
          ns: NAMESPACE_KEYS.user,
        })}
        backTo={{
          href: USERS_ROUTES.MAIN_PATH,
          label: t(USER_KEYS.backToList, { ns: NAMESPACE_KEYS.user }),
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User details implementation would go here */}
        <div className="lg:col-span-3">
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              User details page - Implementation needed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}