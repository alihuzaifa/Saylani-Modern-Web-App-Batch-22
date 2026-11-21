import { BrowserRouter, Routes, Route } from "react-router";
import ProtectedRoute from "./components/protectedroute";
import DashboardLayout from "./layouts/dashboardlayout";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Settings from "./pages/settings";
import NotFound from "./pages/notfound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes: login ke baghair andar nahi ja sakte */}
        <Route element={<ProtectedRoute />}>
          {/* Layout route: sidebar + topbar yahan, page <Outlet /> mein */}
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
