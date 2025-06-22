import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/entities/auth/api";
import { ROUTES } from "@/shared/routes";
import { useAuth } from "@/entities/auth/model/useAuth";
import { postLogoutBroadcast } from "@/shared/lib/broadcasts/authBroadcasts";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await authApi.logout();
      return response;
    },
    onSuccess: () => {
      logout();
      postLogoutBroadcast();
      queryClient.clear();
      navigate(ROUTES.LOGIN);
    },
  });

  return {
    logout: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
