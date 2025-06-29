import React from "react";

interface FormErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

export const FormErrorMessage = ({
  children,
  className = "",
}: FormErrorMessageProps) => (
  <div className={`text-sm text-red-600 ${className}`}>{children}</div>
);

export default FormErrorMessage;
