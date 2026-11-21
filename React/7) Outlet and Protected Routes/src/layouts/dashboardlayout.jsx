import { Outlet } from "react-router";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

const DashboardLayout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        <main className="content">
          {/* Jo child route match karega wo yahan dikhega */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
