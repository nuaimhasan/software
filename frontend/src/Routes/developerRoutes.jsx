import DeveloperLayout from "../layout/DeveloperLayout";
import Dashboard from "../pages/Developer/Dashboard/Dashboard";

export const developerRoutes = {
  path: "/developer",
  element: <DeveloperLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
  ],
};
