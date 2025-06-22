import { Button } from "@/shared/ui/button";
import { Globe } from "lucide-react";
import type { TFunction } from "i18next";
import {
  LOCALE_CODES,
  LOCALE_NAMES,
  type Locale,
} from "@/shared/i18n/constants/locales";

interface LanguageToggleProps {
  currentLanguage: Locale;
  onLanguageChange?: (language: Locale) => void;
  disabled?: boolean;
  t?: TFunction;
  className?: string;
}

export const LanguageToggle = ({
  currentLanguage,
  onLanguageChange,
  disabled,
  className,
}: LanguageToggleProps) => {
  const handleLanguageToggle = () => {
    if (disabled) return;
    const newLanguage =
      currentLanguage === LOCALE_CODES.English
        ? LOCALE_CODES.Araic
        : LOCALE_CODES.English;
    onLanguageChange?.(newLanguage as Locale);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLanguageToggle}
      className={`flex items-center gap-2 space-x-2 cursor-pointer ${className}`}
      disabled={disabled}
    >
      <Globe className="mr-2 ml-0 h-4 w-4" />
      <span className="text-sm font-medium">
        {currentLanguage === LOCALE_CODES.English
          ? LOCALE_NAMES.ar
          : LOCALE_NAMES.en}
      </span>
    </Button>
  );
};
