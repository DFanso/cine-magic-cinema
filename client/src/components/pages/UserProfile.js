import React, { useState } from "react";
import "../css/UserProfile.css";
import UserInformationComponent from "../UserInformationComponent";
import BookingHistory from "../BookingHistory";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [activeSection, setActiveSection] = useState("userProfile");
  const navigate = useNavigate();

  const showSection = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => { 
    navigate("/"); 
  };

  return (
    <div className="user-profile">
      <div className="user-profile-links">
        <button onClick={() => showSection("userProfile")}>User Profile</button>
        <button onClick={() => showSection("bookingHistory")}>
          Booking History
        </button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      {activeSection === "userProfile" && <UserInformationComponent />}
      {activeSection === "bookingHistory" && <BookingHistory />}
    </div>
  );
}

export default UserProfile;
