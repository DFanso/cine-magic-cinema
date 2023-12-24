import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./css/ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setPasswordError("");

    if (!password) {
      setPasswordError("Password cannot be empty.");
      passwordRef.current.focus();
      return;
    } else if (!isPasswordStrong(password)) {
      setPasswordError("Password is weak.");
      passwordRef.current.focus();
      setPassword("");
      return;
    } else if (!confirmPassword) {
      setPasswordError("Confirm password cannot be empty.");
      confirmPasswordRef.current.focus(); 
      return;
    } else if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      confirmPasswordRef.current.focus(); 
      setConfirmPassword("");
      return;
    }

    console.log("Password reset successful:", password);
    navigate("/login-container");
  };

  const isPasswordStrong = (password) => {
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  return (
      <div
        className="reset-password"
        style={{
          backgroundImage: "url('/images/Login.jpg')",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h1>Reset Your Password</h1>
          <input
            ref={passwordRef}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordError && <div className="error">{passwordError}</div>}
          <button type="submit">Reset Password</button>
        </form>
      </div>
  );
};

export default ResetPassword;
