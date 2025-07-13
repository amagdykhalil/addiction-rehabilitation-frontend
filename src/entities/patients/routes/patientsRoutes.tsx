import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";
import { PATIENTS_ROUTES } from "./patientsRoutesPaths";
import { lazy } from "react";
import PatientsLayout from "@/Pages/patientsPages/PatientsLayout";

// Lazy load page components
const PatientsListPage = lazy(
  () => import("@/Pages/patientsPages/PatientsListPage")
);
const PatientPage = lazy(() => import("@/Pages/patientsPages/PatientPage"));
const AddPatientPage = lazy(
  () => import("@/Pages/patientsPages/AddPatientPage")
);
const EditPatientPage = lazy(
  () => import("@/Pages/patientsPages/EditPatientPage")
);

export const patientsRoutes = (
  <Route
    path={PATIENTS_ROUTES.MAIN_PATH}
    element={
      <ProtectedRoute>
        <PatientsLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<PatientsListPage />} />
    <Route path={PATIENTS_ROUTES.DETAIL} element={<PatientPage />} />
    <Route path={PATIENTS_ROUTES.ADD} element={<AddPatientPage />} />
    <Route path={PATIENTS_ROUTES.EDIT} element={<EditPatientPage />} />
  </Route>
);
