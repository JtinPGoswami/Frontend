import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LandLordCard = ({ landlord }) => {
  const navigate = useNavigate();
  const { setSelectedUser } = useUser();
  const handleButtonClick = () => {
    navigate("/listed/room");
    setSelectedUser(landlord);
  };

  return (
    <div className="relative  flex-shrink-0x flex md:flex-row flex-col flex-grow border rounded-lg shadow-lg overflow-hidden md:w-96 md:h-72 min-w-80 h-auto bg-primary-foreground">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-evenly md:w-2/5 w-full gap-y-5 bg-muted p-4">
        <img
          src={landlord.ProfilePic}
          alt="Profile"
          className="md:w-16 w-24 md:h-16 h-24 rounded-full object-cover"
        />
        {landlord.role === "landlord" && (
          <button
            onClick={() => handleButtonClick(landlord)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Listed Rooms
          </button>
        )}
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center p-4 md:w-2/3 w-full">
        <h2 className="text-lg font-bold">{landlord.name}</h2>
        <div className="mt-5 flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm texx-card-foreground">Landlord Name:</p>
            <p className="text-sm texx-card-foreground">{landlord.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm texx-card-foreground">Email: </p>
            <p className="text-sm text-card-foreground">{landlord.email}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm texx-card-foreground">Role: </p>
            <p className="text-sm texx-card-foreground">{landlord.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandLordCard;
