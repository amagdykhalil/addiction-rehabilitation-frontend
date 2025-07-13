import { PATIENTS_ROUTES } from "@/entities/patients/routes";
import { ROLES_ROUTES } from "@/entities/roles/routes";
import { USER_ROUTES } from "@/entities/user/routes";
import { USERS_ROUTES } from "@/entities/users/routes";

export const ROUTES = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  RESEND_CONFIRMATION_EMAIL: "/resend-confirmation-email",
  SERVERERROR: "/500",
  NOT_FOUND: "*",

  // User routes
  USER: USER_ROUTES,
  PATIENTS: PATIENTS_ROUTES,
  USERS: USERS_ROUTES,
  ROLES: ROLES_ROUTES,
} as const;
