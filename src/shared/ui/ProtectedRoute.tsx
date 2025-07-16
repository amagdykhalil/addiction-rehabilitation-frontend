import { useAuth } from "@/entities/auth/model/useAuth";
import type { ReactNode } from "react";
import { ROUTES } from "../routes";
import { useNavigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate(ROUTES.LOGIN);
    return null;
  } else return <>{children}</>;
};
