// admin/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../utils/ProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
