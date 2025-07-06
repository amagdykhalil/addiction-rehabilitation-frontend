import { ForgotPasswordForm } from "@/features/auth/ui/ForgotPasswordForm";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

export const ForgotPasswordPage = () => {
  const { forgotPassword, isLoading, isSuccess, reset } = useForgotPassword();

  const handleSubmit = async (data: { email: string }) => {
    await forgotPassword(data);
  };

  return (
    <ForgotPasswordForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isSubmitted={isSuccess}
      onReset={reset}
    />
  );
};
