import axios from "axios";
import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";
import ResendVerificationButton from "./ResendEmail";
import { toast } from "react-toastify";

const OTPInput = () => {
  const location = useLocation();
  const formData = location.state;
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = Array(6).fill("");

    pasteData.forEach((char, index) => {
      if (/^\d$/.test(char)) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);

    // Focus the next empty input field
    const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
    inputRefs.current[nextIndex]?.focus();
  };
  const [loading, setLoading] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const handleSubmit = async () => {
    const inputOtp = otp.join("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API_URI}/verify/email`,
        { inputOtp },
        { withCredentials: true }
      );
      setIsVerify(true);
      navigate("/login");
      toast.success("Verification success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
    } catch (error) {
      setMessage(error.response.data.message);
      toast.error(error.response.data.message, {
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
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className=" my-36  flex flex-col gap-y-5 justify-center items-center xl:w-[30%] lg:w-[40%] md:w-[50%] sm:w-[60%] w-full sm:h-80 h-[50%] border border-gray-400 rounded-lg mx-auto">
          <h3 className="text-primary text-2xl font-bold ">
            Verify Your Email
          </h3>
          <p className="text-sm text-muted-foreground">
            check spam folder in your email if not found email
          </p>
          <div className="flex gap-2 mb-4" onPaste={handlePaste}>
            {otp.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="w-10 h-10 border border-gray-300 text-center text-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-primary bg-background"
              />
            ))}
          </div>
          <div className="w-4/5 mx-auto flex sm:flex-row flex-col  justify-center  sm:gap-4 gap-y-4 items-center">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
            <ResendVerificationButton formData={formData} />
          </div>

          <Link className="float-end" to="/login">
            go to login
          </Link>
          {message && (
            <p className="text-red-500 text-center text-base">{message}</p>
          )}
        </div>
      )}
    </>
  );
};

export default OTPInput;
