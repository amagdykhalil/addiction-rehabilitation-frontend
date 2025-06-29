import { ButtonLink } from "@/shared/ui/button-link";
import { MobileSearch } from "../header/MobileSearch";
import { LogOut, Settings, User } from "lucide-react";
import { USER_KEYS } from "@/entities/user/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { LanguageToggle } from "../header/LanguageToggle";
import { Button } from "@/shared/ui";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import { useTranslation } from "react-i18next";
import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";
import type { Locale } from "@/shared/i18n/constants/locales";
import { useLogout } from "@/features/auth/hooks";
import I18n from "@/shared/lib/initI18n";
import { changeLanguage } from "i18next";

export const AuthenticatedSidebar = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.auth]);
  const { dir } = useCurrentLanguage();

  const { logout: onLogout, isLoading } = useLogout();

  const currentLanguage = I18n.language as Locale;
  const onLanguageChange = (language: Locale) => {
    changeLanguage(language);
  };

  return (
    <div className="p-4">
      <MobileSearch />
      <div className="flex flex-col space-y-2" dir={dir}>
        <ButtonLink variant="ghost" className="justify-start" to="/dashboard">
          <User className="mr-2 h-4 w-4" />
          {t(USER_KEYS.dashboard.title, { ns: NAMESPACE_KEYS.user })}
        </ButtonLink>
        <ButtonLink variant="ghost" className="justify-start" to="/profile">
          <User className="mr-2 h-4 w-4" />
          {t(USER_KEYS.profile.title, { ns: NAMESPACE_KEYS.user })}
        </ButtonLink>
        <ButtonLink variant="ghost" className="justify-start" to="/settings">
          <Settings className="mr-2 h-4 w-4" />
          {t(USER_KEYS.settings.title, { ns: NAMESPACE_KEYS.user })}
        </ButtonLink>
      </div>
      <div className="border-t pt-4" dir={dir}>
        <LanguageToggle
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          disabled={isLoading}
          className="justify-start w-full px-3"
        />
        <Button
          variant="ghost"
          className="justify-start w-full mt-2 cursor-pointer "
          onClick={onLogout}
          disabled={isLoading}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t(AUTH_KEYS.login.logout, { ns: NAMESPACE_KEYS.auth })}
        </Button>
      </div>
    </div>
  );
};
