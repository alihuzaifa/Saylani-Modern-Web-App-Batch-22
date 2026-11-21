import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import ProtectedRoute from "./components/protectedroute";
import PublicRoute from "./components/publicroute";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Todo from "./pages/todo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sirf logout user ke liye */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Sirf login user ke liye */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Todo />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
