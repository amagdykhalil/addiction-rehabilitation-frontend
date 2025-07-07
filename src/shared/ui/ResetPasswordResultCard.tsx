import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { ResultCard } from "./ResultCard";
import { ROUTES } from "../routes";
import { useTranslation } from "react-i18next";

interface ResetPasswordResultCardProps {
  isSuccess?: boolean | undefined;
}

export const ResetPasswordResultCard = ({
  isSuccess,
}: ResetPasswordResultCardProps) => {
  const { t } = useTranslation([NAMESPACE_KEYS.auth]);

  if (isSuccess) {
    return (
      <ResultCard
        variant="success"
        title={t(AUTH_KEYS.resetPassword.successTitle, {
          ns: NAMESPACE_KEYS.auth,
        })}
        description={t(AUTH_KEYS.resetPassword.successDescription, {
          ns: NAMESPACE_KEYS.auth,
        })}
        buttonText={t(AUTH_KEYS.resetPassword.goToLogin, {
          ns: NAMESPACE_KEYS.auth,
        })}
        buttonLink={ROUTES.LOGIN}
      />
    );
  } else {
    return (
      <ResultCard
        variant="error"
        title={t(AUTH_KEYS.resetPassword.failTitle, {
          ns: NAMESPACE_KEYS.auth,
        })}
        description={t(AUTH_KEYS.errors.failedToReset, {
          ns: NAMESPACE_KEYS.auth,
        })}
        buttonText={t(AUTH_KEYS.resetPassword.goToLogin, {
          ns: NAMESPACE_KEYS.auth,
        })}
        buttonLink={ROUTES.LOGIN}
      />
    );
  }
};
