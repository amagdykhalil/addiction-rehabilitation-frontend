import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";
import { UsersLayout, UsersListPage, UserDetailPage } from "@/Pages/usersPages";
import { USERS_ROUTES } from "./usersRoutesPaths";
import AddUserPage from "@/Pages/usersPages/AddUserPage";
import EditUserPage from "@/Pages/usersPages/EditUserPage";

export const usersRoutes = {
  path: USERS_ROUTES.MAIN_PATH,
  element: (
    <ProtectedRoute>
      <UsersLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <UsersListPage /> },
    { path: USERS_ROUTES.DETAIL, element: <UserDetailPage /> },
    { path: USERS_ROUTES.ADD, element: <AddUserPage /> },
    { path: USERS_ROUTES.EDIT, element: <EditUserPage /> },
  ],
};
