import React, { useState } from "react";
import { toast } from "react-toastify";

const RoomBookingOpt = ({ Room, seeker }) => {
  const phone = Room.owner.phone;
  const landlordEmail = Room.owner.email;
  const roomName = Room.title;

  const seekerName = seeker.name;
  const seekerContact = seeker.phone;

  const [getmessage, setGetmessage] = useState(false);

  const getDeletionmessage = () => {
    setGetmessage(true);
  };

  const handleDeletion = () => {
    setGetmessage(false);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(phone)
      .then(() => {
        toast.success("Phone Number copied to clipboard!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error("Failed to copy phone number!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  

  const subject = `Inquiry Regarding Listed Room: ${roomName}`;
  const body = `Dear Landlord,

I hope you're doing well. I’m interested in the room titled '${roomName}' listed on Room on Rent website.

I would like to know more about the following:
- Facilities provided (e.g., furnishings, utilities, internet, etc.)
- Nearby amenities such as grocery stores, public transport, etc.
- Any specific rules or policies for tenants

Looking forward to your response so I can proceed further.

Thank you,
${seekerName}
${seekerContact}`;

  const mailtoLink = `mailto:${landlordEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <>
      {!getmessage && (
        <button
          className="float-end border border-gray-400 py-1 px-2 bg-primary-foreground active:scale-105 text-primary rounded-lg mt-5"
          onClick={getDeletionmessage}
        >
          Send Enquiry
        </button>
      )}
      {getmessage && (
        <div className="float-end mt-10 h-40 w-72 rounded-lg relative border border-gray-400 bg-background flex justify-evenly items-center">
          {/* WhatsApp link */}
          <a
            href={`http://wa.me/91${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 active:scale-105 rounded-lg bg-[#25D366]"
          >
            <img className="w-5 h-5" src="/whatsapp.svg" alt="WhatsApp" />
          </a>

          {/* Email link */}
          <a
            href={mailtoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 active:scale-105 rounded-lg bg-[#0a638e]"
          >
            <img className="w-5 h-5" src="/email.svg" alt="Email" />
          </a>

          {/* Call button */}
          <button
            className="p-2 active:scale-105 rounded-lg bg-[#009688]"
            onClick={handleCopy}
          >
            <img className="w-5 h-5" src="/phone.svg" alt="Call" />
          </button>

          {/* Close button */}
          <button
            className="absolute right-5 top-3 p-2 active:scale-105 rounded-lg"
            onClick={handleDeletion}
          >
            <img className="w-5 h-5" src="/cross.svg" alt="Close" />
          </button>
        </div>
      )}
    </>
  );
};

export default RoomBookingOpt;
