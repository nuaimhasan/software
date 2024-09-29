import { Link } from "react-router-dom";
import { FaCode } from "react-icons/fa";
import { FcBusinesswoman } from "react-icons/fc";
import { RiAdminFill } from "react-icons/ri";
import { FaLaptopCode } from "react-icons/fa";

const panel = [
  {
    title: "Admin",
    icon: <RiAdminFill className="text-2xl" />,
    path: "/admin/dashboard",
  },
  {
    title: "Sr. Executive Officer",
    icon: <FcBusinesswoman className="text-2xl" />,
    path: "/seo/dashboard",
  },
  {
    title: "CTO",
    icon: <FaLaptopCode className="text-2xl" />,
    path: "/cto/dashboard",
  },
  {
    title: "Developer",
    icon: <FaCode className="text-2xl" />,
    path: "/developer/dashboard",
  },
];

export default function Home() {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="container">
        <h2 className="text-center text-2xl font-medium">
          Welcome to eManager software
        </h2>

        <div className="mt-5 grid grid-cols-6 gap-4">
          {panel?.map((item, i) => (
            <Link
              key={i}
              to={item?.path}
              className="flex flex-col items-center justify-center gap-2 rounded border px-3 py-8 text-center shadow duration-200 hover:bg-primary/5"
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
