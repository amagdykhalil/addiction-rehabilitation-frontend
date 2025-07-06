export interface PaginatedResult<T> {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  data: T[];
}
