import React, { useState } from "react";
import { useRoom } from "../../context/RoomContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";

const DeleteRoomByAdmin = () => {
  const navigate = useNavigate();
  const { selectedRoom } = useRoom();
  const roomId = selectedRoom._id;
  const [message, setmessage] = useState("");
  const [getmessage, setGetmessage] = useState(false);

  const userId = selectedRoom.ownerID;
  const getDeletionmessage = () => {
    setGetmessage(!getmessage);
  };

  const handleChange = (e) => {
    setmessage(e.target.value);
  };
  const handleDeletion = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ADMIN_API_URI}/delete/room`,
        { roomId, message, userId },
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
      navigate("/rooms");
    } catch (error) {
      console.log("error while deleting the room :", error);
      toast.error("Room  deletion failed ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
    }
  };

  return (
    <>
      {!getmessage && (
        <button
          className="  float-end border border-gray-400  py-1 px-2 bg-red-600 active:scale-105 text-primary rounded-lg mt-5"
          onClick={getDeletionmessage}
        >
          Delete The Room
        </button>
      )}
      {getmessage && (
        <div className="mt-5">
          <label
            htmlFor="message"
            className="block text-base font-medium text-foreground"
          >
            Why deleting
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={handleChange}
            placeholder="Why deleting the room"
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1 resize-none"
            rows="4"
            required
          />
          <button
            className="float-end border border-gray-400  py-1 px-2 bg-red-600 active:scale-105 text-primary rounded-lg mt-4"
            onClick={handleDeletion}
          >
            Delete The Room
          </button>
        </div>
      )}
    </>
  );
};

export default DeleteRoomByAdmin;
