import SEOLayout from "../layout/SEOLayout";
import Dashboard from "../pages/SEO/Dashboard/Dashboard";
import AddClient from "../Pages/SEO/Client/Add/Page";
import AllClients from "../Pages/SEO/Client/All/Page";
import ClientDetails from "../Pages/SEO/Client/Details/Page";
import MakeInvoice from "../Pages/SEO/Client/MakeInvoice/Page";
import AllServices from "../Pages/SEO/Business/Service/All/Page";

export const seoRoutes = {
  path: "/seo",
  element: <SEOLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },

    {
      path: "business/service/all",
      element: <AllServices />,
    },

    // ---- client routes ----
    {
      path: "client/add",
      element: <AddClient />,
    },
    {
      path: "client/all",
      element: <AllClients />,
    },
    {
      path: "client/view/:id",
      element: <ClientDetails />,
    },
    {
      path: "client/make-invoice/:id",
      element: <MakeInvoice />,
    },
  ],
};
