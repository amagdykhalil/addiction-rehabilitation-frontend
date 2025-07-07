import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { authApi } from "@/entities/auth/api";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { AUTH_KEYS } from "@/entities/auth/lib/translationKeys";

interface IChangePasswordRequest {
  userId: number;
  oldPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.auth]);

  const mutation = useMutation({
    mutationFn: (data: IChangePasswordRequest) => authApi.changePassword(data),
  });

  return {
    changePassword: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
    error: mutation.error
      ? t(AUTH_KEYS.errors.failedToChangePassword, {
          ns: NAMESPACE_KEYS.auth,
        })
      : null,
  };
};
