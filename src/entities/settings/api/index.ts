import { BaseFetch } from "@/shared/api";

async function setLanguageCookie(culture: string) {
  return BaseFetch<null>(`/Settings/set-language?culture=${culture}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}

export const settingsApi = {
  setLanguage: setLanguageCookie,
};
