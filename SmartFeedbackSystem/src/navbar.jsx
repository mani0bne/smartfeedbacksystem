import { NavLink } from "react-router-dom";
import { Film, BarChart3 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-cyan-500/30 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo / Title */}
        <div className="flex items-center gap-2">
          <Film className="text-cyan-400 w-6 h-6" />
          <h1 className="text-xl font-bold text-cyan-400 tracking-wider">
            Movie Feedback
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1 text-sm font-semibold ${
                isActive
                  ? "text-purple-400"
                  : "text-cyan-300 hover:text-purple-400"
              }`
            }
          >
            🎬 Feedback
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-1 text-sm font-semibold ${
                isActive
                  ? "text-purple-400"
                  : "text-cyan-300 hover:text-purple-400"
              }`
            }
          >
            <BarChart3 size={16} /> Analytics
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
