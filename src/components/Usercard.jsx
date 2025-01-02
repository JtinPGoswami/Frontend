import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router";
import Spinner from "../utils/Spinner"; // Import Spinner
import { toast } from "react-toastify";

const Usercard = ({ user, deleteUserCallback }) => {
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const { setSelectedUser } = useUser();

  const handleButtonClick = (user) => {
    setSelectedUser(user._id);
    navigate("/listed/room");
  };
  const handleDeleteButtonClick = () => {
    setConfirmation(true);
    setSelectedUser(user._id);
  };

  const deleteUser = async () => {
    setLoading(true); // Set loading to true when starting the delete operation
    setConfirmation(false);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/admin/delete/user`,
        { userId: user._id },
        { withCredentials: true }
      );
      toast.info("user deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
      deleteUserCallback(user._id); // Update the parent component
    } catch (error) {
      console.log("error while deleting user ", error);
    } finally {
      setLoading(false); // Set loading to false when the operation is complete
    }
  };

  return (
    <div className="relative flex-grow flex border rounded-lg shadow-lg overflow-hidden w-96 h-72 bg-primary-foreground">
      {/* Show spinner if loading */}
      {loading ? (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <Spinner />
        </div>
      ) : null}

      {/* Left Section */}
      <div className="flex flex-col items-center justify-evenly w-2/5 bg-muted p-4">
        <img
          src={user.ProfilePic}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        {user.role === "landlord" && (
          <button
            onClick={() => handleButtonClick(user)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Listed Rooms
          </button>
        )}
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center p-4 w-2/3">
        <h2 className="text-lg font-bold">{user.name}</h2>
        <div className="mt-5 flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm texx-card-foreground">Username:</p>
            <p className="text-sm texx-card-foreground">{user.username}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm texx-card-foreground">Email: </p>
            <p className="text-sm text-card-foreground"> {user.email}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm texx-card-foreground">Role: </p>
            <p className="text-sm texx-card-foreground">{user.role}</p>
          </div>
        </div>
      </div>

      {!confirmation ? (
        <button
          className="absolute right-5 top-3 bg-transparent text-red-500"
          title="delete user"
          onClick={handleDeleteButtonClick}
        >
          <img className="w-6 h-6" src="userDelete.svg" alt="delete user" />
        </button>
      ) : (
        <button
          className="absolute right-5 top-3 border border-gray-400 py-1 px-2 bg-red-600 active:scale-105 text-primary rounded-lg mt-4 scale-75 opacity-100 transition-all duration-500 ease-out"
          onClick={deleteUser}
        >
          Delete The User
        </button>
      )}
    </div>
  );
};

export default Usercard;
