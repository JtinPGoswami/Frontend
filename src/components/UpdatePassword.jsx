import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { BiSolidHide } from "react-icons/bi";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confNewPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confNewPassword: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URI}/user/update/password`,
        password,
        { withCredentials: true }
      );

      toast.success("Your password has been updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/profile");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-background">
          <div className="w-full max-w-md rounded-lg bg-card shadow-md p-8">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              Update Password
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium text-foreground"
                >
                  Old Password
                </label>
                <div className="flex justify-between items-center gap-3 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-ring focus:ring-1 w-full">
                  <input
                    type={showPassword.oldPassword ? "text" : "password"}
                    id="oldPassword"
                    name="oldPassword"
                    value={password.oldPassword}
                    onChange={handleChange}
                    className="bg-transparent outline-none border-none w-full"
                    required
                  />
                  {showPassword.oldPassword ? (
                    <BiSolidHide
                      className="cursor-pointer text-foreground text-lg"
                      onClick={() => togglePasswordVisibility("oldPassword")}
                    />
                  ) : (
                    <FaEye
                      className="cursor-pointer text-foreground text-lg"
                      onClick={() => togglePasswordVisibility("oldPassword")}
                    />
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-foreground"
                >
                  New Password
                </label>
                <div className="flex justify-between items-center gap-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-ring focus:ring-1">
                  <input
                    type={showPassword.newPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={handleChange}
                    className="bg-transparent outline-none border-none w-full"
                    required
                  />
                  {showPassword.newPassword ? (
                    <BiSolidHide
                      className="cursor-pointer text-foreground text-lg"
                      onClick={() => togglePasswordVisibility("newPassword")}
                    />
                  ) : (
                    <FaEye
                      className="cursor-pointer text-foreground text-lg"
                      onClick={() => togglePasswordVisibility("newPassword")}
                    />
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confNewPassword"
                  className="block text-sm font-medium text-foreground"
                >
                  Confirm New Password
                </label>
                <div className="flex justify-between items-center gap-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-ring focus:ring-1">
                  <input
                    type={showPassword.confNewPassword ? "text" : "password"}
                    id="confNewPassword"
                    name="confNewPassword"
                    value={password.confNewPassword}
                    onChange={handleChange}
                    className="bg-transparent outline-none border-none w-full"
                    required
                  />
                  {showPassword.confNewPassword ? (
                    <BiSolidHide
                      className="cursor-pointer text-foreground text-lg"
                      onClick={() =>
                        togglePasswordVisibility("confNewPassword")
                      }
                    />
                  ) : (
                    <FaEye
                      className="cursor-pointer text-foreground text-lg"
                      onClick={() =>
                        togglePasswordVisibility("confNewPassword")
                      }
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Update password
              </button>
            </form>
            <div className="text-center text-sm mt-2">
              <Link to="/profile" className="underline underline-offset-4">
                Back to profile
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
