import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";
import { PATIENTS_ROUTES } from "./patientsRoutesPaths";
import {
  PatientsLayout,
  PatientsListPage,
  PatientPage,
  AddPatientPage,
  EditPatientPage,
} from "@/Pages/patientsPages";

export const patientsRoutes = {
  path: PATIENTS_ROUTES.MAIN_PATH,
  element: (
    <ProtectedRoute>
      <PatientsLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <PatientsListPage /> },
    { path: PATIENTS_ROUTES.DETAIL, element: <PatientPage /> },
    { path: PATIENTS_ROUTES.ADD, element: <AddPatientPage /> },
    { path: PATIENTS_ROUTES.EDIT, element: <EditPatientPage /> },
  ],
};
