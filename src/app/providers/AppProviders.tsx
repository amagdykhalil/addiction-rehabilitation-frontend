import { RouterProvider, StoreProvider, QueryProvider } from "@/app/providers";
import { ErrorBoundaryProvider } from "./ErrorBoundaryProvider";
import React, { Suspense } from "react";
import SplashScreen from "@/shared/ui/SplashScreen";
import { AuthProvider } from "./AuthProvider";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ToasterProvider } from "./ToasterProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      <StoreProvider>
        <ErrorBoundaryProvider>
          <Suspense fallback={<SplashScreen />}>
            <AuthProvider>
              <ToasterProvider>
                <QueryProvider>
                  <RouterProvider>{children}</RouterProvider>
                </QueryProvider>
              </ToasterProvider>
            </AuthProvider>
          </Suspense>
        </ErrorBoundaryProvider>
      </StoreProvider>
    </NuqsAdapter>
  );
};

export default AppProviders;
