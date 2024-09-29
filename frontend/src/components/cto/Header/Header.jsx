import { HiOutlineMenuAlt2 } from "react-icons/hi";

export default function Header({ sidebar, setSidebar }) {
  return (
    <header className="py-3 px-6 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebar(!sidebar)}
            className="admin_sidebar_btn lg:hidden"
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
        </div>
      </div>
    </header>
  );
}
