import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { BiSolidHide } from "react-icons/bi";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    gender: "male",
    profession: "student",
  });
  const [role, setRole] = useState("Explorer");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const apiURI =
      role === "Landlord" ? "/user/register/landlord" : "/user/register/seeker";

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}${apiURI}`,
        formData
      );

      setFormData({
        username: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        age: "",
        gender: "male",
        profession: "student",
      });

      toast.success("Registration successful! Please verify your email.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate("/verify/email", { state: formData });
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.";

      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleToggle = () => {
    setRole((prevRole) => (prevRole === "Explorer" ? "Landlord" : "Explorer"));
    setFormData({
      username: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      age: "",
      gender: "male",
      profession: "student",
    });
  };

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
                <label className="block text-sm font-medium text-foreground">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm focus:ring-ring"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm focus:ring-ring"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm focus:ring-ring"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-md border bg-background px-3 py-2 text-sm focus:ring-ring">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className=" block w-full bg-transparent outline-none border-none "
                    required
                  />
                  {
                    /* <img
                    src={showPassword ? "/openeye.svg" : "/closeeye.svg"}
                    alt="Toggle Password"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer w-5 h-5"
                  /> */
                    showPassword ? (
                      <BiSolidHide className="cursor-pointer text-foreground text-lg"
                      onClick={() => setShowPassword(!showPassword)} />
                    ) : (
                      <FaEye className="cursor-pointer text-foreground text-lg"
                      onClick={() => setShowPassword(!showPassword)} />
                    )
                  }
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm focus:ring-ring"
                  required
                />
              </div>

              {role === "Explorer" && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm focus:ring-ring"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground">
                      Gender
                    </label>
                    <div className="flex items-center space-x-4">
                      {["male", "female", "other"].map((gender) => (
                        <label
                          key={gender}
                          className="inline-flex items-center"
                        >
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
                </>
              )}

              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Explorer</span>
                <button
                  className={`w-12 h-6 rounded-full transition-all focus:outline-none ${
                    role === "Explorer" ? "bg-primary" : "bg-secondary"
                  }`}
                  onClick={handleRoleToggle}
                  type="button"
                >
                  <span
                    className={`block w-4 h-4 bg-slate-700 rounded-full shadow transform transition-transform ${
                      role === "Explorer" ? "translate-x-1" : "translate-x-7"
                    }`}
                  ></span>
                </button>
                <span className="text-sm text-muted-foreground">Landlord</span>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-opacity-90 focus:ring-ring"
              >
                Register
              </button>
            </form>

            <div className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Log In
              </Link>
            </div>
            <div className="text-center text-sm mt-2">
              Admin Register?{" "}
              <Link to="/admin/register" className="underline">
                Admin Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
