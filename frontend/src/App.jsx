import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { mainRoutes } from "./Routes/mainroutes";
import { adminRoutes } from "./Routes/adminroutes";
import { ctoroutes } from "./Routes/ctoroutes";
import { developerRoutes } from "./Routes/developerRoutes";
import { seoRoutes } from "./Routes/seoRoutes";

const router = createBrowserRouter([
  mainRoutes,
  adminRoutes,
  seoRoutes,
  ctoroutes,
  developerRoutes,
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
