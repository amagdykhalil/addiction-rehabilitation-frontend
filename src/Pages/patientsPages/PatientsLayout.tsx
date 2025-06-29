import React from "react";
import { Outlet } from "react-router-dom";

const PatientsLayout: React.FC = () => {
  return (
    <div className="patients-layout">
      <Outlet />
    </div>
  );
};

export default PatientsLayout;
