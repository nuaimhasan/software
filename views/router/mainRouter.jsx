import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Page";
import Login from "../pages/Login/Login";

export const mainRouter = {
  id: "main",
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ],
};
