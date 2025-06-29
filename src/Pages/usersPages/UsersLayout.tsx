import React from "react";
import { Outlet } from "react-router-dom";

const UsersLayout: React.FC = () => {
  return (
    <div className="users-layout">
      <Outlet />
    </div>
  );
};

export default UsersLayout;