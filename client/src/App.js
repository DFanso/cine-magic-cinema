import "./App.css";
import React, { useEffect, useState, useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { LoadingProvider } from "./components/LoadingContext";

import { UserProvider, UserContext } from "./components/UserContext";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Cards from "./components/Cards";
import ForgotPassword from "./components/ForgotPassword";
import OtpRequest from "./components/OtpRequest";
import ResetCode from "./components/ResetCode";
import ResetPassword from "./components/ResetPassword";
import Register from "./components/Register";
import MoviePage from "./components/pages/Movie";
import Booking from "./components/pages/Booking";
import Seating from "./components/pages/Seating";
import Navigation from "./components/Navigation";
import UserNavbar from "./components/UserNavbar";
import Footer from "./components/Footer";
import UserProfile from "./components/pages/UserProfile";

import NotFound from "./components/pages/NotFound";
import PaymentSuccess from "./components/pages/PaymentSuccess";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { login } from "./components/actions/authActions";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { setUserData, userData } = useContext(UserContext); // Use setUserData from UserContext
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const profileResponse = await axios.get(
            `${process.env.REACT_APP_API_PATH}/users/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Use the token from localStorage
              },
            }
          );

          if (profileResponse.data) {
            setUserData(profileResponse.data); // Update with actual data
            dispatch(login());
            setIsUserLoggedIn(true); // Set logged in state to true
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle error appropriately
        }
      }
    };

    fetchUserData();
  }, [dispatch, setUserData]);

  return (
    <LoadingProvider>
      <UserProvider>
        <Router>
          {isLoggedIn ? <UserNavbar /> : <Navigation />}
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/about" Component={About} />
            <Route path="/contact-page" Component={Contact} />
            <Route path="/login-container" Component={Login} />
            <Route path="/cards" Component={Cards} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp-request-container" element={<OtpRequest />} />
            <Route path="/reset-code" element={<ResetCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/seating/:showTimeId/:id" element={<Seating />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/not-found" Component={NotFound} />
            <Route path="/payment-success" Component={PaymentSuccess} />
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </LoadingProvider>
  );
}

export default App;
