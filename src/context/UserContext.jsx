import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "";
  });

  const [selectedUser, setSelectedUser] = useState(() => {
    const savedUser = localStorage.getItem("selectedUser");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null; // If there's an error parsing, return null
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_USER_API_URI}/current/user`,
          { withCredentials: true }
        );
        setUser(response.data?.data || null); // Set user from backend
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null); // Set user to null if fetching fails
      }
    };

    fetchUser();
  }, []); // Run only once on initial load

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  useEffect(() => {
    if (selectedUser !== null) {
      try {
        localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
      } catch (e) {
        console.error("Failed to store selectedUser:", e);
      }
    }
  }, [selectedUser]);

  return (
    <UserContext.Provider
      value={{ user, setUser, role, setRole, selectedUser, setSelectedUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
