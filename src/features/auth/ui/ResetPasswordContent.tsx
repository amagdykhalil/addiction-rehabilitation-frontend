import { useTranslation } from "react-i18next";
import { useQueryState } from "nuqs";
import { useResetPassword } from "../hooks/useResetPassword";
import {
  AlertDescription,
  Alert,
  CardContent,
  CardDescription,
  Card,
  CardTitle,
  CardHeader,
} from "@/shared/ui";
import { AlertTriangle } from "lucide-react";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { AUTH_KEYS } from "../../../entities/auth/lib/translationKeys";
import { ROUTES } from "@/shared/routes";
import { Link } from "react-router-dom";
import { useState } from "react";

export function ResetPasswordContent() {
  const [email] = useQueryState("email");
  const [resetCode] = useQueryState("resetCode");
  const { resetPassword, isLoading } = useResetPassword();
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.auth]);

  const handleResetPassword = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (email && resetCode) {
      await resetPassword(
        {
          email,
          resetCode,
          newPassword: data.newPassword,
        },
        {
          onSettled: (data) => {
            setIsSuccess(data?.isSuccess);
          },
        },
      );
    }
  };
  // Check if required query parameters are present
  if (!email || !resetCode) {
    return (
      <div className="bg-gray-50">
        <main className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-28">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold">
                {t(AUTH_KEYS.errors.invalidResetLink, {
                  ns: NAMESPACE_KEYS.auth,
                })}
              </CardTitle>
              <CardDescription>
                {t(AUTH_KEYS.errors.resetLinkExpired, {
                  ns: NAMESPACE_KEYS.auth,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertDescription>
                  {t(AUTH_KEYS.errors.requestNewLink, {
                    ns: NAMESPACE_KEYS.auth,
                  })}{" "}
                  <Link to={ROUTES.FORGOT_PASSWORD} className="underline">
                    {t(AUTH_KEYS.errors.forgotPasswordPage, {
                      ns: NAMESPACE_KEYS.auth,
                    })}
                  </Link>
                  .
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="">
      <main className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <ResetPasswordForm
          onSubmit={handleResetPassword}
          isLoading={isLoading}
          isSuccess={isSuccess}
          email={email}
        />
      </main>
    </div>
  );
}
