import { StoreProvider, QueryProvider } from "@/app/providers";
import { ErrorBoundaryProvider } from "./ErrorBoundaryProvider";
import React, { Suspense } from "react";
import SplashScreen from "@/shared/ui/SplashScreen";
import { AuthProvider } from "./AuthProvider";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ToasterProvider } from "./ToasterProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundaryProvider>
      <NuqsAdapter>
        <StoreProvider>
          <Suspense fallback={<SplashScreen />}>
            <AuthProvider>
              <ToasterProvider>
                <QueryProvider>{children}</QueryProvider>
              </ToasterProvider>
            </AuthProvider>
          </Suspense>
        </StoreProvider>
      </NuqsAdapter>
    </ErrorBoundaryProvider>
  );
};

export default AppProviders;
