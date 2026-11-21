import { Navigate, Outlet } from "react-router";
import useSession from "../useSession";

const ProtectedRoute = () => {
  const session = useSession();

  if (session === undefined) {
    return <p className="empty">Loading...</p>;
  }

  // session nahi hai to login page par bhej do
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={session.user} />;
};

export default ProtectedRoute;
