import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  const navItems = ["help", "health", "support", "video", "mood", "news", "tasks"];

  return (
    <nav className="bg-teal-600 text-white p-4 flex justify-between items-center shadow-sm">
      <h1 className="text-2xl font-semibold">
        <Link to="/home" className="hover:text-gray-200">Wellbeing</Link>
      </h1>

      <ul className="hidden md:flex gap-4">
        {navItems.map((item) => (
          <li key={item}>
            <NavLink
              to={`/${item}`}
              end
              className={({ isActive }) =>
                `${isActive ? "text-white underline" : "text-gray-200"} hover:text-white transition duration-200`
              }
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="relative">
        <button onClick={toggleUserMenu} className="text-white text-2xl">
          <FaUserCircle />
        </button>
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-sm text-gray-800">
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
            <Link to="/project-details" className="block px-4 py-2 hover:bg-gray-100">Project Details</Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <button onClick={toggleMenu} className="md:hidden text-white text-2xl">
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-teal-600 text-white md:hidden">
          <ul className="flex flex-col items-center gap-4 py-4">
            {navItems.map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item}`}
                  end
                  className={({ isActive }) =>
                    `${isActive ? "text-white underline" : "text-gray-200"} hover:text-white transition duration-200`
                  }
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;