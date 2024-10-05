import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Main/Home/Home";
import Login from "../Pages/Main/Login/Login";

export const mainRoutes = {
  id: "main",
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login/:role",
      element: <Login />,
    },
  ],
};
