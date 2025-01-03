import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useRoom } from "../../context/RoomContext";
import Spinner from "../../utils/Spinner";
import { toast } from "react-toastify";

function UpdateRoomDetails() {
  const navigate = useNavigate();
  const { selectedRoom } = useRoom();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: selectedRoom.title,
    description: selectedRoom.description,
    location: selectedRoom.location,
    city: selectedRoom.city,
    state: selectedRoom.state,
    address: selectedRoom.address,
    pincode: selectedRoom.pincode,
    suitableFor: selectedRoom.suitableFor,
    people: selectedRoom.people,
    rent: selectedRoom.rent,
    advance: selectedRoom.advance,
    discount: selectedRoom.discount,
    features: selectedRoom.features,
    phone: selectedRoom.phone,
    availability: selectedRoom.availability,
    _id: selectedRoom._id,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(
        ` ${import.meta.env.VITE_API_URI}/user/update/room`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success("Room updated successfully ", {
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
    } catch (error) {
      toast.error("Room update fail ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light ",
      });
      console.error("Error updating room:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex lg:w-1/2 md:w-3/4 w-[90%] mx-auto min-h-screen bg-background ">
          <div className="w-full rounded-lg bg-card shadow-md p-8">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              List a Room
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-base font-medium text-foreground"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Room title"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-base font-medium text-foreground"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the room"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1 resize-none"
                  rows="4"
                  required
                />
              </div>
              {/* Location */}
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-base font-medium text-foreground"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                  required
                />
              </div>

              {/* City and State */}
              <div className="grid grid-cols-2 gap-10 mb-4">
                <div>
                  <label
                    htmlFor="city"
                    className="text-base font-medium text-foreground"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="text-base font-medium text-foreground"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-base font-medium text-foreground"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                />
              </div>

              {/* Pincode */}
              <div className="mb-4">
                <label
                  htmlFor="pincode"
                  className="block text-base font-medium text-foreground"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                  required
                />
              </div>

              {/* Suitable For */}
              <div className="mb-4">
                <label
                  htmlFor="suitableFor"
                  className="block text-base font-medium text-foreground"
                >
                  Suitable For
                </label>
                <select
                  id="suitableFor"
                  name="suitableFor"
                  value={formData.suitableFor}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                >
                  <option value="student">Students</option>
                  <option value="girls">Girls</option>
                  <option value="boys">Boys</option>
                  <option value="family">Family</option>
                  <option value="all">All</option>
                </select>
              </div>
              {/* people */}
              <div className="mb-4">
                <label
                  htmlFor="people"
                  className="block text-base font-medium text-foreground"
                >
                  How many people can live at a time
                </label>
                <input
                  type="text"
                  id="people"
                  name="people"
                  value={formData.people}
                  onChange={handleChange}
                  placeholder="People"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                  required
                />
              </div>
              {/* Rent */}
              <div className="mb-4">
                <label
                  htmlFor="rent"
                  className="block text-base font-medium text-foreground"
                >
                  Rent (₹)
                </label>
                <input
                  type="number"
                  id="rent"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  placeholder="Rent amount"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                  required
                />
              </div>

              {/* Advance */}
              <div className="mb-4">
                <label
                  htmlFor="advance"
                  className="block text-base font-medium text-foreground"
                >
                  Advance (₹)
                </label>
                <input
                  type="number"
                  id="advance"
                  name="advance"
                  value={formData.advance}
                  onChange={handleChange}
                  placeholder="Advance amount"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                />
              </div>

              {/* Discount */}
              <div className="mb-4">
                <label
                  htmlFor="discount"
                  className="block text-base font-medium text-foreground"
                >
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="Discount percentage"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                  min="0"
                  max="100"
                />
              </div>
              {/* Phone */}
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-base font-medium text-foreground"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="phone number"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                />
              </div>

              {/* Features */}
              <div className="mb-4">
                <label
                  htmlFor="features"
                  className="block text-base font-medium text-foreground"
                >
                  Features
                </label>
                <input
                  type="text"
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Features (comma separated)"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-4 text-base focus:outline-none focus:ring-ring focus:ring-1"
                />
              </div>

              {/* Availability */}
              <div className="mb-4 flex gap-4">
                <label
                  htmlFor="availability"
                  className="block text-base font-medium text-foreground"
                >
                  Available
                </label>
                <input
                  type="checkbox"
                  id="availability"
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                  className="mt-1 rounded-md border border-input bg-background p-2 text-base"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-4 text-primary-foreground hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                List Room
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateRoomDetails;
