import AdminLayout from "../Layout/AdminLayout";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";

export const adminRoutes = {
  id: "admin",
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
  ],
};
