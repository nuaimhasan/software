import { MdOutlineDashboard } from "react-icons/md";
import SidebarItems from "./SidebarItems";

import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { IoBusiness } from "react-icons/io5";

const adminSidebarItems = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashbaord",
    path: "/seo/dashboard",
  },
  {
    icon: <IoBusiness />,
    title: "Business",
    subMenu: [
      {
        title: "Services",
        path: "/seo/business/services",
      },
    ],
  },
  {
    icon: <FaUsers />,
    title: "Clients",
    subMenu: [
      {
        title: "Add Clients",
        path: "/seo/client/add",
      },
      {
        title: "All Clients",
        path: "/seo/client/all",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <Link to="/">
          <img
            src="/images/logo/logo.png"
            alt="logo"
            height={100}
            className="w-24 sm:w-36 mx-auto my-3"
          />
        </Link>

        <nav className="admin_siderbar_item">
          <ul>
            {adminSidebarItems?.map((item, i) => (
              <SidebarItems key={i} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
