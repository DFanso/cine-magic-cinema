import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { UserContext } from "./auth/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext); // Use the context to set user data

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Authenticate user
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_API_PATH}/auth/signin`,
        { email: username, password }
      );

      const token = loginResponse.data.accessToken;
      // Fetch user profile
      const profileResponse = await axios.get(
        `${process.env.REACT_APP_API_PATH}/users/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(profileResponse);
      const userData = profileResponse.data; // User data from profile response

      if (userData && userData.type === "ADMIN") {
        localStorage.setItem("admin-token", token); // Store the token
        updateUserData(userData); // Update user data in context

        window.location.reload(); // Navigate to the admin dashboard
      } else {
        navigate("/");
        Swal.fire({
          title: "Access Denied",
          text: "You are not authorized to access the admin panel.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire({
        title: "Login Failed",
        text: "Invalid username or password.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        <div className="form-group">
          <label className="label-name">Email:</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label-name">Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="log-reg-con">
          <div className="login-btn-div">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>

          <Link to="/register-page" className="btn-link">
            <p className="reg-link">Register</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
