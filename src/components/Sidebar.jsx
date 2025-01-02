import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-20 text-white px-4 py-2 rounded-lg shadow-md"
      >
        {isOpen ? (
          <img className="w-5 h-5" src="/cross.svg" alt="close" />
        ) : (
          <img className="w-5 h-5" src="/bar.svg" alt="open" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "250px" }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-gray-900">
          <h2 className="text-lg font-bold">Sidebar</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            ✖
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="flex flex-col space-y-2 p-4">
          <li>
            <a href="/" className="block px-4 py-2 rounded hover:bg-gray-700">
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/services"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Background overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
