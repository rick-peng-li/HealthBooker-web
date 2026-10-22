import { Navigate, useLocation } from "react-router-dom";
import { getToken, isAdminUser } from "@/utils/auth";

export const Protected = ({ children }) => {
  const location = useLocation();
  if (!getToken()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
};

export const Public = ({ children }) => {
  if (getToken()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const Admin = ({ children }) => {
  if (!getToken()) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdminUser()) {
    return <Navigate to="/" replace />;
  }
  return children;
};
