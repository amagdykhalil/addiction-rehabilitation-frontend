import { useParams, generatePath } from "react-router-dom";
import { useGetUser } from "@/features/users/hooks";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { UserProfileCard } from "@/features/users/ui/UserProfileCard";
import PersonalInformationCard from "@/features/users/ui/PersonalInformationCard";
import ContactAndIdentificationCard from "@/features/users/ui/ContactAndIdentificationCard";
import { PageHeader, ErrorCard, Button } from "@/shared/ui";
import { Edit, Users } from "lucide-react";
import UserActivateDialog from "@/features/users/ui/UserActivateDialog";
import UserDeactivateDialog from "@/features/users/ui/UserDeactivateDialog";
import UpdateUserRolesDialog from "@/features/users/ui/components/UpdateUserRolesDialog";
import { ROUTES } from "@/shared/routes";

export default function UserDetailPage() {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.users]);
  const params = useParams();
  const userId = params.userId as string;
  const { user, isLoading, error } = useGetUser(userId);

  if (isLoading) {
    // You can use a skeleton loader here if you have one for users
    return (
      <div className="p-8">
        {t(USERS_KEYS.loading, { ns: NAMESPACE_KEYS.users })}
      </div>
    );
  }

  if (error || !user) {
    return (
      <ErrorCard
        title={t(USERS_KEYS.notFound.title, { ns: NAMESPACE_KEYS.users })}
        message={t(USERS_KEYS.notFound.message, {
          ns: NAMESPACE_KEYS.users,
          id: userId,
        })}
        backToPath={ROUTES.USERS.MAIN_PATH}
        backToText={t(USERS_KEYS.backToList, { ns: NAMESPACE_KEYS.users })}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(USERS_KEYS.details.title, { ns: NAMESPACE_KEYS.users })}
        subtitle={t(USERS_KEYS.details.subtitle, { ns: NAMESPACE_KEYS.users })}
        backTo={{
          href: ROUTES.USERS.MAIN_PATH,
          label: t(USERS_KEYS.backToList, { ns: NAMESPACE_KEYS.users }),
        }}
        actions={[
          {
            label: t(USERS_KEYS.edit, { ns: NAMESPACE_KEYS.users }),
            href: generatePath(
              `${ROUTES.USERS.MAIN_PATH}/${ROUTES.USERS.EDIT}`,
              {
                userId: String(user.id),
              }
            ),
            variant: "outline",
            size: "default",
            icon: <Edit className="h-4 w-4 mr-2" />,
          },
          <UpdateUserRolesDialog
            userId={Number(userId)}
            user={user}
            trigger={
              <Button variant="outline" className="w-full justify-normal">
                <Users className="mr-2 h-4 w-4" />
                {t(USERS_KEYS.roles.update, { ns: NAMESPACE_KEYS.users })}
              </Button>
            }
          />,
          user.isActive ? (
            <UserDeactivateDialog userId={user.id} user={user} />
          ) : (
            <UserActivateDialog user={user} userId={user.id} />
          ),
        ]}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserProfileCard user={user} />
        <div className="lg:col-span-2 space-y-6">
          <PersonalInformationCard user={user} />
          <ContactAndIdentificationCard user={user} />
        </div>
      </div>
    </div>
  );
}
