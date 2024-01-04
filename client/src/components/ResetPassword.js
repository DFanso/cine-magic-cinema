import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "./css/ResetPassword.css";

import { TailSpin } from "react-loader-spinner";
import { useLoading } from "./LoadingContext.js";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const otpRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (!timeLeft) {
      Swal.fire({
        title: "Time's up",
        text: "You ran out of time to reset your password",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Retry",
        cancelButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          requestNewOTP();
        } else {
          navigate("/login-container");
        }
      });
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, navigate]);

  const requestNewOTP = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_API_PATH}/auth/password-reset-request`,
        { email }
      );
      setLoading(false);
      Swal.fire(
        "OTP Sent",
        "A new OTP has been sent to your email.",
        "success"
      );
      setTimeLeft(300); // Reset timer
    } catch (error) {
      Swal.fire("Error", "There was a problem requesting a new OTP.", "error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      confirmPasswordRef.current.focus();
      return;
    }

    if (!isPasswordStrong(password)) {
      setError("Password is not strong enough.");
      passwordRef.current.focus();
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PATH}/auth/reset-password`,
        {
          otp,
          newPassword: password,
        }
      );
      Swal.fire("Success", "Password has been reset successfully.", "success");
      navigate("/login-container");
    } catch (error) {
      Swal.fire(
        "Error",
        "There was a problem resetting the password.",
        "error"
      );
    }
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
    <div className={`login-wrapper ${loading ? "blurred" : ""}`}>
      {loading && (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      )}
      <div
        className="reset-password"
        style={{
          backgroundImage: "url('/images/Login.jpg')",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h1>Reset Your Password</h1>
          <div className="timer">
            Time remaining to reset password: {Math.floor(timeLeft / 60)}:
            {("0" + (timeLeft % 60)).slice(-2)}
          </div>
          <input
            ref={otpRef}
            type="text"
            placeholder="OTP Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
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
          {error && <div className="error">{error}</div>}
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
