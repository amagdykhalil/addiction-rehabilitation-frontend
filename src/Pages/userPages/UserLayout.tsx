import { Outlet } from "react-router-dom";

export const UserLayout = () => {
  return (
    <>
      <header>User Dashboard</header>
      <Outlet />
    </>
  );
};
