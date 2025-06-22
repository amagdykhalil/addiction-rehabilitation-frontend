import type { Locale } from "@/shared/i18n/constants/locales";
import type { TFunction } from "i18next";

export interface MobileMenuProps {
  isAuthenticated: boolean;
  onLogout?: () => void;
  currentLanguage: Locale;
  onLanguageChange?: (language: Locale) => void;
  isLoading?: boolean;
  t: TFunction;
}
