import { useTranslation } from "react-i18next";
import { LOCALE_CODES } from "../i18n/constants/locales";

interface currentLanguageStates {
  isArabic: boolean;
  dir: "rtl" | "ltr";
}
export const useCurrentLanguage = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === LOCALE_CODES.Araic;

  return { isArabic, dir: isArabic ? "rtl" : "ltr" } as currentLanguageStates;
};
