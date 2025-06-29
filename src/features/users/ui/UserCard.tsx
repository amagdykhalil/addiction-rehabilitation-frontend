import type { User, UserRole, UserStatus } from "@/entities/users/model";
import { Card, CardContent } from "@/shared/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USER_KEYS } from "@/entities/users/lib/translationKeys";
import { UserMenuAction } from "./UserMenuAction";
import { formatDate } from "@/shared/lib/date";

export const UserCard = ({ user }: { user: User }) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.user]);

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.Admin:
        return t(USER_KEYS.role.admin, { ns: NAMESPACE_KEYS.user });
      case UserRole.Doctor:
        return t(USER_KEYS.role.doctor, { ns: NAMESPACE_KEYS.user });
      case UserRole.Nurse:
        return t(USER_KEYS.role.nurse, { ns: NAMESPACE_KEYS.user });
      case UserRole.Receptionist:
        return t(USER_KEYS.role.receptionist, { ns: NAMESPACE_KEYS.user });
      default:
        return "Unknown";
    }
  };

  const getStatusLabel = (status: UserStatus) => {
    switch (status) {
      case UserStatus.Active:
        return t(USER_KEYS.status.active, { ns: NAMESPACE_KEYS.user });
      case UserStatus.Inactive:
        return t(USER_KEYS.status.inactive, { ns: NAMESPACE_KEYS.user });
      case UserStatus.Suspended:
        return t(USER_KEYS.status.suspended, { ns: NAMESPACE_KEYS.user });
      default:
        return "Unknown";
    }
  };

  const getStatusVariant = (status: UserStatus) => {
    switch (status) {
      case UserStatus.Active:
        return "default";
      case UserStatus.Inactive:
        return "secondary";
      case UserStatus.Suspended:
        return "destructive";
      default:
        return "outline";
    }
  };

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
              {[
                user.firstName,
                user.secondName,
                user.thirdName,
                user.lastName,
              ]
                .filter(Boolean)
                .join(" ")}
            </h3>
            <p className="text-xs text-muted-foreground font-mono truncate">
              {t(USER_KEYS.details.userId, {
                ns: NAMESPACE_KEYS.user,
              })}
              : {user.id}
            </p>
          </div>
          {/* Actions */}
          <UserMenuAction id={user.id} />
        </div>
        {/* Details grid */}
        <div className="space-y-2">
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(USER_KEYS.table.email, { ns: NAMESPACE_KEYS.user })}:
            </span>
            <span className="text-sm truncate">{user.email}</span>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(USER_KEYS.table.role, { ns: NAMESPACE_KEYS.user })}:
            </span>
            <Badge variant="outline" className="text-xs">
              {getRoleLabel(user.role)}
            </Badge>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(USER_KEYS.table.status, { ns: NAMESPACE_KEYS.user })}:
            </span>
            <Badge variant={getStatusVariant(user.status) as any} className="text-xs">
              {getStatusLabel(user.status)}
            </Badge>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(USER_KEYS.details.phone, { ns: NAMESPACE_KEYS.user })}:
            </span>
            <span className="text-sm truncate">{user.callPhoneNumber}</span>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(USER_KEYS.details.nationality, {
                ns: NAMESPACE_KEYS.user,
              })}
              :
            </span>
            <span className="text-sm truncate">{user.nationalityName}</span>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <span className="text-muted-foreground">
              {t(USER_KEYS.table.createdAt, { ns: NAMESPACE_KEYS.user })}:
            </span>
            <span className="text-sm truncate">{formatDate(user.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};