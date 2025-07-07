import type { User } from "@/entities/users/model";
import { Card, CardContent } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import NotProvidedText from "@/shared/ui/NotProvidedText";
import {
  User as UserIcon,
  UserCircle,
  Venus,
  Mars,
  Shield,
} from "lucide-react";

export const PersonalInformationCard = ({ user }: { user: User }) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.users]);
  return (
    <Card>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.firstName, { ns: NAMESPACE_KEYS.users })}:
            </span>
            <span className="ml-2">
              {user.firstName || (
                <NotProvidedText>
                  {t(USERS_KEYS.details.notProvided, {
                    ns: NAMESPACE_KEYS.users,
                  })}
                </NotProvidedText>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.secondName, { ns: NAMESPACE_KEYS.users })}:
            </span>
            <span className="ml-2">
              {user.secondName || (
                <NotProvidedText>
                  {t(USERS_KEYS.details.notProvided, {
                    ns: NAMESPACE_KEYS.users,
                  })}
                </NotProvidedText>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.thirdName, { ns: NAMESPACE_KEYS.users })}:
            </span>
            <span className="ml-2">
              {user.thirdName || (
                <NotProvidedText>
                  {t(USERS_KEYS.details.notProvided, {
                    ns: NAMESPACE_KEYS.users,
                  })}
                </NotProvidedText>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.lastName, { ns: NAMESPACE_KEYS.users })}:
            </span>
            <span className="ml-2">
              {user.lastName || (
                <NotProvidedText>
                  {t(USERS_KEYS.details.notProvided, {
                    ns: NAMESPACE_KEYS.users,
                  })}
                </NotProvidedText>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {user.gender === 0 ? (
              <Mars className="h-4 w-4 text-blue-500" />
            ) : (
              <Venus className="h-4 w-4 text-pink-500" />
            )}
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.gender, { ns: NAMESPACE_KEYS.users })}:
            </span>
            <span className="ml-2">
              {user.gender === 0 ? (
                t(USERS_KEYS.gender.male, { ns: NAMESPACE_KEYS.users })
              ) : user.gender === 1 ? (
                t(USERS_KEYS.gender.female, { ns: NAMESPACE_KEYS.users })
              ) : (
                <NotProvidedText>
                  {t(USERS_KEYS.details.notProvided, {
                    ns: NAMESPACE_KEYS.users,
                  })}
                </NotProvidedText>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Shield className="h-4 w-4 text-yellow-500" />
            <span className="text-muted-foreground mr-2">
              {t(USERS_KEYS.details.roles, { ns: NAMESPACE_KEYS.users })}:
            </span>
            {user.roles.length > 0 ? (
              user.roles.map((role) => (
                <span
                  key={role}
                  className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold border border-yellow-300 mx-0.5"
                >
                  {role}
                </span>
              ))
            ) : (
              <span className="text-muted-foreground italic text-xs">
                {t(USERS_KEYS.details.notProvided, {
                  ns: NAMESPACE_KEYS.users,
                })}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformationCard;
<div className="flex items-center gap-2 flex-wrap justify-center">
  <Shield className="h-4 w-4 text-yellow-500" />
</div>;
