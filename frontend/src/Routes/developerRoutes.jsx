import DeveloperLayout from "../layout/DeveloperLayout";
import Dashboard from "../pages/Developer/Dashboard/Dashboard";
import OnGoingProjects from "../Pages/Developer/Projects/OnGoing/OnGoing";

export const developerRoutes = {
  path: "/developer",
  element: <DeveloperLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "project/ongoing",
      element: <OnGoingProjects />,
    },
  ],
};
