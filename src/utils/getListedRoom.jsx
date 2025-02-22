import { useEffect, useState } from "react";
import axios from "axios";

const useListedRoom = (ownerID) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ownerID) return;

    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URI}/user/get/landlord/rooms`,
          { userId: ownerID },
          { withCredentials: true }
        );
        setRooms(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [ownerID]);

  return { rooms, loading };
};

const useListedRoomByUser = (userId) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URI}/user/get/landlord/rooms`,
          { userId },
          { withCredentials: true }
        );
        setRooms(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [userId]);

  return { rooms, loading };
};

export { useListedRoom, useListedRoomByUser };
