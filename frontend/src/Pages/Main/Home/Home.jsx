import { Link } from "react-router-dom";
import { FaCode } from "react-icons/fa";
import { FcBusinesswoman } from "react-icons/fc";
import { RiAdminFill } from "react-icons/ri";
import { FaLaptopCode } from "react-icons/fa";
import { MdAccountBalance, MdDesignServices, MdCampaign } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { GiHumanTarget } from "react-icons/gi";

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
  {
    title: "HR",
    icon: <GiHumanTarget className="text-2xl" />,
    path: "/hr/dashboard",
  },
  {
    title: "Accountant",
    icon: <MdAccountBalance className="text-2xl" />,
    path: "/accountant/dashboard",
  },
  {
    title: "Digital Marketer",
    icon: <MdCampaign className="text-2xl" />,
    path: "/digital-marketer/dashboard",
  },
  {
    title: "Graphic Designer",
    icon: <MdDesignServices className="text-2xl" />,
    path: "/graphic-designer/dashboard",
  },
  {
    title: "Marketing Exucative",
    icon: <RiCustomerService2Line className="text-2xl" />,
    path: "/marketing-exucative/dashboard",
  },
];

export default function Home() {
  return (
    <section className="flex h-screen w-full items-center justify-center py-5">
      <div className="container">
        <h2 className="text-center text-2xl font-medium">
          Welcome to eManager Software
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-6">
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
