import { store } from "@/app/stores";
import {
  logout,
  setCredentials,
  type IAuthenticationResponse,
} from "@/entities/auth/model";
import {
  postLogoutBroadcast,
  postTokenGeneratedBroadcast,
} from "@/shared/lib/broadcasts/authBroadcasts";
import { ROUTES } from "@/shared/routes";

const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD, // if it's dynamic like /reset-password/:code, match prefix
];

export const isPublicRoute = () => {
  const currentPath = window.location.pathname.toLowerCase();

  return PUBLIC_ROUTES.some((route) =>
    currentPath.startsWith(route.toLowerCase())
  );
};

export const handleUnauthorized = () => {
  store.dispatch(logout());
  postLogoutBroadcast();

  if (isPublicRoute()) return;

  window.location.href = ROUTES.LOGIN;
};

export const handleAuthorized = (auth: IAuthenticationResponse) => {
  store.dispatch(setCredentials(auth));
  postTokenGeneratedBroadcast(auth);
};

export const isAtLoginPage = () => window.location.pathname === ROUTES.LOGIN;

export const goToHome = () => (window.location.href = ROUTES.HOME);

export function attachAuthHeader(headers: Headers, token?: string) {
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
}
