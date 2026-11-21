import { Navigate, Outlet } from "react-router";
import { getCurrentUser } from "../storage";

const ProtectedRoute = () => {
  // localStorage mein userId ho aur user maujood ho tabhi andar jao
  if (!getCurrentUser()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
