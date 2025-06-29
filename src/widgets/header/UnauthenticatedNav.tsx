import { Button } from "@/shared/ui/button";
import { Link } from "react-router-dom";
import { LanguageToggle } from "./LanguageToggle";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";

import { useTranslation } from "react-i18next";

export const UnauthenticatedNav = () => {
  const { t } = useTranslation([
    NAMESPACE_KEYS.common,
    NAMESPACE_KEYS.auth,
    NAMESPACE_KEYS.user,
  ]);

  return (
    <div className="hidden md:flex items-center space-x-4">
      <LanguageToggle />
      <Button asChild>
        <Link to="/login">
          {t(AUTH_KEYS.login.submitButton, { ns: NAMESPACE_KEYS.auth })}
        </Link>
      </Button>
    </div>
  );
};
