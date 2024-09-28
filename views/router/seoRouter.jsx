import AddClient from "../components/seo/Client/Add/Page";
import SEOLayout from "../layout/SEOLayout";
import Dashboard from "../pages/SEO/Dashboard/Dashboard";

export const seoRouter = {
  path: "/seo",
  element: <SEOLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "client/add",
      element: <AddClient />,
    },
  ],
};
