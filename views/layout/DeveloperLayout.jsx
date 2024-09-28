import { useEffect, useState } from "react";
import Header from "../components/developer/Header/Header";
import Sidebar from "../components/developer/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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

  const { loggedUser, userLoading } = useSelector((state) => state.user);

  if (userLoading) return <div>Loading...</div>;

  if (
    !loggedUser?.success ||
    (loggedUser == "undefined" && !userLoading) ||
    loggedUser?.data?.role !== "developer"
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
        <main className="p-3">{children}</main>
      </div>
    </section>
  );
}
