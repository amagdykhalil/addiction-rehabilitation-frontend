import React from "react";
import { Input } from "@/shared/ui/input";
import type { FilterConfig } from "./types";
import { FilterSelect } from "./FilterSelect";

export const FilterCategory: React.FC<{
  filter: FilterConfig;
  resetPageNumber: () => void;
}> = ({ filter, resetPageNumber }) => {
  if (filter.type === "custom" && filter.component) {
    return (
      <div className="space-y-3 w-full">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {filter.label}
          </label>
        </div>
        {filter.component}
      </div>
    );
  }
  if (filter.type === "combobox" && filter.options) {
    return (
      <div className="space-y-3 w-full">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {filter.label}
          </label>
        </div>
        <div className="space-y-2 w-full">
          <FilterSelect
            value={filter.value as string | number}
            onChange={(value) => {
              resetPageNumber();
              filter.onChange(value);
            }}
            options={
              filter.options as { label: string; value: string | number }[]
            }
            placeholder={filter.placeholder || filter.label}
            label={filter.label}
          />
        </div>
      </div>
    );
  }
  if (filter.type === "input") {
    return (
      <div className="space-y-3 w-full">
        <label className="text-sm font-medium text-muted-foreground">
          {filter.label}
        </label>
        <Input
          value={String(filter.value)}
          onChange={(e) => {
            resetPageNumber();
            filter.onChange(e.target.value);
          }}
          placeholder={filter.placeholder || filter.label}
          className="h-11"
        />
      </div>
    );
  }
  if (filter.type === "number") {
    return (
      <div className="space-y-3 w-full">
        <label className="text-sm font-medium text-muted-foreground">
          {filter.label}
        </label>
        <Input
          type="number"
          value={String(filter.value)}
          onChange={(e) => {
            resetPageNumber();
            filter.onChange(e.target.value);
          }}
          placeholder={filter.placeholder || filter.label}
          className="h-11"
        />
      </div>
    );
  }
  return null;
};
