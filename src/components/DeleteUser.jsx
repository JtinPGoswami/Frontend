import axios from "axios";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";

const DeleteUser = () => {
  const { selectedUser } = useUser();

  const deleteUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/admin/delete/user`,
        { userId: selectedUser },
        { withCredentials: true }
      );
      toast.success("User deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
    } catch (error) {
      toast.error("Can not delete user", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
      console.log("user deletion failed ", error);
    }
  };

  return (
    <>
      {" "}
      <button
        className="absolute right-5 top-3 border border-gray-400  py-1 px-2 bg-red-600 active:scale-105 text-primary rounded-lg mt-4   scale-75 opacity-100 transition-all duration-500 ease-out"
        onClick={deleteUser}
      >
        Delete The User
      </button>
    </>
  );
};

export default DeleteUser;
