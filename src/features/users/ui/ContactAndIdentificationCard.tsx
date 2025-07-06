import type { User } from "@/entities/users/model";
import { Card, CardContent } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { USERS_KEYS } from "@/entities/users/lib/translationKeys";
import NotProvidedText from "@/shared/ui/NotProvidedText";
import { Phone, MapPin, IdCard } from "lucide-react";

export const ContactAndIdentificationCard = ({ user }: { user: User }) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.users]);
  return (
    <Card>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.phoneNumber, { ns: NAMESPACE_KEYS.users })}:
            </span>
            <span className="ml-2">
              {user.callPhoneNumber || (
                <NotProvidedText>
                  {t(USERS_KEYS.details.notProvided, {
                    ns: NAMESPACE_KEYS.users,
                  })}
                </NotProvidedText>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.nationality, { ns: NAMESPACE_KEYS.users })}:
            </span>
            <span className="ml-2">
              {user.nationalityName || (
                <NotProvidedText>
                  {t(USERS_KEYS.details.notProvided, {
                    ns: NAMESPACE_KEYS.users,
                  })}
                </NotProvidedText>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IdCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.nationalIdNumber, {
                ns: NAMESPACE_KEYS.users,
              })}
              :
            </span>
            <span className="ml-2">
              {user.nationalIdNumber || (
                <NotProvidedText>
                  {t(USERS_KEYS.details.notProvided, {
                    ns: NAMESPACE_KEYS.users,
                  })}
                </NotProvidedText>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IdCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {t(USERS_KEYS.details.passportNumber, {
                ns: NAMESPACE_KEYS.users,
              })}
              :
            </span>
            <span className="ml-2">
              {user.passportNumber || (
                <NotProvidedText>
                  {t(USERS_KEYS.details.notProvided, {
                    ns: NAMESPACE_KEYS.users,
                  })}
                </NotProvidedText>
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactAndIdentificationCard;
