import { BaseFetch } from "./BaseFetch";

export async function setLanguageCookie(culture: string) {
  return BaseFetch<string>(`/Settings/set-language?culture=${culture}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}
