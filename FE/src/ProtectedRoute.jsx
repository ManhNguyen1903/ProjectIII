import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ role, allowedRoles, children }) {
  // Kiểm tra quyền truy cập
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
