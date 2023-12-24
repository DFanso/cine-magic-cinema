import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./css/OtpRequest.css";

import axios from "axios";

import { TailSpin } from "react-loader-spinner";
import { useLoading } from "./LoadingContext.js";

const OtpRequest = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [otpError, setOtpError] = useState("");
  const otpRef = useRef(null);

  const { loading, setLoading } = useLoading();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpError("");

    if (!otp) {
      setOtpError("OTP cannot be empty.");
      otpRef.current.focus();
      return;
    } else if (!/^\d{4}$/.test(otp)) {
      setOtpError("Invalid OTP format. Please enter a 4-digit OTP.");
      otpRef.current.focus();
      setOtp("");
      return;
    }

    try {
      setLoading(true);
      // Sending OTP for validation
      const response = await axios.post(
        `${process.env.REACT_APP_API_PATH}/auth/otp-validate`,
        {
          code: otp,
        }
      );

      if (response.status === 201) {
        navigate("/login-container"); // Navigate to login page on successful OTP validation
      }
    } catch (error) {
      console.error("OTP validation error", error);
      setOtpError("Invalid OTP. Please try again.");
      otpRef.current.focus();
    } finally {
      setLoading(false);
    }
  };
  return (
      <div
        className="otp-request-container"
        style={{
          backgroundImage: "url('/images/Login.jpg')",
        }}
      >
        {loading ? (
          <TailSpin color="#00BFFF" height={100} width={100} />
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <h1>Enter OTP</h1>
            <input
              ref={otpRef}
              type="text"
              placeholder="Enter OTP received to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="otp-input"
            />
            {otpError && <div className="error">{otpError}</div>}
            <button type="submit" className="submit-btn">
              Submit OTP
            </button>
          </form>
        )}
      </div>
  );
};

export default OtpRequest;
