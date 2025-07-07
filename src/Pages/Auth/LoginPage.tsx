import React from "react";
import { LoginForm } from "@/features/auth/ui/LoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/routes";
import { useTranslation } from "react-i18next";

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useLogin();
  const { t } = useTranslation([NAMESPACE_KEYS.auth]);

  return (
    <LoginForm onSubmit={login} isLoading={isLoading}>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t(AUTH_KEYS.login.forgotPassword, { ns: NAMESPACE_KEYS.auth })}
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="font-medium text-primary hover:underline"
          >
            {t(AUTH_KEYS.login.resetPassword, { ns: NAMESPACE_KEYS.auth })}
          </Link>
        </p>
      </div>
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          {t(AUTH_KEYS.login.resendConfirmationPrompt, {
            ns: NAMESPACE_KEYS.auth,
          })}
          <Link
            to={ROUTES.RESEND_CONFIRMATION_EMAIL}
            className="font-medium text-primary hover:underline ml-1"
          >
            {t(AUTH_KEYS.login.resendConfirmationLink, {
              ns: NAMESPACE_KEYS.auth,
            })}
          </Link>
        </p>
      </div>
    </LoginForm>
  );
};
