"use client";

import { Logo } from "./Logo";
import { AuthenticatedNav } from "./AuthenticatedNav";
import { UnauthenticatedNav } from "./UnauthenticatedNav";
import { MobileMenu } from "./MobileMenu";
import type { Locale } from "@/shared/i18n/constants/locales";
import { useUpdateLanguage } from "@/features/settings/hooks";
import { useTranslation } from "react-i18next";
import { useLogout } from "@/features/auth/hooks";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const Header = ({ isAuthenticated = false, user }: HeaderProps) => {
  const { i18n, t, ready } = useTranslation([
    NAMESPACE_KEYS.common,
    NAMESPACE_KEYS.auth,
    NAMESPACE_KEYS.user,
  ]);
  const { changeLanguage, isLoading: isLanguageLoading } = useUpdateLanguage();
  const { logout, isLoading: isLogoutLoading } = useLogout();

  const currentLanguage = i18n.language as Locale;
  const onLanguageChange = (language: Locale) => {
    changeLanguage(language);
  };

  if (!ready) return null;
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Logo isAuthenticated={isAuthenticated} />
        {isAuthenticated ? (
          <AuthenticatedNav
            user={user}
            onLogout={logout}
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            isLoading={isLogoutLoading || isLanguageLoading}
            t={t}
          />
        ) : (
          <UnauthenticatedNav
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            isLoading={isLanguageLoading}
            t={t}
          />
        )}
        <MobileMenu
          isAuthenticated={isAuthenticated}
          onLogout={logout}
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          isLoading={isLogoutLoading || isLanguageLoading}
          t={t}
        />
      </div>
    </header>
  );
};
