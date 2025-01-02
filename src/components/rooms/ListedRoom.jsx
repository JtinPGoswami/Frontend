import React from "react";
import { Link } from "react-router-dom";
import { useListedRoom, useListedRoomByUser } from "../../utils/getListedRoom";
import { useRoom } from "../../context/RoomContext";
import { useUser } from "../../context/UserContext";

const ListedRooms = () => {
  const { setSelectedRoom } = useRoom();
  const { role, user, selectedUser } = useUser();

  const { rooms, loading } =
    role === "landlord" && user.rooms?.length > 0 // Fetch only if landlord has at least one room
      ? useListedRoom(user?._id)
      : role !== "landlord"
      ? useListedRoomByUser(selectedUser)
      : { rooms: [], loading: false }; // Fallback for landlords with no rooms

  if (loading) {
    return (
      <p className="text-lg text-muted-foreground mt-4">Loading rooms...</p>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-primary">Rooms Added</h3>
      {rooms.length === 0 ? (
        <p className="text-lg text-muted-foreground mt-4">
          No rooms added yet.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room._id} className="p-4 border rounded-lg shadow-md">
              <img
                src={room.photos[0] || "https://via.placeholder.com/150"}
                alt={room.title}
                className="w-full h-52 object-cover rounded-lg"
              />
              <h4 className="mt-4 text-lg font-semibold text-primary">
                {room.title}
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                {room.description}
              </p>
              <div className="mt-4 w-full flex justify-between items-center">
                <p className="text-lg text-primary">Rent: ${room.rent}/month</p>
                <Link
                  to="/room/details"
                  onClick={() => setSelectedRoom(room)}
                  className="text-base text-blue-500 hover:underline active:text-blue-700 text-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ListedRooms;
