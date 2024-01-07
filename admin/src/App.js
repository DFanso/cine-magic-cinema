import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Movies from "./pages/Movie";
import MovieUpdate from "./pages/MovieUpdate";
import AddShowtime from "./pages/AddShowtime";
import UpdateShowtime from "./pages/UpdateShowtime";
import DeleteMovieForm from "./pages/DeleteMovie";
import DeleteShowtime from "./pages/DeleteShowtime";
import AddBooking from "./pages/AddBooking";
import UpdateBooking from "./pages/UpdateBooking";
import DeleteBooking from "./pages/DeleteBooking";
import Chat from "./pages/Chat";
import MovieGrid from "./pages/AllMovies";
import ShowtimeGrid from "./pages/AllShowtimes";
import BookingGrid from "./pages/AllBookings";
import RegisterPage from "./pages/Signup";

import { UserContext } from "./pages/auth/UserContext"; // Import UserContext
import { UserProvider } from "./pages/auth/UserContext";

const App = () => {
  const { updateUserData, userData } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      if (!userData) {
        const token = localStorage.getItem("admin-token");
        if (token) {
          try {
            const profileResponse = await axios.get(
              `${process.env.REACT_APP_API_PATH}/users/profile`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (profileResponse.data && profileResponse.data.type === "ADMIN") {
              updateUserData(profileResponse.data);
              setIsLoggedIn(true);
            } else {
              Swal.fire({
                title: "Access Denied",
                text: "You are not authorized to access the admin panel.",
                icon: "error",
                confirmButtonText: "OK",
              });
              localStorage.removeItem("admin-token");
              setIsLoggedIn(false);
            }
          } catch (error) {
            console.error("Error fetching admin data:", error);
            Swal.fire({
              title: "Error",
              text: "An error occurred while fetching user data.",
              icon: "error",
              confirmButtonText: "OK",
            });
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      }
    };

    checkUserLoggedIn();
  }, [updateUserData]); // Removed isLoggedIn from dependency array

  return (
    <UserProvider>
      <Router>
        {isLoggedIn ? (
          <div className="app-container">
            <Header />
            <div
              style={{
                display: "flex",
                height: "calc(100vh - [header-height])",
              }}
            >
              <Sidebar />
              <div style={{ flex: 1, padding: "20px" }}>
                <Routes>
                  <Route path="/movies-view" element={<MovieGrid />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/UpdateMovie/:id" element={<MovieUpdate />} />
                  <Route path="/DeleteMovie" element={<DeleteMovieForm />} />
                  <Route
                    path="/add-showtime/:movieId"
                    element={<AddShowtime />}
                  />
                  <Route
                    path="/update-showtime/:movieId/:showtimeId"
                    element={<UpdateShowtime />}
                  />
                  <Route path="/delete-showtime" element={<DeleteShowtime />} />
                  <Route path="/add-booking" element={<AddBooking />} />
                  <Route
                    path="/update-booking/:id/:movieId"
                    element={<UpdateBooking />}
                  />
                  <Route
                    path="/delete-booking/:id"
                    element={<DeleteBooking />}
                  />
                  <Route path="/chat" element={<Chat />} />
                  <Route
                    path="/showtime-view/:id/:name"
                    element={<ShowtimeGrid />}
                  />
                  <Route
                    path="/Booking-view/:movieId/:name"
                    element={<BookingGrid />}
                  />
                  <Route path="/register-page" element={<RegisterPage />} />
                  <Route
                    path="/"
                    element={<Navigate replace to="/movies-view" />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register-page" element={<RegisterPage />} />
            <Route path="/movies-view" element={<Navigate replace to="/" />} />
          </Routes>
        )}
      </Router>
    </UserProvider>
  );
};

export default App;
