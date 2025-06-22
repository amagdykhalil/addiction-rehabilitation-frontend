import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Lock, EyeOff, Eye, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { AUTH_KEYS } from "../../../entities/auth/lib/translationKeys";
import { getResetPasswordValidationSchema } from "../../../entities/auth/model/resetPasswordValidationSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { ROUTES } from "@/shared/routes";
import { ResetPasswordResultCard } from "@/shared/ui/ResetPasswordResultCard";

type ResetPasswordFormData = z.infer<
  ReturnType<typeof getResetPasswordValidationSchema>
>;

interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormData) => void;
  isLoading?: boolean;
  isSuccess?: boolean | undefined;
  email: string;
}

export const ResetPasswordForm = ({
  onSubmit,
  isLoading,
  isSuccess = undefined,
  email,
}: ResetPasswordFormProps) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { t } = useTranslation([
    NAMESPACE_KEYS.common,
    NAMESPACE_KEYS.auth,
    NAMESPACE_KEYS.validator,
  ]);

  const resetPasswordSchema = getResetPasswordValidationSchema(t);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: ResetPasswordFormData) => {
    await onSubmit(data);
  };

  if (isSuccess != undefined) {
    return <ResetPasswordResultCard isSuccess={isSuccess} />;
  }
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {t(AUTH_KEYS.resetPassword.title, { ns: NAMESPACE_KEYS.auth })}
        </CardTitle>
        <CardDescription className="text-center">
          {t(AUTH_KEYS.resetPassword.description, { ns: NAMESPACE_KEYS.auth })}{" "}
          <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t(AUTH_KEYS.resetPassword.newPassword, {
                      ns: NAMESPACE_KEYS.auth,
                    })}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        type={showNewPassword ? "text" : "password"}
                        placeholder={t(
                          AUTH_KEYS.resetPassword.newPasswordPlaceholder,
                          {
                            ns: NAMESPACE_KEYS.auth,
                          }
                        )}
                        className="pl-10 pr-10"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t(AUTH_KEYS.resetPassword.confirmPassword, {
                      ns: NAMESPACE_KEYS.auth,
                    })}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t(
                          AUTH_KEYS.resetPassword.confirmPasswordPlaceholder,
                          {
                            ns: NAMESPACE_KEYS.auth,
                          }
                        )}
                        className="pl-10 pr-10"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-sm text-muted-foreground">
              <p>
                {t(AUTH_KEYS.resetPassword.requirements, {
                  ns: NAMESPACE_KEYS.auth,
                })}
              </p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>
                  {t(AUTH_KEYS.resetPassword.requirementMinLength, {
                    ns: NAMESPACE_KEYS.auth,
                  })}
                </li>
                <li>
                  {t(AUTH_KEYS.resetPassword.requirementMatch, {
                    ns: NAMESPACE_KEYS.auth,
                  })}
                </li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading
                ? t(AUTH_KEYS.resetPassword.resetting, {
                    ns: NAMESPACE_KEYS.auth,
                  })
                : t(AUTH_KEYS.resetPassword.submitButton, {
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
            {t(AUTH_KEYS.resetPassword.backToLogin, {
              ns: NAMESPACE_KEYS.auth,
            })}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
