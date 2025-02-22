import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../../utils/Spinner";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";

const RoomSeekerProfile = ({ user }) => {
  const { setRole, setUser } = useUser();
  const [profilePic, setProfilePic] = useState(user.ProfilePic);
  const [loading, setLoading] = useState(false);

  // ✅ Moved role setting inside useEffect to prevent unnecessary re-renders
  React.useEffect(() => {
    setRole(user.role);
  }, [user.role, setRole]);

  const handleProfilePicUpdate = () => {
    document.getElementById("profilePicInput").click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("profilePic", file);
  
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/user/update/profilepic`,
        formData,
        { withCredentials: true }
      );
  
  
      if (response.data.data && response.data.data.newUser) {
        const updatedUser = response.data.data.newUser;
  
        if (updatedUser.ProfilePic) {
          setProfilePic(updatedUser.ProfilePic);
          setUser((prevUser) => ({ ...prevUser, ProfilePic: updatedUser.ProfilePic }));
  
          toast.success("Profile picture updated successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error("Profile picture updated, but not received in response.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to update profile picture. Try again!");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="bg-background flex items-center justify-center">
          <div className="container mx-auto px-6 text-center md:text-left max-w-4xl w-full bg-primary-foreground shadow-lg rounded-lg p-8">
            <div className="w-[90%] mx-auto flex justify-between items-center">
              <h2 className="text-3xl font-bold text-primary">Profile</h2>
              <Link
                to="/update/role"
                className="text-blue-400 underline text-sm hover:no-underline"
              >
                Become a Landlord!
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center md:flex-row md:items-start gap-8">
              {/* Profile Picture with Hover Effect */}
              <div className="flex justify-center relative">
                <div className="w-32 h-32 rounded-full flex items-center justify-center bg-muted overflow-hidden">
                  <img
                    src={
                      profilePic ||
                      "https://via.placeholder.com/128?text=No+Image"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div
                    onClick={handleProfilePicUpdate}
                    className="absolute bottom-0 left-0 right-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent rounded-b-full text-center text-white text-sm flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    Update Profile Picture
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
                  { label: "Email", value: user.email },
                  { label: "Username", value: user.username },
                  { label: "Phone", value: user.phone },
                  { label: "Gender", value: user.gender },
                  { label: "Age", value: user.age },
                  { label: "Profession", value: user.profession },
                ].map(({ label, value }, idx) => (
                  <div key={idx} className="flex justify-between w-full">
                    <label className="text-sm font-medium text-primary">
                      {label}
                    </label>
                    <p className="text-sm text-primary">{value || "N/A"}</p>
                  </div>
                ))}
                <div className="flex sm:flex-row flex-col justify-between w-full">
                  <Link
                    to="/update/password"
                    className="border border-gray-400 hover:bg-primary hover:text-primary-foreground py-1 px-2 bg-primary-foreground text-primary rounded-lg mt-4 text-center"
                  >
                    Update Password
                  </Link>
                  <Link
                    to="/update/profile"
                    className="border border-gray-400 hover:bg-primary hover:text-primary-foreground py-1 px-2 bg-primary-foreground text-primary rounded-lg mt-4 text-center"
                  >
                    Update Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default RoomSeekerProfile;
