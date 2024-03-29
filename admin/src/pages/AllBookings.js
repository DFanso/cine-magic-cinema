import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // if using react-router
import { Link } from "react-router-dom";

import "../css/AllShowtimes.css";

import Swal from "sweetalert2";

const BookingCard = ({ booking, onDelete }) => {
  const { movieId, selectedSeats, totalPrice, userId } = booking;
  const movieName = movieId.name;
  const userName = `${userId.firstName} ${userId.lastName}`;

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("admin-token");
        const response = await fetch(
          `${process.env.REACT_APP_API_PATH}/booking/${booking._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 204) {
          throw new Error("Failed to delete the booking.");
        }

        onDelete(booking._id); // Trigger refresh in parent component
        Swal.fire("Deleted!", "The booking has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  return (
    <div className="booking-card">
      <div className="booking-info">
        <h3>Movie: {movieName}</h3>
        <p>User: {userName}</p>
        <p>
          Selected Seat:
          <select>
            {selectedSeats.map((seat, index) => (
              <option key={index} value={seat}>
                {seat}
              </option>
            ))}
          </select>
        </p>
        <p>Total Price: ${totalPrice}</p>
        <div className="booking-actions">
          <Link
            to={`/update-booking/${booking._id}/${movieId._id}`}
            className="btn-link"
          >
            <button className="btn update-btn">Update</button>
          </Link>

          <button onClick={handleDelete} className="btn delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingGrid = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { movieId } = useParams(); // Extract movieId from URL
  const filteredBookings = searchTerm
    ? bookings.filter((booking) => {
        const movieName = booking.movieId.name.toLowerCase();
        const userName =
          `${booking.userId.firstName} ${booking.userId.lastName}`.toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        return (
          movieName.includes(searchLower) || userName.includes(searchLower)
        );
      })
    : bookings;

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("admin-token");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_PATH}/booking/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Error fetching bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    };

    fetchBookings();
  }, [movieId, refresh]); // Add refresh as a dependency
  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
  };
  const handleDelete = (deletedId) => {
    setRefresh((prev) => !prev); // Toggle refresh to trigger re-fetch
  };

  return (
    <div>
      <div className="add-showtime-button-container">
        <Link to="/add-booking" className="btn-link">
          <button className="btn add-btn">Add Booking</button>
        </Link>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="h3-con">
          <h3 className="h3-st">All bookings for</h3>
          <h3 className="h3-st-title">Wonka</h3>
        </div>
      </div>
      <div className="showtime-grid">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking, index) => (
            <BookingCard
              key={index}
              booking={booking}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingGrid;
