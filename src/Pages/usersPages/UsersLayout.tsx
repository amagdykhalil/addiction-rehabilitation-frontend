import { PageLoader } from "@/shared/ui/PageLoader";

import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const UsersLayout = () => {
  return (
    <div className="layout">
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default UsersLayout;
