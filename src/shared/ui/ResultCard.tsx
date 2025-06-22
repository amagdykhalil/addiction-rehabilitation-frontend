import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import React from "react";

interface ResultCardProps {
  variant: "success" | "error";
  title: React.ReactNode;
  description: React.ReactNode;
  buttonText: React.ReactNode;
  buttonLink: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  variant,
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  const icon =
    variant === "success" ? (
      <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-6 h-6 text-green-600" />
      </div>
    ) : (
      <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <XCircle className="w-6 h-6 text-red-600" />
      </div>
    );

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        {icon}
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button asChild className="w-full">
          <Link to={buttonLink}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
