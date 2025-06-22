import { useRoutes } from "react-router-dom";
import { AppLayout } from "../../Pages/AppLayout";
import { routes } from "@/shared/routes";
import { useAuthInitializer } from "@/features/auth/hooks";

export const AppRouter = () => {
  const routing = useRoutes(routes);
  useAuthInitializer();

  return <AppLayout>{routing}</AppLayout>;
};
