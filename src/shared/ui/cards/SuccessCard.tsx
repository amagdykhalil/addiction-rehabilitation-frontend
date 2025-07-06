import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../card";

interface SuccessCardProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({
  icon,
  title,
  description,
  children,
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        {icon}
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};
