import React, { createContext, useContext, useState, useEffect } from "react";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState(() => {
    const savedRoom = localStorage.getItem("selectedRoom");
    return savedRoom ? JSON.parse(savedRoom) : null;
  });

  useEffect(() => {
    if (selectedRoom) {
      localStorage.setItem("selectedRoom", JSON.stringify(selectedRoom));
    }
  }, [selectedRoom]);

  return (
    <RoomContext.Provider value={{ selectedRoom, setSelectedRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);
