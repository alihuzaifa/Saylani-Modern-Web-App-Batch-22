import { Navigate, Outlet } from "react-router";
import { getCurrentUser } from "../storage";

const PublicRoute = () => {
  // pehle se login hai to login/signup page nahi dikhana
  if (getCurrentUser()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
