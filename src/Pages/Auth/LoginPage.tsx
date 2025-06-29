import React from "react";
import { LoginForm } from "@/features/auth/ui/LoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin";

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useLogin();

  return <LoginForm onSubmit={login} isLoading={isLoading} />;
};
