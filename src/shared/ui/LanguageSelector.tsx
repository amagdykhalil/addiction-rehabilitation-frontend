// src/shared/ui/LanguageSelector.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import {
  LOCALES,
  LOCALE_NAMES_MAP,
  type Locale,
} from "@/shared/i18n/constants/locales";
import { useUpdateLanguage } from "@/shared/hooks";

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const { changeLanguage, isLoading } = useUpdateLanguage();

  const current = i18n.language as Locale;
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(event.target.value as Locale);
  };

  return (
    <select value={current} onChange={handleChange} disabled={isLoading}>
      {LOCALES.map((code) => (
        <option key={code} value={code}>
          {LOCALE_NAMES_MAP[code]}
        </option>
      ))}
    </select>
  );
};
