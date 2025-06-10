import { toast } from 'sonner';
import type { ApiResponse } from '@/shared/types';
import { store } from '@/app/stores';
import { logout } from '@/entities/auth/model';

export const handleError = (error: unknown) => {
  const navigate = (path: string) => {
    window.location.href = path;
  };

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  const response = error as ApiResponse;
  if(response.isSuccess)
    return;
  
  const status = response.statusCode;
  const errorMessage = response.errors?.[0]?.message ||  "An unexpected error occurred.";

  switch (status) {
    case 400:
      toast.error(errorMessage);
      break;
    case 401:
      toast.error("Unauthorized: Please log in again.");
      store.dispatch(logout());
      navigate('/login');
      break;
    case 403:
      toast.error("Access Denied: You don't have permission to access this.");
      break;
    case 404:
      toast.error(errorMessage);
      break;
    case 500:
    case 502:
    case 503:
      navigate("/500");
      break;
    default:
      toast.error(errorMessage);
      break;
  }
}; 