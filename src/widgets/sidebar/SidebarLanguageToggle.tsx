import { useUpdateLanguage } from "@/features/settings/hooks";
import {
  LOCALE_CODES,
  LOCALE_NAMES,
  type Locale,
} from "@/shared/i18n/constants/locales";
import I18n from "@/shared/lib/initI18n";
import { SidebarMenuButton } from "@/shared/ui/sidebar";
import { Globe } from "lucide-react";

export const SidebarLanguageToggle = () => {
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
    <SidebarMenuButton
      size="sm"
      onClick={handleLanguageToggle}
      className={`cursor-pointer w-full`}
      style={{
        padding: 8,
      }}
      disabled={isLoading}
    >
      <Globe className="ml-0 h-4 w-4 font-normal" />
      <span className="text-sm">
        {currentLanguage === LOCALE_CODES.English
          ? LOCALE_NAMES.ar
          : LOCALE_NAMES.en}
      </span>
    </SidebarMenuButton>
  );
};
