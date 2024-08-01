import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useTheme } from "../providers/ThemeProvider";
import Logo from "./Logo";
import {useSelector} from "react-redux"
import { MdMessage } from "react-icons/md";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            className="toggle bg-black dark:bg-gray-800 text-white w-24 md:w-32 h-8 rounded-2xl hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
            onClick={toggleTheme}
          >
            {isDarkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;



