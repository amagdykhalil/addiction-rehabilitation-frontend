import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { authApi } from "@/entities/auth/api";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";

export const useForgotPassword = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.auth]);

  const mutation = useMutation({
    mutationFn: (data: { email: string }) => authApi.forgotPassword(data),
  });

  return {
    forgotPassword: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
    error: mutation.error
      ? t(AUTH_KEYS.errors.failedToSend, {
          ns: NAMESPACE_KEYS.auth,
        })
      : null,
  };
};
