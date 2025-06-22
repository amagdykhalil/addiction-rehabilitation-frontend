import { useAuthInitializer } from "@/features/auth/hooks/useAuthInitializer";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useAuthInitializer();
  return <>{children}</>;
};
