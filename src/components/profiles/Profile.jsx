import React, { useEffect } from "react";
import LandLordProfile from "./LandLordProfile";
import RoomSeekerProfile from "./RoomSeekerProfile";
import AdminProfile from "./AdminProfile";
import { useUser } from "../../context/UserContext";
import GetLogInUser from "../../utils/GetLogInUser";

const Profile = () => {
  const { user } = useUser();
  GetLogInUser();

  if (user.role === "seeker") {
    return <RoomSeekerProfile user={user} />;
  } else if (user.role === "landlord") {
    return <LandLordProfile user={user} />;
  } else if (user.role === "admin") {
    return <AdminProfile user={user} />;
  } else {
    return <div>User role not recognized.</div>;
  }
};

export default Profile;
