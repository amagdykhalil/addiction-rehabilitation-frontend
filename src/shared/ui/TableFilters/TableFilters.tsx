import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Button } from "@/shared/ui/button";
import { ChevronDown, ChevronUp, Filter, Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { FilterCategory } from "./FilterCategory";
import { FilterSelect } from "./FilterSelect";
import { FilterBadges } from "./FilterBadges";
import type { TableFiltersProps } from "./types";
import { SortDirection } from "@/entities/patients/model";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys/namespacesKeys";
import { COMMON_KEYS } from "@/shared/i18n/keys/commonKeys";

export const TableFilters: React.FC<TableFiltersProps> = ({
  filters,
  sortConfig,
  searchQueryConfig,
  resetPageNumber,
  searchPlaceholder,
  onClear,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const { t } = useTranslation([NAMESPACE_KEYS.common]);

  return (
    <Card>
      <Collapsible open={collapsed} onOpenChange={setCollapsed}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5" />
              {t(COMMON_KEYS.filters.title, { ns: NAMESPACE_KEYS.common })}
            </CardTitle>
            <div className="flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer"
                  onClick={() => setCollapsed(!collapsed)}
                  aria-label={
                    collapsed
                      ? t(COMMON_KEYS.filters.expandFilters, {
                          ns: NAMESPACE_KEYS.common,
                        })
                      : t(COMMON_KEYS.filters.collapseFilters, {
                          ns: NAMESPACE_KEYS.common,
                        })
                  }
                >
                  {collapsed ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronUp className="h-5 w-5" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={onClear}
              >
                {t(COMMON_KEYS.filters.clearAll, { ns: NAMESPACE_KEYS.common })}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent className="transition-all duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
          <CardContent className="space-y-6 py-1">
            {/* Quick Search Bar + Sort Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Quick Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={
                    searchPlaceholder ||
                    t(COMMON_KEYS.filters.searchPlaceholder, {
                      ns: NAMESPACE_KEYS.common,
                    })
                  }
                  value={searchQueryConfig.searchQuery}
                  onChange={(e) => {
                    resetPageNumber();
                    searchQueryConfig.onSearchQueryChange(e.target.value);
                  }}
                  className="pl-10 h-11 text-base min-w-52"
                />
              </div>
              <div className="flex gap-2 flex-wrap mt-2">
                {/* Sort By */}
                <FilterSelect
                  value={sortConfig.sortBy}
                  onChange={sortConfig.onSortByChange}
                  options={sortConfig.sortOptions}
                  placeholder={t(COMMON_KEYS.filters.sortByPlaceholder, {
                    ns: NAMESPACE_KEYS.common,
                  })}
                  label={t(COMMON_KEYS.filters.sortBy, {
                    ns: NAMESPACE_KEYS.common,
                  })}
                  className="!h-11 flex-1 min-w-52"
                />
                {/* Sort Order */}
                <FilterSelect
                  value={sortConfig.sortOrder}
                  onChange={(value) =>
                    sortConfig.onSortOrderChange(value.toString())
                  }
                  options={[
                    {
                      label: t(COMMON_KEYS.filters.ascending, {
                        ns: NAMESPACE_KEYS.common,
                      }),
                      value: SortDirection.Asc,
                    },
                    {
                      label: t(COMMON_KEYS.filters.descending, {
                        ns: NAMESPACE_KEYS.common,
                      }),
                      value: SortDirection.Desc,
                    },
                  ]}
                  placeholder={t(COMMON_KEYS.filters.orderPlaceholder, {
                    ns: NAMESPACE_KEYS.common,
                  })}
                  label={t(COMMON_KEYS.filters.order, {
                    ns: NAMESPACE_KEYS.common,
                  })}
                  className="!h-11 flex-1 min-w-52"
                />
              </div>
            </div>

            {/* Filter Categories */}
            <div className="flex flex-row lg:items-center gap-4 flex-wrap">
              {filters.map((filter) => (
                <div key={filter.name} className="min-w-52">
                  <FilterCategory
                    filter={filter}
                    resetPageNumber={resetPageNumber}
                  />
                </div>
              ))}
            </div>
            {/* Active Filters */}
            <FilterBadges
              filters={filters}
              searchQueryConfig={searchQueryConfig}
            />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
