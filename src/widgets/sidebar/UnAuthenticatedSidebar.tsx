import { ButtonLink } from "@/shared/ui/button-link";
import { LanguageToggle } from "../header/LanguageToggle";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { useTranslation } from "react-i18next";
import { useCurrentLanguage } from "@/shared/hooks/useCurrentLanguage";

export const UnAuthenticatedSidebar = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.auth]);
  const { dir } = useCurrentLanguage();
  return (
    <div className="flex flex-col gap-2 w-full mb-2" dir={dir}>
      <LanguageToggle className="justify-start w-full" />
      <ButtonLink className="justify-start" to="/login">
        {t(AUTH_KEYS.login.submitButton, { ns: NAMESPACE_KEYS.auth })}
      </ButtonLink>
    </div>
  );
};
