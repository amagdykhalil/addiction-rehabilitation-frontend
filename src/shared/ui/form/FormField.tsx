import React from "react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { cn } from "@/shared/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  error?: string;
  className?: string;
  inputProps?: React.ComponentProps<typeof Input>;
}

export function FormField({
  label,
  name,
  required = false,
  placeholder,
  type = "text",
  error,
  className,
  inputProps,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={cn(error && "border-destructive")}
        {...inputProps}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
