import type { FallbackProps } from "react-error-boundary";
import { ErrorDisplay } from "@/shared/ui";

export function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <ErrorDisplay
      title="Something went wrong"
      description="Application Error"
      message="We encountered an unexpected error. Our team has been notified and is working to resolve the issue."
      subMessage="Please try refreshing the page or go back."
      error={error}
      onReset={resetErrorBoundary}
      showTryAgain={true}
    />
  );
}
