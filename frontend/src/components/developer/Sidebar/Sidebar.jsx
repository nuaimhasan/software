import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import SidebarItems from "./SidebarItems";

const adminSidebarItems = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashbaord",
    path: "/developer/dashboard",
  },
  {
    icon: <BsCart4 />,
    title: "Developers",
    path: "/developer/all",
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
