export interface ApiError {
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  isSuccess: boolean;
  statusCode: number;
  successMessage?: string;
  errors?: ApiError[];
  result?: T;
}
