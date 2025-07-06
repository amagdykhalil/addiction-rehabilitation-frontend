import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { authApi } from "@/entities/auth/api";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";

interface IChangeEmailRequest {
  userId: number;
  newEmail: string;
}

export const useRequestChangeEmail = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.auth]);

  const mutation = useMutation({
    mutationFn: (data: IChangeEmailRequest) => authApi.requestChangeEmail(data),
  });

  return {
    requestChangeEmail: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
    error: mutation.error
      ? t(AUTH_KEYS.errors.failedToChangeEmail, {
          ns: NAMESPACE_KEYS.auth,
        })
      : null,
  };
};
