import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const GetLogInUser = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    const getLogInUser = async () => {
      try {
        const response = await axios.get(
          ` ${import.meta.env.VITE_API_URI}/user/current/user`,
          {},
          { withCredentials: true }
        );
        setUser(response.data?.data || null); // Update user state if logged in
      } catch (error) {
        console.error("Error fetching the current user:", error);
        if (!user) {
          navigate("/login", { replace: true }); // Redirect to login only if not already done
        }
      }
    };

    if (!user) {
      getLogInUser();
    }
  }, [user, setUser, navigate]);

  return user;
};

export default GetLogInUser;
