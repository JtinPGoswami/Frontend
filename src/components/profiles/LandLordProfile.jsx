import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ListedRooms from "../rooms/ListedRoom";
import axios from "axios";
import Spinner from "../../utils/Spinner"; // Adjust the import path based on your folder structure
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import GetLogInUser from "../../utils/GetLogInUser";

const LandLordProfile = ({ user }) => {
  const { setRole, setUser } = useUser();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(user.ProfilePic);
  const [loading, setLoading] = useState(false);
  GetLogInUser();
  useEffect(() => {
    setRole(user.role);
  }, [user.role, setRole]);

  const handleProfilePicUpdate = () => {
    document.getElementById("profilePicInput").click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // Exit if no file is selected

    const formData = new FormData();
    formData.append("profilePic", file); // Match the backend expected key as "file"

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API_URI}/update/profilepic`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.data && response.data.data.newuser.ProfilePic) {
        setProfilePic(response.data.data.newuser.ProfilePic); // Update profile picture state with the new URL
        setUser(response.data.data.newuser);
        toast.success("Profile Pic update successfully ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light ",
        });
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    } finally {
      setLoading(false); // Stop loading in both success and error cases
    }
  };

  const handleNavigation = (e) => {
    if (e.target.innerText === "Listed Rooms") {
      navigate("/listed/room");
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="bg-background flex items-center justify-center">
          <div className="container mx-auto px-6 text-center md:text-left max-w-4xl w-full bg-primary-foreground  shadow-lg rounded-lg p-8">
            <div className="w-[90%] mx-auto flex justify-between items-center">
              <h2 className="text-3xl font-bold  text-primary">Profile</h2>
              <Link
                to="/update/role"
                className="text-blue-400 underline hover:no-underline"
              >
                Be a Room Seeker!
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center md:flex-row md:items-start gap-8">
              {/* Profile Picture with Hover Effect */}
              <div className="flex justify-center relative">
                {/* Profile Picture */}
                <div className="w-32 h-32 rounded-full flex items-center justify-center bg-muted">
                  <img
                    src={
                      profilePic ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0hA1XQ-BQxpGvqm-JrDRXhWDLqczIfze_3Q&s"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                  {/* Hover Effect for Profile Picture */}
                  <div
                    onClick={handleProfilePicUpdate}
                    className="absolute bottom-0 left-0 right-0 w-full h-1/2 bg-gradient-to-t from-transparent to-black rounded-b-full text-center text-white text-sm flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    Update Profile Pic
                  </div>
                </div>
                <input
                  name="profilePic"
                  type="file"
                  id="profilePicInput"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Profile Information */}
              <div className="flex flex-col items-center md:items-start space-y-4 w-full md:w-3/5">
                {[
                  { label: "Name", value: user.name },
                  { label: "Username", value: user.username },
                  { label: "Email", value: user.email },
                  { label: "Phone", value: user.phone },
                ].map(({ label, value }, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between item-center w-full"
                  >
                    <label className="text-sm font-medium text-primary">
                      {label}
                    </label>
                    <p className="text-sm text-primary">{value}</p>
                  </div>
                ))}
                <div className="flex justify-between item-center w-full">
                  <label
                    onClick={handleNavigation}
                    className="text-sm font-medium text-blue-400 hover:text-blue-600 hover:cursor-pointer"
                  >
                    Listed Rooms
                  </label>
                </div>
                <Link to="/list/room" className=" font-medium text-blue-400">
                  List a new Room now
                </Link>
                <div className="flex sm:flex-row flex-col justify-between item-center w-full">
                  <button className=" float-end border border-gray-400 hover:bg-primary hover:text-primary-foreground py-1 px-2 bg-primary-foreground text-primary rounded-lg mt-4">
                    <Link to="/update/password">Update your password</Link>
                  </button>
                  <button className=" float-end border border-gray-400 hover:bg-primary hover:text-primary-foreground py-1 px-2 bg-primary-foreground text-primary rounded-lg mt-4">
                    <Link to="/update/profile">Update your profile</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="container mx-auto px-6 my-8 flex gap-8 justify-evenly">
        <ListedRooms />
      </div>
    </>
  );
};

export default LandLordProfile;
