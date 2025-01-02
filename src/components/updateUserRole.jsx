import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../utils/Spinner";

const UpdateUserRole = () => {
  const { role, setUser } = useUser();
  const navigate = useNavigate();
  const [getOtp, setGetOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0); // Timer state
  const [formData, setFormData] = useState({
    gender: "male",
    age: "",
    profession: "student",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendVerificationEmail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/user/send/role-update/email`,
        {},
        { withCredentials: true }
      );
      setGetOtp(true);
      setTimer(120); // Start a 2-minute timer
      toast.success("Verification email send successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
    } catch (error) {
      console.error(`Failed to send email:`, error);
      toast.error("Failed to send email", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const endpoint =
        role === "landlord"
          ? `${import.meta.env.VITE_API_URI}/user/update/to-seeker`
          : `${import.meta.env.VITE_API_URI}/user/update/to-landlord`;

      const response = await axios.post(endpoint, formData, {
        withCredentials: true,
      });

      toast.success("Role changed successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
      localStorage.removeItem("role");
      localStorage.removeItem("selectedUser");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(`Failed to update role:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black z-50">
          <Spinner />
        </div>
      )}
      <div className="w-full max-w-md rounded-lg bg-card shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Update Role
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <div className="flex justify-between items-center gap-3">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              />
              <img
                src={showPassword ? "/openeye.svg" : "/closeeye.svg"}
                alt="Toggle Password Visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer w-5 h-5"
              />
            </div>
          </div>

          {role === "landlord" && (
            <>
              <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Gender</label>
                <div className="flex items-center space-x-4">
                  {["male", "female", "other"].map((gender) => (
                    <label key={gender} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="profession"
                  className="block text-sm font-medium"
                >
                  Profession
                </label>
                <select
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="" disabled>
                    Select Profession
                  </option>
                  <option value="student">Student</option>
                  <option value="professional">Professional</option>
                  <option value="family">Family</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}
          {getOtp && (
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-medium">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          )}

          {getOtp && timer > 0 ? (
            <p className="text-center text-sm text-gray-600">
              You can resend the email in {timer} seconds.
            </p>
          ) : (
            <button
              onClick={sendVerificationEmail}
              className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground"
              disabled={timer > 0 || isLoading}
            >
              {timer > 0 ? "Please wait..." : "Resend Code"}
            </button>
          )}
          {getOtp && (
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-secondary px-4 py-2 text-secondary-foreground"
              disabled={isLoading}
            >
              Update Role
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateUserRole;
