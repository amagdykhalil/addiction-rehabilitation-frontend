import { userRoutes } from "@/entities/user/routes";
import { ROUTES } from "./routesPaths";
import { HomePage } from "@/Pages/HomePage";
import { LoginPage } from "@/Pages/Auth/LoginPage";
import { ForgotPasswordPage } from "@/Pages/Auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/Pages/Auth/ResetPasswordPage";
import { InternalServerErrorPage } from "@/Pages/InternalServerErrorPage";
import { patientsRoutes } from "@/entities/patients/routes";
import { usersRoutes } from "@/entities/users/routes/usersRoutes";
import { ResendConfirmationEmailPage } from "@/Pages/Auth/ResendConfirmationEmailPage";
import { rolesRoutes } from "@/entities/roles/routes/rolesRoutes";

export const routes = [
  // global routes
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
  { path: ROUTES.SERVERERROR, element: <InternalServerErrorPage /> },
  {
    path: ROUTES.RESEND_CONFIRMATION_EMAIL,
    element: <ResendConfirmationEmailPage />,
  },
  userRoutes,
  usersRoutes,
  patientsRoutes,
  rolesRoutes,
];
