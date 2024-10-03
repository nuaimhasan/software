import CTOLayout from "../layout/CTOLayout";
import Dashboard from "../pages/CTO/Dashboard/Dashboard";
import Developers from "../pages/CTO/Developer/All/Page";
import AsignsProjects from "../Pages/CTO/Projects/Asigns/Page";
import CompletedProjects from "../Pages/CTO/Projects/Completed/Page";

export const ctoroutes = {
  path: "/cto",
  element: <CTOLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "developer/all",
      element: <Developers />,
    },
    {
      path: "project/asigns",
      element: <AsignsProjects />,
    },
    {
      path: "project/completed",
      element: <CompletedProjects />,
    },
  ],
};
