import { ForgotPasswordForm } from "@/features/auth/ui";
import { useForgotPassword } from "@/features/auth/hooks";

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
