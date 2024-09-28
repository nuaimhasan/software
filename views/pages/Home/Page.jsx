import { Link } from "react-router-dom";
import { FaCode } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";

const panel = [
  {
    title: "Developer",
    icon: <FaCode className="text-2xl" />,
    path: "/developer/dashboard",
  },
  {
    title: "Sr. Executive Officer",
    icon: <FcBusinessman className="text-2xl" />,
    path: "/seo/dashboard",
  },
];

export default function Home() {
  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div>
        <h2 className="text-2xl font-medium text-center">
          Welcome to eManager software
        </h2>

        <div className="mt-5 grid grid-cols-5 gap-4">
          {panel?.map((item, i) => (
            <Link
              key={i}
              to={item?.path}
              className="border rounded p-10 shadow  hover:bg-primary/5 duration-200 flex flex-col gap-2 items-center justify-center"
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
