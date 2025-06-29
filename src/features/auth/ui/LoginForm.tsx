import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { AUTH_KEYS } from "../../../entities/auth/lib/translationKeys";
import { getLoginValidationSchema } from "../../../entities/auth/model/loginValidationSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/routes";

type LoginFormData = z.infer<ReturnType<typeof getLoginValidationSchema>>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation([
    NAMESPACE_KEYS.common,
    NAMESPACE_KEYS.auth,
    NAMESPACE_KEYS.validator,
  ]);

  const loginSchema = getLoginValidationSchema(t);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    await onSubmit(data);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {t(AUTH_KEYS.login.title, { ns: NAMESPACE_KEYS.auth })}
          </CardTitle>
          <CardDescription className="text-center">
            {t(AUTH_KEYS.login.description, { ns: NAMESPACE_KEYS.auth })}
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t(AUTH_KEYS.login.password, { ns: NAMESPACE_KEYS.auth })}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder={t(AUTH_KEYS.login.passwordPlaceholder, {
                            ns: NAMESPACE_KEYS.auth,
                          })}
                          className="pl-10 pr-10"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          disabled={isLoading}
                        >
                          {showPassword ? (
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

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoading}
              >
                {isLoading
                  ? t(AUTH_KEYS.login.signingIn, { ns: NAMESPACE_KEYS.auth })
                  : t(AUTH_KEYS.login.submitButton, {
                      ns: NAMESPACE_KEYS.auth,
                    })}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t(AUTH_KEYS.login.forgotPassword, { ns: NAMESPACE_KEYS.auth })}{" "}
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="font-medium text-primary hover:underline"
              >
                {t(AUTH_KEYS.login.resetPassword, { ns: NAMESPACE_KEYS.auth })}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
