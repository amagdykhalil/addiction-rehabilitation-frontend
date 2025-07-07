import { Outlet } from "react-router-dom";

export default function PatientsLayout() {
  return (
    <div className="patients-layout">
      <Outlet />
    </div>
  );
}
