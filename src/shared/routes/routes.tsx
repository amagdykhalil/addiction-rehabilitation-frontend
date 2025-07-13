import { Route } from "react-router-dom";
import { AppLayout } from "@/Pages/AppLayout";
import { ROUTES } from "./routesPaths";
import { lazy } from "react";
import { UserRoutes } from "@/entities/user/routes";
import { usersRoutes } from "@/entities/users/routes";
import { patientsRoutes } from "@/entities/patients/routes";
import { rolesRoutes } from "@/entities/roles/routes";

// Lazy load page components
const HomePage = lazy(() =>
  import("@/Pages/HomePage").then((module) => ({ default: module.HomePage }))
);
const LoginPage = lazy(() =>
  import("@/Pages/Auth/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);
const ForgotPasswordPage = lazy(() =>
  import("@/Pages/Auth/ForgotPasswordPage").then((module) => ({
    default: module.ForgotPasswordPage,
  }))
);
const ResetPasswordPage = lazy(() =>
  import("@/Pages/Auth/ResetPasswordPage").then((module) => ({
    default: module.ResetPasswordPage,
  }))
);
const InternalServerErrorPage = lazy(() =>
  import("@/Pages/InternalServerErrorPage").then((module) => ({
    default: module.InternalServerErrorPage,
  }))
);
const ResendConfirmationEmailPage = lazy(() =>
  import("@/Pages/Auth/ResendConfirmationEmailPage").then((module) => ({
    default: module.ResendConfirmationEmailPage,
  }))
);
const PageNotFound = lazy(() =>
  import("@/Pages/PageNotFound").then((module) => ({
    default: module.PageNotFound,
  }))
);

export const routesElement = (
  <>
    <Route path="/" element={<AppLayout />}>
      {/* Auth routes*/}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
      <Route
        path={ROUTES.RESEND_CONFIRMATION_EMAIL}
        element={<ResendConfirmationEmailPage />}
      />

      {/* Main app routes (inside layout) */}
      <Route index element={<HomePage />} />
      {/* Use route objects directly */}
      {UserRoutes}
      {usersRoutes}
      {patientsRoutes}
      {rolesRoutes}
    </Route>
    <Route path={ROUTES.SERVERERROR} element={<InternalServerErrorPage />} />
    <Route path={ROUTES.NOT_FOUND} element={<PageNotFound />} />
  </>
);
