"use client";

import { ErrorDisplay } from "@/shared/ui";

export default function InternalServerError() {
  return (
    <ErrorDisplay
      title="500"
      description="Internal Server Error"
      message="We're experiencing some technical difficulties on our end. Our team has been notified and is working to resolve the issue."
      subMessage="Please try again in a few moments."
      errorCode="500"
    />
  );
}
