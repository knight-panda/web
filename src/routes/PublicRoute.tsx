import { Navigate } from "react-router-dom";
import React from "react";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;