import React, { useEffect, useState } from "react";
import RoomCard from "../components/rooms/RoomCard";
import axios from "axios";
import Spinner from "../utils/Spinner";

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
        setRooms(response.data.data);
      } catch (error) {
        console.error("Error while fetching rooms: ", error);
      } finally {
        setLoading(false);
      }
    };

    getAllListedRooms();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : rooms.length > 0 ? (
        rooms.map((room) => <RoomCard key={room._id} room={room} />)
      ) : (
        <p>No rooms available.</p>
      )}
    </>
  );
};

export default Room;
