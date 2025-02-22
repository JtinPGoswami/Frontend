import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import Spinner from "../utils/Spinner";
import { toast } from "react-toastify";

const updateUser = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name,
    email: user.email,
    phone: user.phone,
    age: user.age || "",
    gender: user.gender || "",
    profession: user.profession || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        age: user.age || "",
        gender: user.gender || "",
        profession: user.profession || "",
      });
    }
  }, [user]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URI}/user/update/user`,
        formData,
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message || "Profile update successful!");
      setUser(response.data.data);
  
      toast.success("Profile update successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/profile");
    } catch (error) {  
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      setMessage(errorMessage);
  
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-background">
          <div className="w-full max-w-md rounded-lg bg-card shadow-md p-8">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              Update Profile Information
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-foreground"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-ring focus:ring-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-ring focus:ring-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-ring focus:ring-1"
                  required
                />
              </div>
              {!user.role === "admin" && (
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-ring focus:ring-1"
                    required
                  />
                </div>
              )}
              {user.role === "seeker" && (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-foreground"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-ring focus:ring-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground">
                      Gender
                    </label>
                    <div className="flex items-center space-x-4">
                      {[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ].map((gender) => (
                        <label
                          key={gender.value}
                          className="inline-flex items-center"
                        >
                          <input
                            type="radio"
                            name="gender"
                            value={gender.value}
                            checked={formData.gender === gender.value}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {gender.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="profession"
                      className="block text-sm font-medium text-foreground"
                    >
                      Profession
                    </label>
                    <select
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-ring focus:ring-1"
                    >
                      <option value="student">Student</option>
                      <option value="professional">Professional</option>
                      <option value="family">Family</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Update Profile
              </button>
            </form>
            <div className="text-center text-sm mt-2">
              <Link to="/profile" className="underline underline-offset-4">
                Back to profile
              </Link>
            </div>
            {message && (
              <p
                className={`mt-4 text-center text-sm ${
                  message.includes("successful")
                    ? "text-success"
                    : "text-destructive"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default updateUser;
