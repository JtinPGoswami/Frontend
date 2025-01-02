import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner"; // Import Spinner
import Usercard from "./Usercard.jsx";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true); // Set loading to true when starting the fetch operation
      try {
        const response = await axios.post(
          ` ${import.meta.env.VITE_ADMIN_API_URI}/get/users`,
          {},
          { withCredentials: true }
        );

        setUsers(response.data.data || []);
      } catch (error) {
        console.log("something went wrong while fetching users", error);
      } finally {
        setLoading(false);
      }
    };
    getAllUsers();
  }, []);

  // Handle user deletion in parent component
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
