import React from "react";

export const ActiveStatusText: React.FC<{
  isActive: boolean;
  children: React.ReactNode;
}> = ({ isActive, children }) => (
  <span className={isActive ? "text-green-600" : "text-red-600"}>
    {children}
  </span>
);

export default ActiveStatusText;
