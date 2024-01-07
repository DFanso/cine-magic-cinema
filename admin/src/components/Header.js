import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { UserContext } from "../pages/auth/UserContext";
const Header = () => {
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext);

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
        updateUserData({});
        localStorage.removeItem("admin-token");
        navigate("/");
      }
    });
  };
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        height: "65px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <a style={{
        color: "white",
        textDecoration: "none",
      }} href="/movies-view"><span>CINEMAGIC</span></a>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#f0f0f0",
          color: "black",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
