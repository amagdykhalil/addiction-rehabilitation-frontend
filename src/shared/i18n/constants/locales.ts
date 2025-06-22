// allowed language codes
export const LOCALES = ["en", "ar"] as const;

// TypeScript type for all supported locales
export type Locale = (typeof LOCALES)[number];

// Optional: map codes to display names
export const LOCALE_NAMES_MAP: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export const LOCALE_NAMES = {
  en: "English",
  ar: "العربية",
} as const;

// Map display names to codes
export const LOCALE_CODES = {
  English: "en",
  Araic: "ar",
} as const;
