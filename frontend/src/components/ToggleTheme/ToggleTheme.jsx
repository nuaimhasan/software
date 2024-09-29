import { MdSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function ToggleTheme({ theme_panel, panel_id }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saveTheme = localStorage.getItem(theme_panel);

    saveTheme ? setTheme(saveTheme) : setTheme("light");

    const id = document.getElementById(panel_id);
    id.setAttribute("data-theme", theme);
  }, [theme, theme_panel, panel_id]);

  return (
    <label className="swap swap-rotate mt-1 text-gray-500">
      <input
        type="checkbox"
        className="border-none"
        checked={theme === "dark"}
        onChange={() => {
          setTheme(theme === "light" ? "dark" : "light");
          localStorage.setItem(
            theme_panel,
            theme === "light" ? "dark" : "light",
          );
        }}
      />

      <IoMoonSharp className="swap-on text-xl" />
      <MdSunny className="swap-off text-xl" />
    </label>
  );
}
