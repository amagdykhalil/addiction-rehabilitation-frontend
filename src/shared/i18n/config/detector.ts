import LanguageDetector, {
  type DetectorOptions,
} from "i18next-browser-languagedetector";

const customDetector = {
  name: "customSource",

  lookup(): string {
    // First, check for 'site_lang' cookie
    const siteLangCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("site_lang="));
    if (siteLangCookie) {
      const value = decodeURIComponent(siteLangCookie.split("=")[1]);
      if (value) {
        return value;
      }
    }

    // Fallback to browser language
    const lang = navigator.language || navigator.languages[0];
    return lang.includes("-") ? lang.split("-")[0] : lang;
  },
};

const detection: DetectorOptions = {
  order: [
    "customSource",
    "localStorage",
    "cookie",
    "navigator",
    "sessionStorage",
  ],
};

const languageDetector = new LanguageDetector(null, detection);
languageDetector.addDetector(customDetector);

export default languageDetector;
