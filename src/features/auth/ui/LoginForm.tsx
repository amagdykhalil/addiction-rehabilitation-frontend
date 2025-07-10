import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { COMMON_KEYS, NAMESPACE_KEYS } from "@/shared/i18n/keys";
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

type LoginFormData = z.infer<ReturnType<typeof getLoginValidationSchema>>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  children?: React.ReactNode;
}

export const LoginForm = ({
  onSubmit,
  isLoading,
  children,
}: LoginFormProps) => {
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
    <div className="main-card">
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
                      {t(COMMON_KEYS.fields.email, {
                        ns: NAMESPACE_KEYS.common,
                      })}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          placeholder={t(COMMON_KEYS.fields.emailPlaceholder, {
                            ns: NAMESPACE_KEYS.common,
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
                      {t(COMMON_KEYS.fields.password, {
                        ns: NAMESPACE_KEYS.common,
                      })}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder={t(
                            COMMON_KEYS.fields.passwordPlaceholder,
                            {
                              ns: NAMESPACE_KEYS.common,
                            }
                          )}
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

          {children}
        </CardContent>
      </Card>
    </div>
  );
};
