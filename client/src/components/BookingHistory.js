import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/BookingHistory.css";

import { TailSpin } from "react-loader-spinner";
import { useLoading } from "./LoadingContext.js";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const { loading, setLoading } = useLoading();
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
    setLoading(true);

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
    setLoading(false);
  }, []);

  return (
    <div className={`login-wrapper ${loading ? "blurred" : ""}`}>
      {loading && (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      )}
      <div className="booking-history">
        <h1 className="book-h">Booking History</h1>
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
              {new Date(booking.showTimeId.date).toLocaleDateString()}
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
    </div>
  );
}

export default BookingHistory;
