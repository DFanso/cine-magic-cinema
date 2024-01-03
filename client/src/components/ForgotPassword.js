import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./css/ForgotPassword.css";
import axios from "axios";

import { TailSpin } from "react-loader-spinner";
import { useLoading } from "./LoadingContext.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const { loading, setLoading } = useLoading();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      emailRef.current.focus();
      setEmail("");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_PATH}/auth/password-reset-request`,
        { email }
      );
      // Handle the response based on your API's specification

      navigate("/reset-password");
      Swal.fire(
        "Success",
        "OTP request has been sent successfully.",
        "success"
      );
    } catch (error) {
      Swal.fire(
        "Error",
        "There was a problem sending the OTP request.",
        "error"
      );
    } finally {
      setLoading(false);
    }
    setEmail("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={`login-wrapper ${loading ? "blurred" : ""}`}>
      {loading && (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      )}
      <div
        className="forgot-password-container"
        style={{
          backgroundImage: "url('/images/Login.jpg')",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h1>Reset Your Password</h1>
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error">{emailError}</div>}
          <button type="submit">Send Reset Instructions</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
