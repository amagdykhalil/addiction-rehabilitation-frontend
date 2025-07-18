import { PageLoader } from "@/shared/ui/PageLoader";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function PatientsLayout() {
  return (
    <div className="layout">
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
