import CTOLayout from "../layout/CTOLayout";
import Dashboard from "../Pages/CTO/Dashboard/Dashboard";
import Developers from "../Pages/CTO/Developer/All/Page";
import AsignsProjects from "../Pages/CTO/Projects/Asigns/Page";
import CompletedProjects from "../Pages/CTO/Projects/Completed/Page";
import OnGoingProjects from "../Pages/CTO/Projects/OnGoing/Page";

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
      element: <Developers role="cto" />,
    },
    {
      path: "project/asigns",
      element: <AsignsProjects role="cto" />,
    },
    {
      path: "project/ongoing",
      element: <OnGoingProjects role="cto" />,
    },
    {
      path: "project/completed",
      element: <CompletedProjects role="cto" />,
    },
  ],
};
