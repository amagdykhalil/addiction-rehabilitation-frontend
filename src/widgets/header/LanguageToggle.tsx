import { Button } from "@/shared/ui/button";
import { Globe } from "lucide-react";
import {
  LOCALE_CODES,
  LOCALE_NAMES,
  type Locale,
} from "@/shared/i18n/constants/locales";
import { useUpdateLanguage } from "@/shared/hooks";
import I18n from "@/shared/lib/initI18n";

export const LanguageToggle = ({ className }: { className?: string }) => {
  const { changeLanguage, isLoading } = useUpdateLanguage();
  const currentLanguage = I18n.language as Locale;
  const onLanguageChange = (language: Locale) => {
    changeLanguage(language);
  };

  const handleLanguageToggle = () => {
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
      disabled={isLoading}
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
