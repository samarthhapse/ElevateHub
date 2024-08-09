import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa"; 
import { useTheme } from "../providers/ThemeProvider";
import Logo from "./Logo";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const d = document.body;
    if (isDarkMode) {
      d.style.backgroundColor = "#0f2526";
      d.style.color = "white";
    } else {
      d.style.backgroundColor = "#fff";
      d.style.color = "#0D203D";
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="max-w-full overflow-x-hidden bg-white dark:bg-gray-900 shadow-md">
      <div className="h-16 flex items-center justify-between px-4 md:px-8 lg:px-16 text-lg md:text-xl w-full">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <FaTimes className="text-gray-800 dark:text-gray-200" />
            ) : (
              <FaBars className="text-gray-800 dark:text-gray-200" />
            )}
          </button>
        </div>
        <div
          ref={menuRef}
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex md:items-center md:space-x-8 absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-gray-900 flex-col md:flex-row items-center space-y-4 md:space-y-0 p-4 md:p-0 shadow-md md:shadow-none z-50`}
        >
          <Link
            key="home"
            to="/"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            key="features"
            to="/features"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
          >
            Features
          </Link>
          <Link
            key="pricing"
            to="/pricing"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
          >
            Pricing
          </Link>
          <Link
            key="resources"
            to="/resources"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
          >
            Resources
          </Link>
          <Link
            key="events"
            to="/events"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
          >
            Events
          </Link>
          <Link to="/Landing">
            <button className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
              Login
            </button>
          </Link>
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full transition duration-300"
            onClick={toggleTheme}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;





