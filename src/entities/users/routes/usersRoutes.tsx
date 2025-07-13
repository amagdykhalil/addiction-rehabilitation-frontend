import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";
import { USERS_ROUTES } from "./usersRoutesPaths";
import { lazy } from "react";
import UsersLayout from "@/Pages/usersPages/UsersLayout";

// Lazy load page components
const UsersListPage = lazy(() =>
  import("@/Pages/usersPages/UsersListPage").then((module) => ({
    default: module.UsersListPage,
  }))
);
const UserDetailPage = lazy(() =>
  import("@/Pages/usersPages/UserDetailPage").then((module) => ({
    default: module.default,
  }))
);
const AddUserPage = lazy(() =>
  import("@/Pages/usersPages/AddUserPage").then((module) => ({
    default: module.default,
  }))
);
const EditUserPage = lazy(() =>
  import("@/Pages/usersPages/EditUserPage").then((module) => ({
    default: module.default,
  }))
);

export const usersRoutes = (
  <Route
    path={USERS_ROUTES.MAIN_PATH}
    element={
      <ProtectedRoute>
        <UsersLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<UsersListPage />} />
    <Route path={USERS_ROUTES.DETAIL} element={<UserDetailPage />} />
    <Route path={USERS_ROUTES.ADD} element={<AddUserPage />} />
    <Route path={USERS_ROUTES.EDIT} element={<EditUserPage />} />
  </Route>
);
