import { ButtonLink } from "@/shared/ui/button-link";
import { MobileSearch } from "./MobileSearch";
import { USER_KEYS } from "@/entities/user/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { LogOut, Settings, User } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "@/shared/ui";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import type { MobileMenuProps } from "../types/MobileMenuProps";
import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";

export const MobileNavigation = ({
  isAuthenticated,
  onLogout,
  currentLanguage,
  onLanguageChange,
  isLoading,
  t,
}: MobileMenuProps) => {
  const { dir } = useCurrentLanguage();
  return (
    <>
      {isAuthenticated ? (
        <>
          <MobileSearch />
          <div className="flex flex-col space-y-2" dir={dir}>
            <ButtonLink
              variant="ghost"
              className="justify-start"
              to="/dashboard"
            >
              <User className="mr-2 h-4 w-4" />
              {t(USER_KEYS.dashboard.title, { ns: NAMESPACE_KEYS.user })}
            </ButtonLink>
            <ButtonLink
              variant="ghost"
              className="justify-start"
              to="/dashboard/projects"
            >
              <User className="mr-2 h-4 w-4" />
              {t(USER_KEYS.dashboard.projects, { ns: NAMESPACE_KEYS.user })}
            </ButtonLink>
            <ButtonLink variant="ghost" className="justify-start" to="/profile">
              <User className="mr-2 h-4 w-4" />
              {t(USER_KEYS.profile.title, { ns: NAMESPACE_KEYS.user })}
            </ButtonLink>
            <ButtonLink
              variant="ghost"
              className="justify-start"
              to="/settings"
            >
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
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 w-full mb-2" dir={dir}>
            <LanguageToggle
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
              disabled={isLoading}
              className="justify-start w-full"
            />
            <ButtonLink className="justify-start" to="/login">
              {t(AUTH_KEYS.login.submitButton, { ns: NAMESPACE_KEYS.auth })}
            </ButtonLink>
          </div>
        </>
      )}
    </>
  );
};
