import { useNavigate } from "react-router";
import { getUser, logout } from "../auth";

const Topbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <span>{user?.email}</span>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Topbar;
