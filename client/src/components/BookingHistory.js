import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/BookingHistory.css";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hours12 = hours % 12 || 12;
    const amPm = hours < 12 ? "AM" : "PM";
    return `${hours12}:${minutes} ${amPm}`;
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${process.env.REACT_APP_API_PATH}/booking/user`, {
        headers: headers,
      })
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // Handle error here
      });
  }, []);

  return (
    <div className="booking-history">
      <h1>Booking History</h1>
      <div className="booking-form-group-title">
        <p>Date</p>
        <p>Time</p>
        <p>Movie Name</p>
        <p>Seats</p>
        <p>Seat price</p>
        <p>otal Price</p>
      </div>
      {bookings.map((booking, index) => (
        <div className="booking-form-group" key={index}>
          <p className="booking-form-group-data">
            {new Date(booking.movieId.startDate).toLocaleDateString()}
          </p>
          <p className="booking-form-group-data">
            {convertTo12HourFormat(booking.showTimeId.startTime)}
          </p>
          <p className="booking-form-group-data">{booking.movieId.name}</p>
          <p className="booking-form-group-data">
            {booking.selectedSeats.join(", ")}
          </p>
          <p className="booking-form-group-data">
            ${(booking.totalPrice / booking.selectedSeats.length).toFixed(2)}
          </p>
          <p className="booking-form-group-data">
            ${booking.totalPrice.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BookingHistory;
