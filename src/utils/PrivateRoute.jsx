import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRouteLogIn = ({ element, ...rest }) => {
  const { user } = useUser();
  return user ? element : <Navigate to="/login" />;
};
const PrivateRouteLogOut = ({ element, ...rest }) => {
  const { user } = useUser();
  return user ? <Navigate to="/" /> : element;
};
const PrivateRouteAdmin = ({ element, ...rest }) => {
  const { user } = useUser();
  const role = localStorage.getItem("role");
  return user && role === "admin" ? element : <Navigate to="/" />;
};
const PrivateRouteLandlord = ({ element, ...rest }) => {
  const { user } = useUser();
  const role = localStorage.getItem("role");
  return user && role === "landlord" ? element : <Navigate to="/" />;
};

export {
  PrivateRouteAdmin,
  PrivateRouteLandlord,
  PrivateRouteLogIn,
  PrivateRouteLogOut,
};
