import { Toaster } from "@/shared/ui/sonner";
import { RouterProvider, StoreProvider, QueryProvider } from "@/app/providers";
import { AppRouter } from "@/app/router";
import { ErrorBoundaryProvider } from "./providers";
import { useAutoRefreshToken } from "@/entities/auth/model/useAutoRefreshToken";

function AppContent() {
  useAutoRefreshToken();
  
  return (
    <>
      <ErrorBoundaryProvider>
        <Toaster />
        <QueryProvider>
          <RouterProvider>
            <AppRouter />
          </RouterProvider>
        </QueryProvider>
      </ErrorBoundaryProvider>
    </>
  );
}

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
