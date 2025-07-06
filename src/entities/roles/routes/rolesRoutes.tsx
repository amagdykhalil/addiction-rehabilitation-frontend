import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";
import { RoleListPage } from "@/Pages/rolesPages";
import { ROLES_ROUTES } from "./rolesRoutesPaths";

export const rolesRoutes = {
  path: ROLES_ROUTES.MAIN_PATH,
  element: (
    <ProtectedRoute>
      <RoleListPage />
    </ProtectedRoute>
  ),
  children: [],
};
