import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex items-start gap-4">
      <aside className="w-96 bg-gray-100 h-screen">Sidebar</aside>
      <Outlet />
    </div>
  );
}
