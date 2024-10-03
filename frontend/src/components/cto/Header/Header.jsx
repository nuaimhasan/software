import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import ToggleTheme from "../../ToggleTheme/ToggleTheme";
import useLogout from "../../../Hook/useLogout";

export default function Header({ sidebar, setSidebar }) {
  const logout = useLogout();

  return (
    <header className="bg-base-100 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebar(!sidebar)}
            className="admin_sidebar_btn lg:hidden"
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
        </div>

        <div>
          <div className="relative flex items-center gap-4">
            <button>
              <IoNotifications className="text-xl text-neutral-content" />
            </button>

            <ToggleTheme theme_panel="eManager_cto_theme" panel_id="cto" />

            <div className="dropdown dropdown-end">
              <img
                tabIndex={0}
                role="button"
                src="/images/demouser.png"
                className="h-8 w-8 rounded-full"
              />
              <ul
                tabIndex={0}
                className="menu dropdown-content z-10 w-20 rounded border bg-base-100 px-3 py-2 text-center font-semibold text-red-500 shadow"
              >
                <li className="cursor-pointer" onClick={() => logout("cto")}>
                  Log out
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
