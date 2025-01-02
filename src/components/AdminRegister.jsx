import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";
import { toast } from "react-toastify";

const AdminRegister = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    adminSecret: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/admin/register`,
        formData
      );
      setFormData({
        username: "",
        name: "",
        email: "",
        password: "",
        adminSecret: "",
      });

      setMessage(response.data.message || "Registration successful!");
      toast.success("Registration successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
      navigate("/verify/email", { state: formData });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-background">
          <div className="w-full max-w-md rounded-lg bg-card shadow-md p-8">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              Register
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
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-ring focus:ring-1"
                    required
                  />
                  <img
                    src={showPassword ? "/openeye.svg" : "/closeeye.svg"}
                    alt="Toggle Password Visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className=" cursor-pointer w-5 h-5"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="adminSecret"
                  className="block text-sm font-medium text-foreground"
                >
                  Admin Secret
                </label>
                <input
                  type="text"
                  id="adminSecret"
                  name="adminSecret"
                  value={formData.adminSecret}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-ring focus:ring-1"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Register
              </button>
            </form>
            <div className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Log In
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

export default AdminRegister;
