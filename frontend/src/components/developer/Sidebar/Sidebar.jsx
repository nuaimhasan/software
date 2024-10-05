import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import SidebarItems from "./SidebarItems";
import { GoProjectRoadmap } from "react-icons/go";

const adminSidebarItems = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashbaord",
    path: "/developer/dashboard",
  },
  {
    icon: <GoProjectRoadmap />,
    title: "Project",
    subMenu: [
      {
        title: "Ongoing Project",
        path: "/developer/project/ongoing",
      },
      {
        title: "Completed Project",
        path: "/developer/project/completed",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <Link to="/">
          <img
            src="/images/logo/logo.png"
            alt="logo"
            height={100}
            className="mx-auto my-3 w-24 sm:w-36"
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
