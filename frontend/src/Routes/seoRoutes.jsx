import SEOLayout from "../Layout/SEOLayout";
import Dashboard from "../pages/SEO/Dashboard/Dashboard";
import AddClient from "../Pages/SEO/Client/Add/Page";
import AllClients from "../Pages/SEO/Client/All/Page";
import ClientDetails from "../Pages/SEO/Client/Details/Page";
import MakeInvoice from "../Pages/SEO/Client/MakeInvoice/Page";
import AllServices from "../Pages/SEO/Business/Service/All/Page";
import DailyWork from "../Pages/SEO/DailyWork/All/Page";
import AddTodayWork from "../Pages/SEO/DailyWork/Add/Page";
import AllPayment from "../Pages/SEO/Payment/All/Page";
import Developers from "../Pages/CTO/Developer/All/Page";
import AsignsProjects from "../Pages/CTO/Projects/Asigns/Page";
import OnGoingProjects from "../Pages/CTO/Projects/OnGoing/Page";
import CompletedProjects from "../Pages/CTO/Projects/Completed/Page";

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

    // ---- payment ----
    {
      path: "payment/all",
      element: <AllPayment />,
    },

    // ---- daily work ----
    {
      path: "dailywork/all",
      element: <DailyWork />,
    },
    {
      path: "dailywork/add",
      element: <AddTodayWork />,
    },

    // ---- employee ----
    {
      path: "employee/developer/all",
      element: <Developers role="seo" />,
    },
    {
      path: "employee/developer/project/asigns",
      element: <AsignsProjects role="seo" />,
    },
    {
      path: "employee/developer/project/ongoing",
      element: <OnGoingProjects role="seo" />,
    },
    {
      path: "employee/developer/project/completed",
      element: <CompletedProjects role="seo" />,
    },
  ],
};
