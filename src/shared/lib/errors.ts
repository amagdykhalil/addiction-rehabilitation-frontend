import { toast } from "sonner";
import type { ApiResponse } from "@/shared/types";
import { store } from "@/app/stores";
import { logout } from "@/entities/auth/model";
import { ROUTES } from "../routes";
import I18n from "./initI18n";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { ERRORS_KEYS } from "@/shared/i18n/keys";
import { isPublicRoute } from "./auth/auth";

export const handleError = (error: unknown) => {
  const navigate = (path: string) => {
    window.location.href = path;
  };

  let errorMessage = I18n.t(ERRORS_KEYS.unexpected, {
    ns: NAMESPACE_KEYS.common,
  });
  if (error instanceof Error) {
    toast.error(error.message || errorMessage);
    return;
  }

  const response = error as ApiResponse;
  if (response.isSuccess) return;

  const status = response.statusCode;
  if (response.errors?.[0]?.message) {
    errorMessage = response.errors[0].message;
  }

  switch (status) {
    case 400:
      toast.error(errorMessage);
      break;
    case 401:
      toast.error(
        I18n.t(ERRORS_KEYS.unauthorized, { ns: NAMESPACE_KEYS.common }),
      );
      store.dispatch(logout());
      if (!isPublicRoute()) navigate(ROUTES.LOGIN);
      break;
    case 403:
      toast.error(I18n.t(ERRORS_KEYS.forbidden, { ns: NAMESPACE_KEYS.common }));
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
