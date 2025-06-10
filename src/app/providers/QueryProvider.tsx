import type { ReactNode } from 'react';
import {
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { mainQueryClient } from '@/app/queryClient';

export const QueryProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={mainQueryClient}>
    {children}
    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
  </QueryClientProvider>
);
