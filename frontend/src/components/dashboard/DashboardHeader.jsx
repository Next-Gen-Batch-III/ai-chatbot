import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import LogoImg from "../../assets/images/NGEP_BOT_LOGO.png";

export default function DashboardHeader({ title = "Dashboard", onThemeChange }) {
  const [theme, setTheme] = useState("light");

  const handleToggle = (next) => {
    setTheme(next);
    onThemeChange?.(next);
  };

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={LogoImg} alt="Logo" className="h-8 w-auto" />
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>

      <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1">
        <button
          onClick={() => handleToggle("light")}
          className={`rounded-full p-1.5 transition-colors ${
            theme === "light" ? "bg-amber-100 text-amber-500" : "text-gray-400 hover:text-gray-600"
          }`}
          aria-label="Light mode"
        >
          <Sun size={16} />
        </button>
        <button
          onClick={() => handleToggle("dark")}
          className={`rounded-full p-1.5 transition-colors ${
            theme === "dark" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-gray-600"
          }`}
          aria-label="Dark mode"
        >
          <Moon size={16} />
        </button>
      </div>
    </header>
  );
}