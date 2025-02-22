import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";

const GetLogInUser = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    const getLogInUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URI}/user/current/user`,
          { withCredentials: true }
        );
        setUser(response.data?.data || null);
      } catch (error) {
        toast.error("Failed to fetch user data. Please log in again!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        if (!user) {
          navigate("/login", { replace: true });
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
