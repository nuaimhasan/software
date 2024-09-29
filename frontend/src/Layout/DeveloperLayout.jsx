import { useEffect, useState } from "react";
import Header from "../components/developer/Header/Header";
import Sidebar from "../components/developer/Sidebar/Sidebar";
import { Navigate } from "react-router-dom";
import { useAuthCheck } from "../Hook/useAuthCheck";

export default function DeveloperLayout({ children }) {
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

  const { isLoading, isValidUser } = useAuthCheck("developer");
  if (isLoading) return <div>Loading...</div>;
  if (!isValidUser) return <Navigate to="/login" />;

  return (
    <section className="flex" data-theme="light" id="developer">
      <aside
        className={`admin_sidebar bg-base-100 ${
          sidebar && "admin_sidebar_show"
        }`}
      >
        <Sidebar />
      </aside>
      <div className="admin_content">
        <Header sidebar={sidebar} setSidebar={setSidebar} />
        <main className="p-3">{children}</main>
      </div>
    </section>
  );
}
