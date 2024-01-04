import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Movies from './pages/Movie';
import MovieUpdate from './pages/MovieUpdate';
import AddShowtime from './pages/AddShowtime';
import UpdateShowtime from './pages/UpdateShowtime';
import DeleteMovieForm from './pages/DeleteMovie';
import DeleteShowtime from './pages/DeleteShowtime';
import AddBooking from './pages/AddBooking';
import UpdateBooking from './pages/UpdateBooking';
import DeleteBooking from './pages/DeleteBooking';
import Chat from './pages/Chat';
import MovieGrid from './pages/AllMovies';
import ShowtimeGrid from './pages/AllShowtimes';
import BookingGrid from './pages/AllBookings';
import RegisterPage from './pages/Signup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div className="app-container">
          <Header />
          <div style={{ display: 'flex', height: 'calc(100vh - [header-height])' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px' }}>
              <Routes>
                <Route path="/movies-view" element={<MovieGrid />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/UpdateMovie" element={<MovieUpdate />} />
                <Route path="/DeleteMovie" element={<DeleteMovieForm />} />
                <Route path="/add-showtime" element={<AddShowtime />} />
                <Route path="/update-showtime" element={<UpdateShowtime />} />
                <Route path="/delete-showtime" element={<DeleteShowtime />} />
                <Route path="/add-booking" element={<AddBooking />} />
                <Route path="/update-booking" element={<UpdateBooking />} />
                <Route path="/delete-booking" element={<DeleteBooking />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/showtime-view" element={<ShowtimeGrid />} />
                <Route path="/Booking-view" element={<BookingGrid />} />
                <Route path="/register-page" element={<RegisterPage />} />
                <Route path="/" element={<Navigate replace to="/movies-view" />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register-page" element={<RegisterPage />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
