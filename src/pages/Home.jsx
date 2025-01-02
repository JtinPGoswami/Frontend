import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import RoomCard from "../components/rooms/RoomCard";
import axios from "axios";
import Spinner from "../utils/Spinner";
import LandLordCard from "../components/LandLordCard";
import { Swiper, SwiperSlide } from "swiper/react";
import Contect from "./Contact";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [LandLords, setLandLords] = useState([]);

  useEffect(() => {
    const getAllListedRooms = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_USER_API_URI}/get/all/rooms`
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
  useEffect(() => {
    const getLandLords = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          ` ${import.meta.env.VITE_USER_API_URI}/get/landlords`
        );
        setLandLords(response.data.data);
      } catch (error) {
        console.log("Error while fetching LandLords");
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
        <>
          <Hero />
          <div className="xl:w-4/5 lg:w-5/6 md:w-[90%] w-[95%] mx-auto rounded-lg py-3">
            <h3 className="text-center py-3 text-3xl font-medium">
              Listed Rooms
            </h3>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper flex justify-center items-center "
            >
              <div className="h-[550px]">
                {rooms &&
                  rooms.map((room) => (
                    <SwiperSlide key={room._id}>
                      <RoomCard room={room} />
                    </SwiperSlide>
                  ))}
              </div>
            </Swiper>
          </div>
          <div className=" w-[90%] mx-auto md:mt-20 sm:mt-14 mt-10">
            <h3 className="text-primary md:text-3xl sm:text-2xl text-lg font-bold text-center mb-6">
              Landlords on Room On Rent
            </h3>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                770: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 60,
                },
              }}
              modules={[Pagination, Autoplay]}
              className="mySwiper flex justify-center items-center "
            >
              {LandLords &&
                LandLords.map((landlord) => (
                  <SwiperSlide
                    key={landlord._id}
                    className="flex justify-center items-center"
                  >
                    {" "}
                    <LandLordCard landlord={landlord} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </>
      )}
      <Contect />
    </>
  );
};

export default Home;
