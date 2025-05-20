import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Logout from "./Logout";
import ModeToggle from "./mode-toggle";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const menuRef = useRef(null);

  const handleLogOut = async () => {
    await Logout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-10 backdrop-blur border-b border-gray-700 mb-16">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link
          to={"/"}
          className="text-lg font-bold italic tracking-wider text-primary pl-3"
        >
          RoR
        </Link>

        <button
          className="md:hidden text-primary pr-3"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              ref={menuRef}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-16 right-0 sm:w-[40%] w-[60%] md:hidden z-20 bg-background rounded-sm shadow-lg border border-gray-400"
            >
              <ul className="flex flex-col h-screen space-y-1 p-4 w-full mt-10 ">
                <li
                  className="hover:bg-gray-800  p-2 transition-all duration-100 ease-linear rounded-sm"
                  onClick={handleMenuItemClick}
                >
                  <Link
                    to="/"
                    className="text-secondary-foreground hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li
                  className="hover:bg-gray-800  p-2 transition-all duration-100 ease-linear rounded-sm"
                  onClick={handleMenuItemClick}
                >
                  <Link
                    to="/about"
                    className="text-secondary-foreground hover:text-primary"
                  >
                    About
                  </Link>
                </li>
                <li
                  className="hover:bg-gray-800  p-2 transition-all duration-100 ease-linear rounded-sm"
                  onClick={handleMenuItemClick}
                >
                  {user && user.role === "landlord" ? (
                    <Link
                      to="/listed/room"
                      className="text-secondary-foreground hover:text-primary"
                    >
                      Rooms
                    </Link>
                  ) : (
                    <Link
                      to="/rooms"
                      className="text-secondary-foreground hover:text-primary"
                    >
                      Rooms
                    </Link>
                  )}
                </li>
                <li
                  className="hover:bg-gray-800  p-2 transition-all duration-100 ease-linear rounded-sm"
                  onClick={handleMenuItemClick}
                >
                  {user && user.role === "admin" ? (
                    <Link
                      to="/users"
                      className="text-secondary-foreground hover:text-primary"
                    >
                      Users
                    </Link>
                  ) : (
                    <Link
                      to="/contact"
                      className="text-secondary-foreground hover:text-primary"
                    >
                      Contact
                    </Link>
                  )}
                </li>
                {user && user.role === "seeker" && (
                  <li
                    className="hover:bg-gray-800  p-2 transition-all duration-100 ease-linear rounded-sm"
                    onClick={handleMenuItemClick}
                  >
                    <Link
                      to="/landlords"
                      className="text-secondary-foreground hover:text-primary"
                    >
                      LandLords
                    </Link>
                  </li>
                )}
                <li className="p-2" onClick={handleMenuItemClick}>
                  <Link
                    to="/profile"
                    className="text-secondary-foreground hover:text-primary"
                  >
                    {user ? (
                      <img
                        className="w-8 h-8 rounded-full"
                        src={user.ProfilePic}
                        alt="Profile"
                      />
                    ) : (
                      "Profile"
                    )}
                  </Link>
                </li>
                <li className="p-4" onClick={handleMenuItemClick}>
                  <button
                    onClick={user ? handleLogOut : () => navigate("/login")}
                  >
                    {user ? <Logout /> : "Log in"}
                  </button>
                </li>
                <div className="px-2">
                  <ModeToggle />
                </div>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Desktop nav (always visible) */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <Link to="/" className="text-secondary-foreground hover:text-primary">
            Home
          </Link>
          <Link
            to="/about"
            className="text-secondary-foreground hover:text-primary"
          >
            About
          </Link>
          {user && user.role === "landlord" ? (
            <Link
              to="/listed/room"
              className="text-secondary-foreground hover:text-primary"
            >
              Rooms
            </Link>
          ) : (
            <Link
              to="/rooms"
              className="text-secondary-foreground hover:text-primary"
            >
              Rooms
            </Link>
          )}
          {user && user.role === "admin" ? (
            <Link
              to="/users"
              className="text-secondary-foreground hover:text-primary"
            >
              Users
            </Link>
          ) : (
            <Link
              to="/contact"
              className="text-secondary-foreground hover:text-primary"
            >
              Contact
            </Link>
          )}
          {user && user.role === "seeker" && (
            <Link
              to="/landlords"
              className="text-secondary-foreground hover:text-primary"
            >
              LandLords
            </Link>
          )}
          <Link
            to="/profile"
            className="text-secondary-foreground hover:text-primary"
          >
            {user ? (
              <img
                className="w-8 h-8 rounded-full"
                src={user.ProfilePic}
                alt="Profile"
              />
            ) : (
              "Profile"
            )}
          </Link>
          <button onClick={user ? handleLogOut : () => navigate("/login")}>
            {user ? <Logout /> : "Log in"}
          </button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
