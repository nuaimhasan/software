import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Page";

export const adminRouter = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
  ],
};
