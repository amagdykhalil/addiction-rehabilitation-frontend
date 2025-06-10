import { Route, Routes } from "react-router-dom";
import { HomePage } from "@/Pages/HomePage";
import { LoginPage } from "@/Pages/LoginPage";
import { InternalServerErrorPage } from "@/Pages/InternalServerErrorPage";
import { ROUTES } from "@/shared/routes";
import useGlobalLoading from "@/shared/hooks/useGlobalLoading";

export const AppRouter = () => {
  useGlobalLoading()
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SERVERERROR} element={<InternalServerErrorPage />} />
    </Routes>
  );
};
