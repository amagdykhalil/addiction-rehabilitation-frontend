import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useRequestChangeEmail } from "@/features/auth/hooks";
import { useAuth } from "@/entities/auth/model/useAuth";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";
import { Button } from "@/shared/ui/button";
import { Alert } from "@/shared/ui/alert";
import { Form } from "@/shared/ui/form";
import type { TFunction } from "i18next";
import { FormField } from "@/shared/ui/form/FormField";
import { toast } from "sonner";

const getChangeEmailSchema = (t: TFunction) =>
  z.object({
    newEmail: z
      .string()
      .email({
        message: t(AUTH_KEYS.errors.invalidEmail, { ns: NAMESPACE_KEYS.auth }),
      })
      .min(1, {
        message: t(AUTH_KEYS.errors.emailRequired, { ns: NAMESPACE_KEYS.auth }),
      }),
  });

export const UserChangeEmailForm = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.auth]);
  const { authData } = useAuth();
  const userId = authData?.userId;
  const { requestChangeEmail, isLoading, error } = useRequestChangeEmail();

  const schema = getChangeEmailSchema(t);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { newEmail: "" },
  });

  const onSubmit = (data: { newEmail: string }) => {
    if (!userId) return;
    requestChangeEmail(
      { userId: Number(userId), newEmail: data.newEmail },
      {
        onSuccess: () => {
          toast.success(
            t(AUTH_KEYS.settings?.changeEmailSuccess, {
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
        {t(AUTH_KEYS.settings?.changeEmailTitle, {
          ns: NAMESPACE_KEYS.auth,
        })}
      </h2>
      <p className="text-muted-foreground mb-4">
        {t(AUTH_KEYS.settings?.changeEmailDescription, {
          ns: NAMESPACE_KEYS.auth,
        })}
      </p>
      {error && (
        <Alert variant="destructive" className="mb-4">
          {error}
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label={t(AUTH_KEYS.settings?.newEmailLabel ?? "New Email", {
              ns: NAMESPACE_KEYS.auth,
            })}
            name="newEmail"
            required
            type="email"
            placeholder="example@email.com"
            error={form.formState.errors.newEmail?.message as string}
            inputProps={form.register("newEmail")}
          />
          <div className="button-to-end">
            <Button type="submit" disabled={isLoading} className="min-w-44 ">
              {isLoading
                ? t(AUTH_KEYS.settings?.sending ?? "Sending...", {
                    ns: NAMESPACE_KEYS.auth,
                  })
                : t(AUTH_KEYS.settings?.changeEmailButton ?? "Request Change", {
                    ns: NAMESPACE_KEYS.auth,
                  })}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
