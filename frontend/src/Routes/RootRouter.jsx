import { Toaster } from "react-hot-toast";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { mainRouter } from "./mainRouter";
import { adminRouter } from "./adminRouter";
import { developerRouter } from "./developerRouter";
import { seoRouter } from "./seoRouter";
import { useLoggedUserQuery } from "../Redux/user/authApi";
import { ctoRouter } from "./ctoRouter";

const router = createBrowserRouter([
  mainRouter,
  adminRouter,
  developerRouter,
  seoRouter,
  ctoRouter,
]);

const RootRouter = () => {
  const { data } = useLoggedUserQuery();

  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </>
  );
};

export default RootRouter;
