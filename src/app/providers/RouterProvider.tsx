import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { routesElement } from "@/shared/routes/routes";

const router = createBrowserRouter(createRoutesFromElements(routesElement));

export const RouterProvider = () => {
  return <ReactRouterProvider router={router} />;
};
