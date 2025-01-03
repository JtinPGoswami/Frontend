import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Logout from "./Logout";
import ModeToggle from "./mode-toggle";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const menuRef = useRef(null);

  const handleLogOut = async () => {
    const logOutUser = await Logout();
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
        <div className="text-lg font-bold text-primary pl-3">RoR</div>

        <button
          className="md:hidden text-primary pr-3"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav
          ref={menuRef}
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 right-0 sm:w-[30%] w-[45%] float-end md:static md:flex md:w-auto md:space-x-6 md:shadow-none transition-transform duration-200 ease-in`}
        >
          <ul className="flex flex-col float-end w-full  h-4/6 md:bg-transparent bg-background rounded-sm items-center border border-gray-400 md:w-full md:border-none space-y-2 p-4 md:flex-row md:space-y-0 md:items-center gap-4 md:p-0">
            <li onClick={handleMenuItemClick}>
              <Link
                to="/"
                className="block text-secondary-foreground hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li onClick={handleMenuItemClick}>
              <Link
                to="/about"
                className="block text-secondary-foreground hover:text-primary"
              >
                About
              </Link>
            </li>
            <li onClick={handleMenuItemClick}>
              {user && user.role === "landlord" ? (
                <Link
                  to="/listed/room"
                  className="block text-secondary-foreground hover:text-primary"
                >
                  Rooms
                </Link>
              ) : (
                <Link
                  to="/rooms"
                  className="block text-secondary-foreground hover:text-primary"
                >
                  Rooms
                </Link>
              )}
            </li>
            <li onClick={handleMenuItemClick}>
              {user && user.role === "admin" ? (
                <Link
                  to="/users"
                  className="block text-secondary-foreground hover:text-primary"
                >
                  Users
                </Link>
              ) : (
                <Link
                  to="/contact"
                  className="block text-secondary-foreground hover:text-primary"
                >
                  Contact
                </Link>
              )}
            </li>
            <li onClick={handleMenuItemClick}>
              {user && user.role === "seeker" && (
                <Link
                  to="/landlords"
                  className="block text-secondary-foreground hover:text-primary"
                >
                  LandLords
                </Link>
              )}
            </li>
            <li onClick={handleMenuItemClick}>
              <Link
                to="/profile"
                className="block text-secondary-foreground hover:text-primary"
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
            <li onClick={handleMenuItemClick}>
              <button onClick={user ? handleLogOut : () => navigate("/login")}>
                {user ? <Logout /> : "Log in"}
              </button>
            </li>
            <ModeToggle />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
