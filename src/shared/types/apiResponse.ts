export interface ApiError {
  message: string;
}

export interface ApiResponse<T = unknown> {
  isSuccess: boolean;
  statusCode: number;
  successMessage?: string;
  result?: T;
  errors?: ApiError[];
} 