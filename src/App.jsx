import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./components/Login-form";
import Register from "./components/Register";
import RoomDetails from "./components/RoomDeatils";
import { ThemeProvider } from "./components/theme-provider";
import UpdatePassword from "./components/UpdatePassword";
import UpdateUsers from "./components/UpdateUser";
import Users from "./components/Users";
import ListedRooms from "./components/rooms/ListedRoom";
import Profile from "./components/profiles/Profile";
import Room from "./pages/Room";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { UserProvider } from "./context/UserContext";
import { RoomProvider } from "./context/RoomContext";
import TermsAndCondition from "./pages/TermsAndConditions";
import Privacypolicy from "./pages/PrivacyPolicy";
import OtpInput from "./components/OtpInput";
import {
  PrivateRouteLandlord,
  PrivateRouteLogIn,
  PrivateRouteLogOut,
} from "./utils/PrivateRoute";
import UpdateUserRole from "./components/updateUserRole";
import ListedRoomForm, { ListRoomForm } from "./components/rooms/ListRoom";
import { ToastContainer } from "react-toastify";
import ForgetPass from "./components/ForgetPass";
import LandLords from "./components/LandLords";
function App() {
  return (
    <UserProvider>
      <RoomProvider>
        <ThemeProvider>
          <ToastContainer />
          <Router>
            <Header />
            <main className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/login"
                  element={<PrivateRouteLogOut element={<LoginForm />} />}
                />
                <Route
                  path="/update/role"
                  element={<PrivateRouteLogIn element={<UpdateUserRole />} />}
                />

                <Route
                  path="/register"
                  element={<PrivateRouteLogOut element={<Register />} />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/listed/room"
                  element={<PrivateRouteLogIn element={<ListedRooms />} />}
                />
                <Route
                  path="/profile"
                  element={<PrivateRouteLogIn element={<Profile />} />}
                />
                <Route path="/verify/email" element={<OtpInput />} />
                <Route
                  path="/users"
                  element={<PrivateRouteLogIn element={<Users />} />}
                />
                <Route
                  path="/rooms"
                  element={<PrivateRouteLogIn element={<Room />} />}
                />
                <Route
                  path="/room/details"
                  element={<PrivateRouteLogIn element={<RoomDetails />} />}
                />
                <Route
                  path="/update/password"
                  element={<PrivateRouteLogIn element={<UpdatePassword />} />}
                />
                <Route
                  path="/update/profile"
                  element={<PrivateRouteLogIn element={<UpdateUsers />} />}
                />
                <Route path="/terms" element={<TermsAndCondition />} />
                <Route path="/privacy" element={<Privacypolicy />} />
                <Route
                  path="/list/room"
                  element={<PrivateRouteLandlord element={<ListRoomForm />} />}
                />
                <Route
                  path="/forget/pass"
                  element={<PrivateRouteLogOut element={<ForgetPass />} />}
                />
                <Route
                  path="/landlords"
                  element={<PrivateRouteLogIn element={<LandLords />} />}
                />
              </Routes>
            </main>
            <Footer />
          </Router>
        </ThemeProvider>
      </RoomProvider>
    </UserProvider>
  );
}

export default App;
