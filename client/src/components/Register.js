import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import "./css/Register.css";
import OtpRequest from "./OtpRequest";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useLoading } from "./LoadingContext.js";
import { UserContext } from "./UserContext";

const Register = () => {
  const { loading, setLoading } = useLoading();
   const { setUserData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [isOtpRequested, setIsOtpRequested] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let tempErrors = {};
    let formIsValid = true;

    if (!formData.firstName) {
      formIsValid = false;
      tempErrors["firstName"] = "First name cannot be empty";
      firstNameRef.current.focus();
    } else if (!formData.lastName) {
      formIsValid = false;
      tempErrors["lastName"] = "Last name cannot be empty";
      lastNameRef.current.focus();
    } else if (!validateEmail(formData.email)) {
      formIsValid = false;
      tempErrors["email"] = "Invalid email";
      setFormData({ ...formData, email: "" });
      emailRef.current.focus();
    } else if (formData.password.length < 6) {
      formIsValid = false;
      tempErrors["password"] = "Password must be at least 6 characters";
      setFormData({ ...formData, password: "" });
      passwordRef.current.focus();
    } else if (!isPasswordStrong(formData.password)) {
      formIsValid = false;
      tempErrors["password"] = "Password is weak";
      setFormData({ ...formData, password: "" });
      passwordRef.current.focus();
    } else if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      tempErrors["confirmPassword"] = "Passwords do not match";
      confirmPasswordRef.current.focus();
      setFormData({ ...formData, confirmPassword: "" });
    }

    setErrors(tempErrors);
    if (!formIsValid) return;

    console.log("Registration Data:", formData);

    try {
      setLoading(true);
      // Signup request
      const signupResponse = await axios.post(
        `${process.env.REACT_APP_API_PATH}/auth/signup`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }
      );

      if (signupResponse.status === 201) {
        // OTP request
        await axios.post(`${process.env.REACT_APP_API_PATH}/auth/otp-req`, {
          Email: formData.email,
        });

        setIsOtpRequested(true);
        navigate("/otp-request-container"); // Redirect to OTP Request page
      }
    } catch (error) {
      console.error("Registration error", error);
      // Handle errors here, such as displaying a message to the user
    } finally {
      setLoading(false);
    }
    if (formIsValid) {
      setUserData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,        
      });
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

  const navigate = useNavigate();
  useEffect(() => {
    if (isOtpRequested) {
      const timer = setTimeout(() => {
        navigate("/otp-request-container");
      });
      return () => clearTimeout(timer);
    }
  }, [isOtpRequested, navigate]);
  return (
    <div
      className="register"
      style={{
        backgroundImage: "url('/images/Login.jpg')",
      }}
    >
      {loading ? (
        <div className="register__loading">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      ) : isOtpRequested ? (
        <OtpRequest />
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>REGISTER</h1>
          <div className="input-box">
            <input
              ref={firstNameRef}
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <FaUser className="icon" />
            {errors.firstName && (
              <div className="error">{errors.firstName}</div>
            )}
          </div>
          <div className="input-box">
            <input
              ref={lastNameRef}
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <FaUser className="icon" />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>
          <div className="input-box">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <FaEnvelope className="icon" />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="input-box">
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <FaLock className="icon" />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="input-box">
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <FaLock className="icon" />
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword}</div>
            )}
          </div>
          <button type="submit" className="submit-btn">
            Register
          </button>
          <div className="login-link">
            <p>
              already a user?{" "}
              <Link to="/login-container" className="login-link">
                login
              </Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
export default Register;
