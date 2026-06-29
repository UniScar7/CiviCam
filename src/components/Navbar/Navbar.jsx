import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Camera, Menu, X } from "lucide-react";

const Navbar = ({ isAdmin, setIsAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);

  const citizenLinks = [
    { name: "Home", path: "/" },
    //{ name: "Report Issue", path: "/report" },
    { name: "Live Issues", path: "/live" },
    { name: "My Reports", path: "/my-reports" },
    { name: "Profile", path: "/profile" },
    { name: "Login", path: "/login" },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "Manage Issues", path: "/admin" },
    { name: "User Directory", path: "/admin" },
    { name: "Settings", path: "/admin" },
  ];

  const navLinks = isAdmin ? adminLinks : citizenLinks;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-slate-900 hover:opacity-80 transition-opacity"
            >
              <div className="bg-cyan-600 p-2 rounded-lg text-white">
                <Camera size={20} strokeWidth={2} />
              </div>

              <span className="font-bold text-xl tracking-tight">
                CiviCam

                {isAdmin && (
                  <span className="text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded-md ml-2 align-middle">
                    ADMIN
                  </span>
                )}
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-cyan-600"
                      : "text-slate-600 hover:text-cyan-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Development Toggle */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="text-xs text-slate-400 hover:text-slate-600 border-l border-slate-200 pl-4 transition-colors"
            >
              Toggle Role
            </button>

            {!isAdmin && (
              <NavLink
                to="/report"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm"
              >
                Report Issue
              </NavLink>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-900 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

            {navLinks.map((link) => (
              <NavLink
                key={`mobile-${link.name}`}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? "bg-cyan-50 text-cyan-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-slate-400 hover:bg-slate-50 rounded-md font-medium text-sm border-t border-slate-100 mt-2 pt-2"
            >
              Toggle Admin Role ({isAdmin ? "ON" : "OFF"})
            </button>

            {!isAdmin && (
              <div className="px-3 py-2 mt-2">
                <NavLink
                  to="/report"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm text-center"
                >
                  Report Issue
                </NavLink>
              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;