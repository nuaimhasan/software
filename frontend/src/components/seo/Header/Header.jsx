import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ToggleTheme from "../../ToggleTheme/ToggleTheme";
import { useLogoutMutation } from "../../../Redux/user/authApi";
import { toast } from "react-hot-toast";
import { IoNotifications } from "react-icons/io5";

export default function Header({ sidebar, setSidebar }) {
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    const res = await logout({ role: "seo" });

    if (res?.data?.success) {
      toast.success("Logged out successfully");
      navigate("/");
    } else {
      toast.error("Failed to log out");
      console.log(res);
    }
  };

  return (
    <header className="bg-base-100 px-6 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebar(!sidebar)}
            className="admin_sidebar_btn lg:hidden"
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>

          <p>SEO</p>
        </div>

        <div>
          <div className="relative flex items-center gap-4">
            <button>
              <IoNotifications className="text-xl text-neutral-content" />
            </button>

            <ToggleTheme theme_panel="eManager_seo_theme" panel_id="seo" />

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
                <li className="cursor-pointer" onClick={() => handleLogout()}>
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
