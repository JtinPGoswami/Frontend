import React from "react";
import { useRoom } from "../../context/RoomContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteRoom = () => {
  const navigate = useNavigate();
  const { selectedRoom } = useRoom();
  const roomId = selectedRoom._id;
  const handleDeletion = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API_URI}/delete/room`,
        { roomId },
        { withCredentials: true }
      );
      toast.success("Room deleted successfully ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
      navigate("/listed/room");
    } catch (error) {
      toast.error("Room deletion failed ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
      console.log("error while deleting the room :", error);
    }
  };
  return (
    <button
      className="float-end border border-gray-400  py-1 px-2 bg-red-600 active:scale-105 text-primary rounded-lg mt-4"
      onClick={handleDeletion}
    >
      Delete The Room
    </button>
  );
};

export default DeleteRoom;
