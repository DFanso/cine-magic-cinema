import "./App.css";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from 'react-router-dom';

//BrowserRouter
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import PaymentCancel from "./components/pages/PaymentCancel";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { login } from "./components/actions/authActions";

import Swal from "sweetalert2";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { setUserData, userData } = useContext(UserContext); // Use setUserData from UserContext
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  function ProtectedRoute({ children }) {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const token = localStorage.getItem("token");
    if (!isLoggedIn & token) {
      Swal.fire({
        title: "Unauthorized Access",
        text: "You need to log in to access this page",
        icon: "warning",
        confirmButtonText: "OK",
      });
      // Redirect to the login page if not logged in
      return <Navigate to="/login-container" />;
    }

    return children;
  }

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        console.log(token);
        try {
          const profileResponse = await axios.get(
            `${process.env.REACT_APP_API_PATH}/users/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Use the token from localStorage
              },
            }
          );
          setUserData(profileResponse.data);

          // Assuming profileResponse.data contains the user object
          if (profileResponse.data) {
            dispatch(login());
            setIsUserLoggedIn(true); // Set logged in state to true
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <LoadingProvider>
      <UserProvider>
        <Router>
          {isLoggedIn ? <UserNavbar /> : <Navigation />}
          <ScrollToTop />
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
            <Route path="/reset-password/:email" element={<ResetPassword />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/seating/:showTimeId/:id" element={<Seating />} />
            <Route
              path="/user-profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route path="/not-found" Component={NotFound} />
            <Route path="/payment-success" Component={PaymentSuccess} />
            <Route path="/payment-cancel" Component={PaymentCancel} />
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </LoadingProvider>
  );
}

export default App;
