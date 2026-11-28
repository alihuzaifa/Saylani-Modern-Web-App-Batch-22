import { Outlet, Navigate } from "react-router";

const ProtectedRoutes = () => {
  const userId = localStorage.getItem("id");
  return userId ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
