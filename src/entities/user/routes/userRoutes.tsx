import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";
import {
  UserSettingsPage,
  UserNotificationsPage,
} from "@/Pages/userPages";
import {
  UsersListPage,
} from "@/Pages/usersPages";
import { UserLayout } from "@/Pages/userPages/UserLayout";
import { USER_ROUTES } from "./userRoutePaths";

export const userRoutes = {
  path: USER_ROUTES.MAIN_PATH,
  element: (
    <ProtectedRoute>
      <UserLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: USER_ROUTES.PROFILE, element: <UsersListPage /> },
    { path: USER_ROUTES.SETTINGS, element: <UserSettingsPage /> },
    { path: USER_ROUTES.NOTIFICATIONS, element: <UserNotificationsPage /> },
  ],
};
