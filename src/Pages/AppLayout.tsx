import { AppSidebar } from "@/widgets/sidebar";
import { useCurrentLanguage } from "@/shared/hooks";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { Header } from "@/widgets/header/Header";
import { useAuth } from "@/entities/auth/model/useAuth";

import { Outlet, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { PageLoader } from "@/shared/ui/PageLoader";
import { setNavigateFunction } from "@/shared/lib/navigationService";

export const AppLayout = () => {
  const { dir } = useCurrentLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setNavigateFunction(navigate);
  }, [navigate]);

  return (
    <SidebarProvider className="layout" autoFocus={false} dir={dir}>
      <AppSidebar />
      <SidebarInset className={`${isAuthenticated && "px-6"} flex flex-col`}>
        <Header />
        {isAuthenticated ? (
          <main className="py-6 flex-1" dir={dir}>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </main>
        ) : (
          <main className=" bg-gray-50 py-6 flex-1" dir={dir}>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </main>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};
