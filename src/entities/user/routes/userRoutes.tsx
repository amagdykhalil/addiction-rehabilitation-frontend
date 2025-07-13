import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";
import { USER_ROUTES } from "./userRoutePaths";
import { lazy } from "react";
import { UserLayout } from "@/Pages/userPages/UserLayout";

// Lazy load page components
const ProfilePage = lazy(() =>
  import("@/Pages/userPages/ProfilePage").then((module) => ({
    default: module.ProfilePage,
  }))
);
const UserSettingsPage = lazy(() =>
  import("@/Pages/userPages/UserSettingsPage").then((module) => ({
    default: module.UserSettingsPage,
  }))
);

export const UserRoutes = (
  <Route
    path={USER_ROUTES.MAIN_PATH}
    element={
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    }
  >
    <Route path={USER_ROUTES.PROFILE} element={<ProfilePage />} />
    <Route path={USER_ROUTES.SETTINGS} element={<UserSettingsPage />} />
  </Route>
);

export const UserRoutesComponent = () => <>UserRoutes</>;
