import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "@/widgets/ui";
import type { ReactNode } from "react";

export const ErrorBoundaryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
};
