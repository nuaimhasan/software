import Header from "../components/seo/Header/Header";
import Sidebar from "../components/seo/Sidebar/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthCheck } from "../Hook/useAuthCheck";

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

  const { isLoading, isValidUser } = useAuthCheck("seo");
  if (isLoading) return <div>Loading...</div>;
  if (!isValidUser) return <Navigate to="/login" />;

  return (
    <section className="flex" data-theme="light" id="seo">
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
