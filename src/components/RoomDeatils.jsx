import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import UpdateRoomImages from "./rooms/UpdateRoomImages.jsx";
import DeleteRoom from "./rooms/DeleteRoom.jsx";
import DeleteRoomByAdmin from "./rooms/DeleteRoomByAdmin.jsx";
import RoomBookingOpt from "./rooms/RoomBookingOpt.jsx";
import Spinner from "../utils/Spinner.jsx";
import { useRoom } from "../context/RoomContext.jsx";

const RoomDetails = () => {
  const { role, user } = useUser();
  const { selectedRoom } = useRoom();
  if (!selectedRoom) {
    return <Spinner />;
  }

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-6 md:w-4/5 w-[95%]">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 w-full flex-col gap-y-3">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
              className="mySwiper "
            >
              {selectedRoom.photos.map((photo, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={photo}
                    alt={selectedRoom.title}
                    className="w-full h-96 object-cover rounded-lg shadow-lg border border-gray-200 "
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {role === "seeker" && (
              <>
                {(selectedRoom.availability &&
                  user.profession === selectedRoom.suitableFor) ||
                selectedRoom.suitableFor === "all" ? (
                  <RoomBookingOpt Room={selectedRoom} seeker={user} />
                ) : (
                  <div className="text-center rounded-lg mt-5 text-secondry-foreground bg-red-600 p-1">
                    {selectedRoom.availability
                      ? `This room is suitable for ${selectedRoom.suitableFor}`
                      : "This room is not available now"}
                  </div>
                )}
              </>
            )}

            {role === "landlord" && <UpdateRoomImages />}
            {role === "admin" && <DeleteRoomByAdmin />}
          </div>
          <div className="md:w-1/2 w-full ">
            <h2 className="text-3xl font-bold text-primary text-center">
              {selectedRoom.title}
            </h2>
            <p className="mt-6 text-sm text-muted-foreground">
              {selectedRoom.description}
            </p>

            <div className="w-full flex justify-between items-center">
              <p className="mt-2 text-base text-muted-foreground">Rent:</p>
              <p className="mt-2 text-base text-muted-foreground">
                {selectedRoom.rent}/month
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="mt-2 text-base text-muted-foreground">Discount:</p>
              <p className="mt-2 text-base text-muted-foreground">
                {selectedRoom.discount}%
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="mt-2 text-base text-muted-foreground">
                Mo. Number:
              </p>
              <p className="mt-2 text-base text-muted-foreground">
                {selectedRoom.owner.phone}
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="mt-2 text-base text-muted-foreground">
                Final Rent:
              </p>
              <p className="mt-2 text-base text-muted-foreground">
                {selectedRoom.rent -
                  (selectedRoom.rent * selectedRoom.discount) / 100}
                /month
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="mt-2 text-base text-muted-foreground">Advance:</p>
              <p className="mt-2 text-base text-muted-foreground">
                {selectedRoom.advance}Rs.
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="mt-2 text-base text-muted-foreground">
                People allowed
              </p>
              <p className="mt-2 text-base text-muted-foreground">
                {selectedRoom.people} People
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="mt-2 text-base text-muted-foreground">
                Suitable For
              </p>
              <p className="mt-2 text-base text-muted-foreground">
                {selectedRoom.suitableFor}
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="mt-2 text-base text-muted-foreground">Location:</p>
              <p className="mt-2 text-base text-muted-foreground">
                {selectedRoom.location}
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="mt-2 text-base text-muted-foreground">Address:</p>
              <p className="mt-2 text-base text-muted-foreground">
                {selectedRoom.address}
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="mt-2 text-base text-muted-foreground">Pin code:</p>
              <p className="mt-2 text-base text-muted-foreground">
                {selectedRoom.pincode}
              </p>
            </div>
            <div className="mt-4 w-full flex justify-between items-center">
              <p className="text-base text-muted-foreground">Availability:</p>

              {selectedRoom.availability ? (
                <p className="text-green-500 text-base ">Available</p>
              ) : (
                <p className="text-red-500 text-base ">Not Available</p>
              )}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div>
                {" "}
                <h3 className="text-xl font-semibold text-primary">
                  Amenities
                </h3>
                <ul className="list-disc ml-6 mt-4 text-sm text-muted-foreground">
                  {selectedRoom.features?.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
              {role === "landlord" && (
                <div className="flex flex-col gap-y-2">
                  <button className="  border border-gray-400 hover:bg-primary hover:text-primary-foreground py-1 px-2  bg-primary-foreground text-primary rounded-lg ">
                    <Link to="/update/room/details">Update Room details</Link>
                  </button>
                  <DeleteRoom />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
