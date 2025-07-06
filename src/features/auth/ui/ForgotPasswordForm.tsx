import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryState } from "nuqs";
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
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { AUTH_KEYS } from "../../../entities/auth/lib/translationKeys";
import { getForgotPasswordValidationSchema } from "../../../entities/auth/model/forgotPasswordValidationSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { ROUTES } from "@/shared/routes";
import { SuccessCard } from "@/shared/ui/cards/SuccessCard";

type ForgotPasswordFormData = z.infer<
  ReturnType<typeof getForgotPasswordValidationSchema>
>;

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => void;
  isLoading?: boolean;
  isSubmitted?: boolean;
  onReset?: () => void;
}

export const ForgotPasswordForm = ({
  onSubmit,
  isLoading,
  isSubmitted = false,
  onReset,
}: ForgotPasswordFormProps) => {
  const [error, setError] = useState("");

  // Use nuqs to get email from query string
  const [emailFromQuery, setEmailFromQuery] = useQueryState("email");

  const { t } = useTranslation([
    NAMESPACE_KEYS.common,
    NAMESPACE_KEYS.auth,
    NAMESPACE_KEYS.validator,
  ]);

  const forgotPasswordSchema = getForgotPasswordValidationSchema(t);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: emailFromQuery || "",
    },
  });

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setError("");

    try {
      await onSubmit(data);
      // Update query string with the email
      setEmailFromQuery(data.email);
    } catch {
      setError(t(AUTH_KEYS.errors.failedToSend, { ns: NAMESPACE_KEYS.auth }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="main-card">
        <SuccessCard
          icon={
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          }
          title={t(AUTH_KEYS.forgotPassword.successTitle, {
            ns: NAMESPACE_KEYS.auth,
          })}
          description={
            <>
              {t(AUTH_KEYS.forgotPassword.successDescription, {
                ns: NAMESPACE_KEYS.auth,
              })}{" "}
              <strong>{form.getValues("email")}</strong>
            </>
          }
        >
          <Alert>
            <AlertDescription>
              {t(AUTH_KEYS.forgotPassword.checkSpam, {
                ns: NAMESPACE_KEYS.auth,
              })}
            </AlertDescription>
          </Alert>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {t(AUTH_KEYS.forgotPassword.noEmail, { ns: NAMESPACE_KEYS.auth })}
            </p>
            <Button variant="outline" onClick={onReset} className="w-full">
              {t(AUTH_KEYS.forgotPassword.tryAgain, {
                ns: NAMESPACE_KEYS.auth,
              })}
            </Button>
          </div>
          <div className="text-center">
            <Link
              to="/login"
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
            {t(AUTH_KEYS.forgotPassword.title, { ns: NAMESPACE_KEYS.auth })}
          </CardTitle>
          <CardDescription className="text-center">
            {t(AUTH_KEYS.forgotPassword.description, {
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
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t(AUTH_KEYS.forgotPassword.email, {
                        ns: NAMESPACE_KEYS.auth,
                      })}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          placeholder={t(
                            AUTH_KEYS.forgotPassword.emailPlaceholder,
                            {
                              ns: NAMESPACE_KEYS.auth,
                            }
                          )}
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
                  ? t(AUTH_KEYS.forgotPassword.sending, {
                      ns: NAMESPACE_KEYS.auth,
                    })
                  : t(AUTH_KEYS.forgotPassword.submitButton, {
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
