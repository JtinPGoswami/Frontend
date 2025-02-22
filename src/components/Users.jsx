import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../utils/Spinner";
import Usercard from "./Usercard.jsx";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URI}/admin/get/users`,
          {},
          { withCredentials: true }
        );

        setUsers(response.data.data || []);
      } catch (error) {
        toast.error(`Error fetching users: ${error.response?.data?.message || "Something went wrong!"}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setLoading(false);
      }
    };
    getAllUsers();
  }, []);

  const deleteUserCallback = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  return (
    <>
      {/* Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <Spinner />
        </div>
      )}

      <div className="flex flex-wrap justify-between items-center gap-2 gap-y-4 w-5/6 mx-auto">
        {Array.isArray(users) &&
          users.map((user) => (
            <Usercard
              key={user._id}
              user={user}
              deleteUserCallback={deleteUserCallback}
            />
          ))}
      </div>
    </>
  );
};

export default Users;
