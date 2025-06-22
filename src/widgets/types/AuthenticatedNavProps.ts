import type { Locale } from "@/shared/i18n/constants/locales";
import type { TFunction } from "i18next";

export interface AuthenticatedNavProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
  currentLanguage: Locale;
  onLanguageChange?: (language: Locale) => void;
  isLoading?: boolean;
  t: TFunction;
}
