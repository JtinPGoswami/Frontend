import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useListedRooms = (userId) => {
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

    fetchRooms();
  }, [userId]);

  return { rooms, loading };
};

export { useListedRooms };
