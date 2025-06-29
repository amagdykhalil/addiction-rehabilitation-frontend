import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/routes/routesPaths";

interface ErrorCardProps {
  title: string;
  message: string;
  backToPath?: string;
  backToText?: string;
}

export function ErrorCard({
  title,
  message,
  backToPath = ROUTES.HOME,
  backToText,
}: ErrorCardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to={backToPath}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {backToText}
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">{message}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
