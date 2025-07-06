import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { authApi } from "@/entities/auth/api";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";

export const useResendConfirmationEmail = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.auth]);

  const mutation = useMutation({
    mutationFn: (data: { email: string }) =>
      authApi.resendConfirmationEmail(data.email),
  });

  return {
    resendConfirmationEmail: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
    error: mutation.error
      ? t(AUTH_KEYS.errors.failedToSendConfirmation, {
          ns: NAMESPACE_KEYS.auth,
        })
      : null,
  };
};
