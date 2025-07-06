import React from "react";
import type { FilterConfig, SearchQueryConfig } from "./types";
import { isNotNil } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { COMMON_KEYS } from "@/shared/i18n/keys";

interface FilterBadgesProps {
  filters: FilterConfig[];
  searchQueryConfig: SearchQueryConfig;
}

export const FilterBadges: React.FC<FilterBadgesProps> = ({
  filters,
  searchQueryConfig,
}) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common]);

  const badges: React.ReactNode[] = [];
  if (searchQueryConfig.searchQuery) {
    badges.push(
      <span
        key="searchQuery"
        className="gap-1 inline-flex items-center bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs"
      >
        Search: {searchQueryConfig.searchQuery}
        <button
          onClick={() => searchQueryConfig.onSearchQueryChange("")}
          className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
        >
          ×
        </button>
      </span>,
    );
  }
  filters.forEach((filter) => {
    const isDiscarded = filter.discardedValues?.includes(filter.value);
    if (isNotNil(filter.value) && !isDiscarded) {
      let valueLabel: React.ReactNode = String(filter.value);

      // Use custom getActiveValue method if provided
      if (filter.getActiveValue) {
        valueLabel = filter.getActiveValue(filter);
        // Skip adding badge if getActiveValue returns falsy value
        if (!valueLabel) return;
      } else if (filter.type === "combobox" && filter.options) {
        const found = filter.options.find(
          (opt) => String(opt.value) === String(filter.value),
        );
        if (found) valueLabel = found.label;
      }

      badges.push(
        <span
          key={filter.name}
          className="gap-1 inline-flex items-center bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs"
        >
          {filter.label}: {valueLabel}
          <button
            onClick={() => filter.onChange("")}
            className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
          >
            ×
          </button>
        </span>,
      );
    }
  });
  if (badges.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 pt-2 border-t">
      <span className="text-sm text-muted-foreground">
        {t(COMMON_KEYS.filters.activeFilters, { ns: NAMESPACE_KEYS.common })}
      </span>
      {badges}
    </div>
  );
};
