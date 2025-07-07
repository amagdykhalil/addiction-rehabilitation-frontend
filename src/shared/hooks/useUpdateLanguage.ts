import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { Locale } from "@/shared/i18n/constants/locales";
import { setLanguageCookie } from "@/shared/api/lang";

export function useUpdateLanguage() {
  const { i18n } = useTranslation();

  const mutation = useMutation({
    mutationFn: (culture: Locale) => setLanguageCookie(culture),
    onSuccess: (_data, culture) => {
      i18n.changeLanguage(culture);
    },
  });

  return {
    changeLanguage: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error ? mutation.error : null,
  };
}
