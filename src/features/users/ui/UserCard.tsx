import type { User } from "@/entities/users/model";
import { Card, CardContent } from "@/shared/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { UserMenuAction } from "./UserMenuAction";
import { NotProvidedText } from "@/shared/ui/NotProvidedText";
import { ActiveStatusText } from "@/shared/ui/ActiveStatusText";

export const UserCard = ({ user }: { user: User }) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.users]);

  return (
    <Card className="mb-4 p-4 border rounded-lg shadow-sm">
      <CardContent className="p-0">
        {/* Header: avatar + name */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.personalImageURL || "/placeholder.svg"} />
            <AvatarFallback>
              {user.firstName?.charAt(0) ?? ""}
              {user.lastName?.charAt(0) ?? ""}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">
              {[user.firstName, user.secondName, user.thirdName, user.lastName]
                .filter(Boolean)
                .join(" ")}
            </h3>
            <p className="text-xs text-muted-foreground font-mono truncate">
              {t(USERS_KEYS.details.userId, {
                ns: NAMESPACE_KEYS.users,
              })}
              : {user.id}
            </p>
          </div>
          {/* Actions */}
          <UserMenuAction user={user} id={user.id} isActive={user.isActive} />
        </div>
        {/* Details grid */}
        <div className="space-y-2">
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.gender, { ns: NAMESPACE_KEYS.users })}:
            </span>
            <span>
              {user.gender === 0
                ? t(USERS_KEYS.gender.male, {
                    ns: NAMESPACE_KEYS.users,
                  })
                : t(USERS_KEYS.gender.female, {
                    ns: NAMESPACE_KEYS.users,
                  })}
            </span>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.roles, { ns: NAMESPACE_KEYS.users })}:
            </span>
            {user.roles.length > 0 ? (
              <span className="text-sm truncate">{user.roles.join(", ")}</span>
            ) : (
              <NotProvidedText>
                {t(USERS_KEYS.details.notProvided, {
                  ns: NAMESPACE_KEYS.users,
                })}
              </NotProvidedText>
            )}
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.isActive, { ns: NAMESPACE_KEYS.users })}:
            </span>
            <ActiveStatusText isActive={user.isActive}>
              {user.isActive
                ? t(USERS_KEYS.filters.active, { ns: NAMESPACE_KEYS.users })
                : t(USERS_KEYS.filters.inactive, { ns: NAMESPACE_KEYS.users })}
            </ActiveStatusText>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {user.nationalIdNumber
                ? `${t(USERS_KEYS.table.nationalId, { ns: NAMESPACE_KEYS.users })}: `
                : user.passportNumber
                  ? `${t(USERS_KEYS.table.passport, { ns: NAMESPACE_KEYS.users })}: `
                  : t(USERS_KEYS.details.notProvided, {
                      ns: NAMESPACE_KEYS.users,
                    })}
            </span>
            <span className="text-sm font-mono truncate">
              {user.nationalIdNumber
                ? `${user.nationalIdNumber}`
                : user.passportNumber
                  ? `${user.passportNumber}`
                  : ""}
            </span>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.nationality, {
                ns: NAMESPACE_KEYS.users,
              })}
              :
            </span>
            <span className="text-sm truncate">{user.nationalityName}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
