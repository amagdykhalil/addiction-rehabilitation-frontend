import { Button } from "@/shared/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { AlertTriangle, Home, RefreshCw, ArrowLeft, Bug } from "lucide-react";
import type { ReactNode } from "react";
import { ROUTES } from "../routes";

interface ErrorDisplayProps {
  title: string;
  description: string;
  message: string;
  subMessage: string;
  errorCode?: string;
  error?: Error;
  onReset?: () => void;
  showTryAgain?: boolean;
  footerText?: ReactNode;
}

export function ErrorDisplay({
  title,
  description,
  message,
  subMessage,
  errorCode,
  error,
  onReset,
  showTryAgain = false,
  footerText,
}: ErrorDisplayProps) {
  const handleGoHome = () => {
    window.location.href = ROUTES.HOME;
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const isDevelopment = import.meta.env.DEV;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="text-lg font-medium text-foreground">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">{message}</p>
              <p className="text-sm text-muted-foreground">{subMessage}</p>
            </div>

            {isDevelopment && error && (
              <Card className="bg-muted/50 text-left">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Bug className="h-4 w-4" />
                    Development Error Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
                    {error.message}
                  </pre>
                  {error.stack && (
                    <details className="mt-2">
                      <summary className="text-xs cursor-pointer text-muted-foreground hover:text-foreground">
                        Stack Trace
                      </summary>
                      <pre className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap break-words">
                        {error.stack}
                      </pre>
                    </details>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {showTryAgain && onReset && (
                <Button
                  onClick={onReset}
                  className="w-full cursor-pointer"
                  variant="default"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  className="flex-1 cursor-pointer"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>

                <Button
                  onClick={handleGoHome}
                  variant="outline"
                  className="flex-1 cursor-pointer"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              {footerText || (
                <>
                  <p className="text-xs text-muted-foreground">
                    {errorCode ? `Error Code: ${errorCode}` : "Client Error"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    If this problem persists, please contact support.
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
