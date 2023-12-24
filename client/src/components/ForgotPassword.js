import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./css/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      emailRef.current.focus();
      setEmail("");
      return;
    }

    console.log("Request to reset password sent for email:", email);

    setEmail("");
    setMessage(
      "If your email is registered, you will receive a password reset code."
    );

    navigate("/reset-code"); 
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
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
        {message && <div>{message}</div>}
      </div>
  );
};

export default ForgotPassword;
