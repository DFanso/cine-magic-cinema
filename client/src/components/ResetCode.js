import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./css/ResetCode.css";

const ResetCode = () => {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const codeRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setCodeError("");

    if (!validateCode(code)) {
      setCodeError("Invalid code. Please try again.");
      setCode("");
      codeRef.current.focus();
      return;
    }

    console.log("Code validated:", code);

    navigate("/reset-password");
  };

  const validateCode = (code) => {
    return code.length === 6;
  };

  return (
    <div
      className="reset-code"
      style={{
        backgroundImage: "url('/images/Login.jpg')",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h1>Enter Your Code</h1>
        <input
          ref={codeRef}
          type="text"
          placeholder="Check your email and enter the code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {codeError && <div className="error">{codeError}</div>}
        <button type="submit">Submit Code</button>
      </form>
    </div>
  );
};

export default ResetCode;
