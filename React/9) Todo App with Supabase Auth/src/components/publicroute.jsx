import { Navigate, Outlet } from "react-router";
import useSession from "../useSession";

const PublicRoute = () => {
  const session = useSession();

  if (session === undefined) {
    return <p className="empty">Loading...</p>;
  }

  // pehle se login hai to login/signup page nahi dikhana
  if (session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
