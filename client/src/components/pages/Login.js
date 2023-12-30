import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import "../css/Login.css";

import { TailSpin } from "react-loader-spinner";
import { useLoading } from "../LoadingContext.js";
import { useDispatch } from "react-redux";
import { login } from "../actions/authActions";
import { UserContext } from "../UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const dispatch = useDispatch();
  const { setUserData } = useContext(UserContext);

  const { loading, setLoading } = useLoading();

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    setErrors({});

    if (!email) {
      formIsValid = false;
      tempErrors["email"] = "Email cannot be empty";
      emailRef.current.focus();
    } else if (!isValidEmail(email)) {
      formIsValid = false;
      tempErrors["email"] = "Invalid email format";
      emailRef.current.focus();
    } else if (!password) {
      formIsValid = false;
      tempErrors["password"] = "Password cannot be empty";
      passwordRef.current.focus();
    } else if (password.length < 6) {
      formIsValid = false;
      setPassword("");
      tempErrors["password"] = "Password must be at least 6 characters long";
      passwordRef.current.focus();
    } else if (!isPasswordStrong(password)) {
      formIsValid = false;
      setPassword("");
      tempErrors["password"] = "Password is weak";
      passwordRef.current.focus();
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  const LoginSuccessful = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const timer = setTimeout(() => {
        navigate("/");
      });

      return () => clearTimeout(timer);
    }, [navigate]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const loginResponse = await axios.post(
          `${process.env.REACT_APP_API_PATH}/auth/signin`,
          {
            email: email,
            password: password,
          }
        );

        if (loginResponse.data && loginResponse.data.accessToken) {
          // Store the token, assuming it's named accessToken
          localStorage.setItem("token", loginResponse.data.accessToken);
          setIsLoginSuccessful(true);
          dispatch(login()); // Update Redux store if needed

          // Fetch user profile
          const profileResponse = await axios.get(
            `${process.env.REACT_APP_API_PATH}/users/profile`,
            {
              headers: {
                Authorization: `Bearer ${loginResponse.data.accessToken}`,
              },
            }
          );

          // Set user data in context
          if (profileResponse.data) {
            setUserData(profileResponse.data);
          }
        }
      } catch (error) {
        console.error("Login error", error);
        // Handle errors here
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <div className={`login-wrapper ${loading ? "blurred" : ""}`}>
      {loading && (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      )}

      <div
        className="login-container"
        style={{ backgroundImage: "url('/images/Login.jpg')" }}
      >
        {isLoginSuccessful ? (
          <LoginSuccessful />
        ) : (
          <form onSubmit={handleSubmit}>
            <h1>LOGIN</h1>
            <div className="input-box">
              <input
                ref={emailRef}
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className="icon" />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="input-box">
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
            <div className="forgot">
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>
            <button type="submit">Login</button>
            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="register-link">
                  Register
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
