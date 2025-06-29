import { PATIENTS_ROUTES } from "@/entities/patients/routes";
import { USER_ROUTES } from "@/entities/user/routes";
import { USERS_ROUTES } from "@/entities/users/routes";

export const ROUTES = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  SERVERERROR: "/500",

  // User routes
  USER: USER_ROUTES,
  PATIENT: PATIENTS_ROUTES,
  USERS: USERS_ROUTES,
} as const;