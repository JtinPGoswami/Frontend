import React, { useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";
import { toast } from "react-toastify";
import ResendPasswordVerificationButton from "./ResendPassVerCode";

function ForgetPass({ className, ...props }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confPassword: "",
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [sendmail, setSendmail] = useState(false);
  const [massage, setMassage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error message on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    if (formData.password !== formData.confPassword) {
      newErrors.confPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URI}/user/verify/pass/code`,
        formData,
        { withCredentials: true }
      );
      toast.success("Password changed successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
      navigate("/login");
    } catch (error) {
      setMassage(error.response?.data.message);
      toast.error("password change failed", {
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
      setLoading(false);
    }
  };

  const handleSendMail = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URI}/user/send/pass/code`,
        formData,
        { withCredentials: true }
      );
      toast.success("Verification email send successfully ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
      setSendmail(true);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while sending mail ", {
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
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "lg:w-1/3 md:w-4/5 w-[90%] mx-auto flex flex-col gap-6",
        className
      )}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="flex justify-between items-center gap-3">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <img
                      src={showPassword ? "/openeye.svg" : "/closeeye.svg"}
                      alt="Toggle Password Visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer w-5 h-5"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confPassword">Confirm Password</Label>
                  <Input
                    id="confPassword"
                    name="confPassword"
                    type="text"
                    value={formData.confPassword}
                    onChange={handleChange}
                    required
                  />
                  {errors.confPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confPassword}
                    </p>
                  )}
                </div>
                {sendmail && (
                  <div className="grid gap-2">
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                      id="otp"
                      name="otp"
                      type="text"
                      value={formData.otp}
                      onChange={handleChange}
                      min="100000"
                      max="999999"
                      required
                    />
                  </div>
                )}
                {sendmail ? (
                  <div className="w-4/5 mb-2  mx-auto flex  flex-col justify-center gap-y-4 items-center">
                    <Button onClick={handleSubmit} className="w-full">
                      Change Password
                    </Button>
                    <ResendPasswordVerificationButton formData={formData} />
                  </div>
                ) : (
                  <div className="w-4/5 mb-2  mx-auto flex  flex-col justify-center gap-y-4 items-center">
                    <Button onClick={handleSendMail} className="w-full">
                      Send OTP
                    </Button>
                  </div>
                )}
              </div>
              {massage && (
                <p className="text-sm text-red-500 text-center">{massage}</p>
              )}
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
export default ForgetPass;
