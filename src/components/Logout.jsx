import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

const Logout = () => {
  const { setUser } = useUser();

  const handleLogout = async () => {
    setUser(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/user/logout`,
        {},
        { withCredentials: true }
      );

      if (response?.data?.success) {
        toast.info("User logged out successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.removeItem("role");
        localStorage.removeItem("selectedUser");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button onClick={handleLogout}>
      <img
        className="w-5 h-5"
        src="/logout.svg"
        alt="log out"
        title="log out "
      />
    </button>
  );
};

export default Logout;
