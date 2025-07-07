import { useRoutes } from "react-router-dom";
import { AppLayout } from "@/Pages";
import { routes } from "@/shared/routes/routes";
import { useAuthInitializer } from "@/features/auth/hooks";

export const AppRouter = () => {
  const routing = useRoutes(routes);
  useAuthInitializer();

  return <AppLayout>{routing}</AppLayout>;
};
