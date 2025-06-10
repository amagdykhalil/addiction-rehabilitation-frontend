import { useQuery as useReactQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';

export function useQuery<TData = unknown, TError = Error>(
  queryKey: string[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
) {
  return useReactQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });
}   