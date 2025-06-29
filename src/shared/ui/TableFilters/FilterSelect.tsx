import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface FilterSelectProps {
  value: string | number;
  onChange: (value: string) => void;
  options: { label: string; value: string | number }[];
  placeholder?: string;
  label: string;
  className?: string;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  className,
}) => {
  return (
    <Select value={String(value)} onValueChange={onChange}>
      <SelectTrigger
        className={`!h-11 flex-1 min-w-52 cursor-pointer ${className}`}
      >
        <span className="text-muted-foreground text-sm font-medium mr-1">
          {label || placeholder}
        </span>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={String(opt.value)}
            className="cursor-pointer"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
