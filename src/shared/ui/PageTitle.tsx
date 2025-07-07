import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { ROUTES } from "@/shared/routes";
import { SIDEBAR_KEYS } from "@/shared/i18n/keys/sidebar";

// Map each route to its sidebar translation key
const ROUTE_TITLES: Record<string, string> = {
  [ROUTES.USERS.MAIN_PATH]: SIDEBAR_KEYS.users,
  [ROUTES.ROLES.MAIN_PATH]: SIDEBAR_KEYS.roles,
  [ROUTES.PATIENTS.MAIN_PATH]: SIDEBAR_KEYS.patients,
  [`${ROUTES.USER.MAIN_PATH}/${ROUTES.USER.SETTINGS}`]: SIDEBAR_KEYS.settings,
  [ROUTES.HOME]: SIDEBAR_KEYS.dashboard,
};

export const PageTitle = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation([NAMESPACE_KEYS.sidebar]);
  // Find the best match for the current path
  const match = Object.keys(ROUTE_TITLES).find((route) => pathname == route);
  const key = match ? ROUTE_TITLES[match] : SIDEBAR_KEYS.dashboard;
  return (
    <h1 className="text-base font-medium min-w-max">
      {t(key, { ns: NAMESPACE_KEYS.sidebar })}
    </h1>
  );
};
