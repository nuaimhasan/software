import CTOLayout from "../layout/CTOLayout";
import Dashboard from "../pages/CTO/Dashboard/Dashboard";
import Developers from "../pages/CTO/Developer/All/Page";

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
  ],
};
