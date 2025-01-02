import React from "react";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../context/RoomContext";
const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  const { setSelectedRoom } = useRoom();
  const handleClikc = () => {
    setSelectedRoom(room);
    navigate("/room/details");
  };
  return (
    <div className="flex md:flex-row flex-col items-center bg-background border border-muted rounded-lg shadow-md overflow-hidden mb-8 lg:w-4/5 md:w-5/6 w-[95%] mx-auto">
      {/* Room Image */}
      <div className="lg:w-[400px] md:w-[350px] sm:w-[340px] w-[320px] p-2 ">
        <img
          src={room.photos[0]}
          alt={room.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Room Details */}
      <div className="lg:w-2/3 md:w-1/2 w-[95%] p-6">
        <h3 className="lg:text-xl md:text-lg sm:text-base font-bold text-primary">
          {room.title}
        </h3>
        <p className="mt-2 lg:text-lg text-base text-muted-foreground">{`${room.rent}/month`}</p>
        <p className="mt-4 text-sm text-muted-foreground">{room.description}</p>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handleClikc}
            className=" lg:px-6 md:px-4 px-2 lg:py-3 md:py-2 py-1 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary"
          >
            View Details
          </button>
          <p className="md:text-base text-sm">Owner: {room.owner.name}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
