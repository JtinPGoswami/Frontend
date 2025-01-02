import React, { useState } from "react";
import axios from "axios";
import { useRoom } from "../../context/RoomContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateRoomImages = () => {
  const navigate = useNavigate();
  const { selectedRoom } = useRoom();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileSelection = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 5) {
      setErrorMessage("You can only upload a maximum of 5 files.");
      setSelectedFiles([]);
    } else {
      setErrorMessage("");
      setSelectedFiles(files);
      handleUpload(files);
    }
  };

  const handleUpload = async (files) => {
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("roomImages", file));
    formData.append("roomId", selectedRoom._id);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API_URI}/update/room/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success("Images update successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
      navigate("/listed/room");
      setSelectedFiles([]);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to upload images."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      {!selectedFiles.length && (
        <button
          className="float-end border border-gray-400 hover:bg-primary hover:text-primary-foreground py-1 px-2 bg-primary-foreground text-primary rounded-lg mt-4"
          onClick={() => document.getElementById("fileInput").click()}
        >
          Update Images
        </button>
      )}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelection}
        style={{ display: "none" }}
      />
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {selectedFiles.length > 0 && (
        <p className="mt-2">{selectedFiles.length} file(s) selected</p>
      )}
      {selectedFiles.length > 0 && !uploading && (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
          onClick={() => handleUpload(selectedFiles)}
          disabled={uploading}
        >
          Upload Images
        </button>
      )}
      {uploading && <p className="mt-2 text-blue-500">Uploading...</p>}
    </div>
  );
};

export default UpdateRoomImages;
