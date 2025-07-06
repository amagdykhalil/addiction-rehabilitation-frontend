import { Outlet } from "react-router-dom";

const UsersLayout = () => {
  return (
    <div className="Users-layout">
      <Outlet />
    </div>
  );
};

export default UsersLayout;
