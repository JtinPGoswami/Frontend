import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ResendPasswordVerificationButton = ({ formData }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleResendClick = async () => {
    setIsDisabled(true);
    setTimer(60);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URI}/user/send/pass/code`,
        formData
      );
      toast.success("Verification email resent!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to resend verification email. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  useEffect(() => {
    let interval;
    if (isDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isDisabled]);

  return (
    <div className="flex flex-col items-center">
      {!isDisabled && (
        <button
          onClick={handleResendClick}
          disabled={isDisabled}
          className={`sm:px-4 px-2 sm:py-2 py-1 text-white sm:text-sm text-xs font-semibold rounded-lg ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isDisabled ? "Resend Disabled" : "Resend Verification Email"}
        </button>
      )}
      {isDisabled && (
        <p className="mt-2 text-sm text-gray-600">
          You can resend the email in {timer} seconds.
        </p>
      )}
    </div>
  );
};

export default ResendPasswordVerificationButton;
