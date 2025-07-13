import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";
import { ROLES_ROUTES } from "./rolesRoutesPaths";
import { lazy, Suspense } from "react";
import { PageLoader } from "@/shared/ui/PageLoader";
import { RolesLayout } from "@/Pages/rolesPages/RolesLayout";

// Lazy load page components
const RoleListPage = lazy(() =>
  import("@/Pages/rolesPages/RoleListPage").then((module) => ({
    default: module.RoleListPage,
  }))
);

export const rolesRoutes = (
  <>
    <Route
      path={ROLES_ROUTES.MAIN_PATH}
      element={
        <ProtectedRoute>
          <RolesLayout />
        </ProtectedRoute>
      }
    >
      <Route
        index
        element={
          <Suspense fallback={<PageLoader />}>
            <RoleListPage />
          </Suspense>
        }
      />
    </Route>
  </>
);
