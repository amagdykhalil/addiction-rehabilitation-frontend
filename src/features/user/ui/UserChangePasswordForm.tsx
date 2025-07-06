import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useChangePassword } from "@/features/auth/hooks";
import { useAuth } from "@/entities/auth/model/useAuth";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";
import { FormField } from "@/shared/ui/form/FormField";
import { getChangePasswordSchema } from "@/features/patients/models/types";
import { toast } from "sonner";

export const UserChangePasswordForm = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.auth]);
  const { authData } = useAuth();
  const userId = authData?.userId;
  const { changePassword, isLoading } = useChangePassword();

  const schema = getChangePasswordSchema(t);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (!userId) return;

    changePassword(
      {
        userId: Number(userId),
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          toast.success(
            t(AUTH_KEYS.settings?.changePasswordSuccess, {
              ns: NAMESPACE_KEYS.auth,
            }),
          );
          form.reset();
        },
      },
    );
  };

  return (
    <div className="p-6 border rounded-lg bg-background">
      <h2 className="text-lg font-semibold mb-2">
        {t(AUTH_KEYS.settings?.changePasswordTitle, {
          ns: NAMESPACE_KEYS.auth,
        })}
      </h2>
      <p className="text-muted-foreground mb-4">
        {t(AUTH_KEYS.settings?.changePasswordDescription, {
          ns: NAMESPACE_KEYS.auth,
        })}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label={t(
              AUTH_KEYS.settings?.oldPasswordLabel ?? "Current Password",
              {
                ns: NAMESPACE_KEYS.auth,
              },
            )}
            name="oldPassword"
            required
            type="password"
            error={form.formState.errors.oldPassword?.message as string}
            inputProps={form.register("oldPassword")}
          />
          <FormField
            label={t(AUTH_KEYS.resetPassword.newPassword, {
              ns: NAMESPACE_KEYS.auth,
            })}
            name="newPassword"
            required
            type="password"
            error={form.formState.errors.newPassword?.message as string}
            inputProps={form.register("newPassword")}
          />
          <FormField
            label={t(AUTH_KEYS.resetPassword.confirmPassword, {
              ns: NAMESPACE_KEYS.auth,
            })}
            name="confirmPassword"
            required
            type="password"
            error={form.formState.errors.confirmPassword?.message as string}
            inputProps={form.register("confirmPassword")}
          />
          <div className="button-to-end">
            <Button type="submit" disabled={isLoading} className="min-w-44">
              {isLoading
                ? t(AUTH_KEYS.settings?.saving, {
                    ns: NAMESPACE_KEYS.auth,
                  })
                : t(AUTH_KEYS.settings?.changePasswordButton, {
                    ns: NAMESPACE_KEYS.auth,
                  })}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
