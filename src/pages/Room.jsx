import React from "react";
import RoomCard from "../components/rooms/RoomCard";
import Spinner from "../utils/Spinner";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllListedRooms = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URI}/user/get/all/rooms`
        );
        setRooms(response.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch rooms. Please try again!", {
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

    getAllListedRooms();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : rooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-5">
          No rooms available.
        </p>
      )}
    </div>
  );
};

export default Room;
