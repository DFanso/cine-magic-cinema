import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "../css/Login.css";
import { useNavigate, Link } from "react-router-dom";

import { TailSpin } from "react-loader-spinner";
import { useUserContext } from "./auth/UserContext";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate hook for navigation
  const { isLoading, setLoading } = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_PATH}/auth/admin/signup`,
        {
          firstName,
          lastName,
          password,
          email,
        }
      );
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your account has been created successfully!",
      }).then(() => {
        navigate("/"); // Navigate to login page
      });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className={`login-wrapper ${isLoading ? "blurred" : ""}`}>
      {isLoading && (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      )}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Register</h1>
          <div className="form-group">
            <label className="label-name">First Name:</label>
            <br />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label-name">Last Name:</label>
            <br />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label-name">Email:</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="login-btn-div">
            <button type="submit" className="login-button">
              Register
            </button>
          </div>
          <Link to="/login">
            <p className="reg-link">Already have an account? Login</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
