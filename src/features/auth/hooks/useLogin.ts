import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/entities/auth/api";
import type { ILoginRequest } from "@/entities/auth/model/types";
import { ROUTES } from "@/shared/routes";
import { useAuth } from "@/entities/auth/model/useAuth";
import { postTokenGeneratedBroadcast } from "@/shared/lib/broadcasts/authBroadcasts";
import type { ApiResponse } from "@/shared/types";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setCredentials } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: ILoginRequest) => {
      const response = await authApi.login(data);
      return response;
    },

    onSuccess: (response: ApiResponse) => {
      if (response.isSuccess && response.result) {
        setCredentials(response.result);
        postTokenGeneratedBroadcast(response.result);
        navigate(ROUTES.HOME);
      }
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
