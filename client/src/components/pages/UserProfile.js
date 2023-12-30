import React, { useState, useContext } from "react";
import "../css/UserProfile.css";
import UserInformationComponent from "../UserInformationComponent";
import BookingHistory from "../BookingHistory";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions";

function UserProfile() {
  const [activeSection, setActiveSection] = useState("userProfile");
  const navigate = useNavigate();
  // Inside your logout function
  const dispatch = useDispatch();
  // After logging out
  // Access the UserContext
  const { setUserData } = useContext(UserContext);

  const showSection = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    // Clear user data in the context
    setUserData({});

    // Remove token from localStorage (if needed)
    localStorage.removeItem("token");
    // Inside your logout function

    // After logging out
    dispatch(logout());
    // Redirect to the home page or login page
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
