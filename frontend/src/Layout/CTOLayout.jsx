import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/cto/Sidebar/Sidebar";
import Header from "../components/cto/Header/Header";

export default function CTOLayout() {
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        (!e.target.closest(".admin_sidebar") &&
          !e.target.closest(".admin_sidebar_btn")) ||
        e.target.closest(".admin_siderbar ul li a")
      ) {
        setSidebar(false);
      }
    });
  }, []);

  const { loggedUser, userLoading } = useSelector((state) => state.user);

  // if (userLoading) return <div>Loading...</div>;

  // if (
  //   !loggedUser?.success ||
  //   (loggedUser == "undefined" && !userLoading) ||
  //   loggedUser?.data?.role !== "cto"
  // )
  //   return <Navigate to="/login" />;

  return (
    <section className="flex">
      <aside
        className={`admin_sidebar bg-base-100 ${
          sidebar && "admin_sidebar_show"
        }`}
      >
        <Sidebar />
      </aside>
      <div className="admin_content">
        <Header sidebar={sidebar} setSidebar={setSidebar} />
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
