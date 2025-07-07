import I18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LOCALES } from "@/shared/i18n/constants/locales";
import { languageDetector } from "@/shared/i18n/config/detector";
import Backend from "i18next-http-backend";

// i18n initialization
// eslint-disable-next-line react-hooks/rules-of-hooks
I18n.use(initReactI18next)
  .use(languageDetector)
  .use(Backend)
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: "ar",
    supportedLngs: LOCALES,
    ns: ["common", "validator"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default I18n;
