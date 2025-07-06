import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";
import { ProfilePage, UserSettingsPage } from "@/Pages/userPages";
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
    { path: USER_ROUTES.PROFILE, element: <ProfilePage /> },
    { path: USER_ROUTES.SETTINGS, element: <UserSettingsPage /> },
  ],
};
