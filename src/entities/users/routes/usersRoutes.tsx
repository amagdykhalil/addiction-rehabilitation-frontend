import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";
import { USERS_ROUTES } from "./usersRoutesPaths";
import {
  UsersLayout,
  UsersListPage,
  UserPage,
  AddUserPage,
  EditUserPage,
} from "@/Pages/usersPages";

export const usersRoutes = {
  path: USERS_ROUTES.MAIN_PATH,
  element: (
    <ProtectedRoute>
      <UsersLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <UsersListPage /> },
    { path: USERS_ROUTES.DETAIL, element: <UserPage /> },
    { path: USERS_ROUTES.ADD, element: <AddUserPage /> },
    { path: USERS_ROUTES.EDIT, element: <EditUserPage /> },
  ],
};