import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import { getForgotPasswordValidationSchema } from "@/entities/auth/model/forgotPasswordValidationSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { ROUTES } from "@/shared/routes";
import { useResendConfirmationEmail } from "@/features/auth/hooks/useResendConfirmationEmail";
import { SuccessCard } from "@/shared/ui/cards/SuccessCard";

type ResendConfirmationEmailFormData = z.infer<
  ReturnType<typeof getForgotPasswordValidationSchema>
>;

interface ResendConfirmationEmailFormProps {
  onSubmit?: (data: ResendConfirmationEmailFormData) => void;
  onReset?: () => void;
}

export const ResendConfirmationEmailForm = ({
  onSubmit,
  onReset,
}: ResendConfirmationEmailFormProps) => {
  const { t } = useTranslation([
    NAMESPACE_KEYS.common,
    NAMESPACE_KEYS.auth,
    NAMESPACE_KEYS.validator,
  ]);

  const resendSchema = getForgotPasswordValidationSchema(t);
  const form = useForm<ResendConfirmationEmailFormData>({
    resolver: zodResolver(resendSchema),
    defaultValues: { email: "" },
  });

  const [localError, setLocalError] = useState("");
  const { resendConfirmationEmail, isLoading, isSuccess, reset, error } =
    useResendConfirmationEmail();

  const handleSubmit = async (data: ResendConfirmationEmailFormData) => {
    setLocalError("");
    try {
      resendConfirmationEmail(data);
      if (onSubmit) onSubmit(data);
    } catch {
      setLocalError(
        t(AUTH_KEYS.errors.failedToSendConfirmation, {
          ns: NAMESPACE_KEYS.auth,
        }),
      );
    }
  };

  if (isSuccess) {
    return (
      <div className="main-card">
        <SuccessCard
          icon={
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          }
          title={t(AUTH_KEYS.login.title, { ns: NAMESPACE_KEYS.auth })}
          description={
            <>
              {t(AUTH_KEYS.login.confirmationSent, { ns: NAMESPACE_KEYS.auth })}{" "}
              <strong>{form.getValues("email")}</strong>
            </>
          }
        >
          <Alert>
            <AlertDescription>
              {t(AUTH_KEYS.login.checkSpamConfirmation, {
                ns: NAMESPACE_KEYS.auth,
              })}
            </AlertDescription>
          </Alert>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {t(AUTH_KEYS.forgotPassword.noEmail, { ns: NAMESPACE_KEYS.auth })}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                reset();
                if (onReset) onReset();
              }}
              className="w-full"
            >
              {t(AUTH_KEYS.login.tryAgain, { ns: NAMESPACE_KEYS.auth })}
            </Button>
          </div>
          <div className="text-center">
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {t(AUTH_KEYS.forgotPassword.backToLogin, {
                ns: NAMESPACE_KEYS.auth,
              })}
            </Link>
          </div>
        </SuccessCard>
      </div>
    );
  }

  return (
    <div className="main-card">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {t(AUTH_KEYS.login.confirmationTitle, { ns: NAMESPACE_KEYS.auth })}
          </CardTitle>
          <CardDescription className="text-center">
            {t(AUTH_KEYS.login.confirmationDescription, {
              ns: NAMESPACE_KEYS.auth,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {(localError || error) && (
                <Alert variant="destructive">
                  <AlertDescription>{localError || error}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t(AUTH_KEYS.login.email, { ns: NAMESPACE_KEYS.auth })}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          placeholder={t(AUTH_KEYS.login.emailPlaceholder, {
                            ns: NAMESPACE_KEYS.auth,
                          })}
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoading}
              >
                {isLoading
                  ? t(AUTH_KEYS.login.sendingConfirmation, {
                      ns: NAMESPACE_KEYS.auth,
                    })
                  : t(AUTH_KEYS.login.sendConfirmation, {
                      ns: NAMESPACE_KEYS.auth,
                    })}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center">
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {t(AUTH_KEYS.forgotPassword.backToLogin, {
                ns: NAMESPACE_KEYS.auth,
              })}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
