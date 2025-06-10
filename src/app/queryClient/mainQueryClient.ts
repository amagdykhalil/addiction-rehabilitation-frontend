import { handleError} from '@/shared/lib/errors';
import { STALE_TIME } from '@/shared/config/reactQuery';
import {
  QueryClient,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';

export const mainQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: STALE_TIME.DEFAULT
    },
  },
  queryCache: new QueryCache({
    onSettled: handleError,
  }),
  mutationCache: new MutationCache({
    onSettled: handleError,
  }),
});