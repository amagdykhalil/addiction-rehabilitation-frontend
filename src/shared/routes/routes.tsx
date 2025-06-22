import { userRoutes } from "@/entities/user/routes";
import { ROUTES } from "./routesPaths";
import { HomePage } from "@/Pages/HomePage";
import { LoginPage } from "@/Pages/LoginPage";
import { ForgotPasswordPage } from "@/Pages/ForgotPasswordPage";
import { ResetPasswordPage } from "@/Pages/ResetPasswordPage";
import { InternalServerErrorPage } from "@/Pages/InternalServerErrorPage";

export const routes = [
  // global routes
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
  { path: ROUTES.SERVERERROR, element: <InternalServerErrorPage /> },
  userRoutes,
];
