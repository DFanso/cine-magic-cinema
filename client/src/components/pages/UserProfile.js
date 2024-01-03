import React, { useState, useContext } from "react";
import "../css/UserProfile.css";
import UserInformationComponent from "../UserInformationComponent";
import BookingHistory from "../BookingHistory";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions";
import Swal from "sweetalert2";
function UserProfile() {
  const [activeSection, setActiveSection] = useState("userProfile");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUserData } = useContext(UserContext);

  const showSection = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        setUserData({});
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
      }
    });
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
