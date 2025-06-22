import { Button } from "@/shared/ui/button";
import { Link } from "react-router-dom";
import { LanguageToggle } from "./LanguageToggle";
import type { TFunction } from "i18next";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import type { Locale } from "@/shared/i18n/constants/locales";

interface UnauthenticatedNavProps {
  currentLanguage: Locale;
  onLanguageChange?: (language: Locale) => void;
  isLoading?: boolean;
  t: TFunction;
}

export const UnauthenticatedNav = ({
  currentLanguage,
  onLanguageChange,
  isLoading,
  t,
}: UnauthenticatedNavProps) => (
  <div className="hidden md:flex items-center space-x-4">
    <LanguageToggle
      currentLanguage={currentLanguage}
      onLanguageChange={onLanguageChange}
      disabled={isLoading}
    />
    <Button asChild>
      <Link to="/login">
        {t(AUTH_KEYS.login.submitButton, { ns: NAMESPACE_KEYS.auth })}
      </Link>
    </Button>
  </div>
);
