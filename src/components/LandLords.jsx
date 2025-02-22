import axios from "axios";
import React, { useEffect, useState } from "react";
import LandLordCard from "./LandLordCard";
import Spinner from "../utils/Spinner";
import { toast } from "react-toastify";

const LandLords = () => {
  const [LandLords, setLandLords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLandLords = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URI}/user/get/landlords`
        );
        setLandLords(response.data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Error while fetching landlords. Please try again.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      } finally {
        setLoading(false);
      }
    };
    getLandLords();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="md:w-5/6 w-[90%] mx-auto flex flex-wrap justify-between items-center gap-2 gap-y-2">
          {LandLords.map((landlord) => (
            <LandLordCard key={landlord._id} landlord={landlord} />
          ))}
        </div>
      )}
    </>
  );
};

export default LandLords;
