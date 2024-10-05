import DeveloperLayout from "../layout/DeveloperLayout";
import Dashboard from "../pages/Developer/Dashboard/Dashboard";
import AsignsProjects from "../Pages/Developer/Projects/Asigns/Page";
import CompletedProjects from "../Pages/Developer/Projects/Completed/Page";
import OnGoingProjects from "../Pages/Developer/Projects/OnGoing/Page";

export const developerRoutes = {
  path: "/developer",
  element: <DeveloperLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "project/asign",
      element: <AsignsProjects />,
    },
    {
      path: "project/ongoing",
      element: <OnGoingProjects />,
    },
    {
      path: "project/completed",
      element: <CompletedProjects />,
    },
  ],
};
