export type FilterType = "input" | "combobox" | "number" | "custom";

export interface FilterConfig<T = string | number> {
  type: FilterType;
  name: string;
  label: string;
  value: T;
  onChange: (value: T) => void;
  options?: { label: string; value: string | number | undefined }[];
  placeholder?: string;
  discardedValues?: (string | number | undefined)[];
  // For custom filter type
  component?: React.ReactNode;
  // For custom active value display
  getActiveValue?: (filter: FilterConfig<T>) => React.ReactNode;
}

export interface SortConfig {
  sortBy: string;
  sortOptions: { label: string; value: string }[];
  onSortByChange: (value: string) => void;
  sortOrder: string;
  onSortOrderChange: (value: string) => void;
}

export interface SearchQueryConfig {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

export interface TableFiltersProps {
  filters: FilterConfig[];
  sortConfig: SortConfig;
  searchQueryConfig: SearchQueryConfig;
  resetPageNumber: () => void;
  searchPlaceholder: string;
  onClear: () => void;
}
