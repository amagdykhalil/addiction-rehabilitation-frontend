import LanguageDetector from "i18next-browser-languagedetector";

const customDetector = {
  name: "customSource",

  lookup(): string {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(".AspNetCore.Culture="));

    if (cookie) {
      const value = decodeURIComponent(cookie.split("=")[1]);
      const language = value.split("|")[0].split("=")[1];

      if (language) {
        return language;
      }
    }

    const lang = navigator.language || navigator.languages[0];
    return lang.includes("-") ? lang.split("-")[0] : lang;
  },
};

const detection = {
  order: [
    "customSource",
    "cookie",
    "navigator",
    "localStorage",
    "sessionStorage",
  ],
};

export const languageDetector = new LanguageDetector(null, detection);
languageDetector.addDetector(customDetector);
