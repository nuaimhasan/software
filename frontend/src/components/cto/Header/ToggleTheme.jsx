import { MdSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saveTheme = localStorage.getItem("eManager_theme");
    saveTheme ? setTheme(saveTheme) : setTheme("light");

    const root = document.getElementById("html");
    root.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <label className="swap swap-rotate text-gray-500">
      <input
        type="checkbox"
        className="border-none"
        checked={theme === "dark"}
        onChange={() => {
          setTheme(theme === "light" ? "dark" : "light");
          localStorage.setItem(
            "eManager_theme",
            theme === "light" ? "dark" : "light"
          );
        }}
      />

      <IoMoonSharp className="swap-on text-xl" />
      <MdSunny className="swap-off text-xl" />
    </label>
  );
}
