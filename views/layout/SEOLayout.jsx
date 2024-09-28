import Header from "../components/seo/Header/Header";
import Sidebar from "../components/seo/Sidebar/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function SEOLayout() {
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

  if (userLoading) return <div>Loading...</div>;

  if (
    !loggedUser?.success ||
    loggedUser == "undefined" ||
    loggedUser?.data?.role !== "seo"
  )
    return <Navigate to="/login" />;

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
        <main className="p-2">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
