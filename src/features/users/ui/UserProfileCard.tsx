import type { User } from "@/entities/users/model";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { User as UserIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { COMMON_KEYS, NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import { ActiveStatusText } from "@/shared/ui/ActiveStatusText";

export const UserProfileCard = ({ user }: { user: User }) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.users]);
  return (
    <Card className="lg:col-span-1">
      <CardHeader className="text-center">
        <Avatar className="h-32 w-32 mx-auto mb-4">
          <AvatarImage
            src={user.personalImageURL || "/placeholder.svg"}
            alt={user.firstName + " " + user.lastName}
          />
          <AvatarFallback className="text-2xl">
            {user.firstName?.charAt(0)}
            {user.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <UserIcon className="h-5 w-5 text-muted-foreground" />
          {user.firstName} {user.lastName}
        </CardTitle>
        <CardDescription>
          {t(USERS_KEYS.details.userId, { ns: NAMESPACE_KEYS.users })}:{" "}
          {user.id}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-center gap-3">
          {/* Gender */}
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="text-sm flex items-center gap-1"
            >
              {user.gender === 0
                ? t(COMMON_KEYS.gender.male, { ns: NAMESPACE_KEYS.common })
                : t(COMMON_KEYS.gender.female, { ns: NAMESPACE_KEYS.common })}
            </Badge>
          </div>
          {/* Status */}
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="text-sm flex items-center gap-1"
            >
              <ActiveStatusText isActive={user.isActive}>
                {user.isActive
                  ? t(USERS_KEYS.filters.active, { ns: NAMESPACE_KEYS.users })
                  : t(USERS_KEYS.filters.inactive, {
                      ns: NAMESPACE_KEYS.users,
                    })}
              </ActiveStatusText>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
