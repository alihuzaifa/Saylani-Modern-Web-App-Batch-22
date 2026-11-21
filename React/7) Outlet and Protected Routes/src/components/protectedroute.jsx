import { Navigate, Outlet } from "react-router";
import { getUser } from "../auth";

const ProtectedRoute = () => {
  const user = getUser();

  // login nahi hai to login page par bhej do
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // login hai to andar ke routes dikhao
  return <Outlet />;
};

export default ProtectedRoute;
