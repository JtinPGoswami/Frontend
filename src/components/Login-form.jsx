import React, { useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";

function LoginForm({ className, ...props }) {
  const { setRole, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
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
      const fatch = await axios.post(
        `${import.meta.env.VITE_API_URI}/user/get/user`,
        formData
      );

      if (fatch.data.data.isVerified) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URI}/user/login`,
          formData,
          { withCredentials: true }
        );
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light ",
        });
        localStorage.setItem("role", fatch.data.data.role);
        setRole(fatch.data.data.role);
        setUser(response.data.data.user);
        navigate("/profile");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URI}/user/resend/var/code`,
          formData
        );
        toast.success("Verification Email sent successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light ",
        });
        navigate("/verify/email", { state: formData });
      }
    } catch (error) {
      toast.error("Login failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
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
        <>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="flex flex-col gap-4"></div>
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
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          to={"/forget/pass"}
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <div className=" flex justify-between items-center gap-3">
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
                          className=" cursor-pointer w-5 h-5"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/register"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By clicking continue, you agree to our{" "}
            <Link to="/terms">Terms of Service</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </div>
        </>
      )}
    </div>
  );
}

export default LoginForm;
