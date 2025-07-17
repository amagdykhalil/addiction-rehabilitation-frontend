import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { Locale } from "@/shared/i18n/constants/locales";
import { setLanguageCookie } from "@/shared/api/lang";

export function useUpdateLanguage() {
  const { i18n } = useTranslation();

  const mutation = useMutation({
    mutationFn: (culture: Locale) => setLanguageCookie(culture),
    onSuccess: (_data, _culture) => {
      const locale = _data.result ? _data.result : _culture;
      i18n.changeLanguage(locale);
      // Set 'site_lang' cookie with 1 year expiry
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `site_lang=${locale}; expires=${expires.toUTCString()}; path=/`;
    },
  });

  return {
    changeLanguage: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error ? mutation.error : null,
  };
}
