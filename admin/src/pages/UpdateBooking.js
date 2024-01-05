import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom"; // to get the booking id from the URL
import "../css/AddBooking.css";

const UpdateBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState("");
  const { id: bookingId } = useParams(); // Extract bookingId from URL
  const [movieId, setMovieId] = useState("");
  const [showTimeId, setShowTimeId] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("admin-token");
        const response = await fetch(
          `${process.env.REACT_APP_API_PATH}/booking/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch booking data.");
        }

        const bookingData = await response.json();
        setSelectedSeats(bookingData.selectedSeats.join(", "));
        setMovieId(bookingData.movieId);
        setShowTimeId(bookingData.showTimeId);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("admin-token");
        const response = await fetch(
          `${process.env.REACT_APP_API_PATH}/booking/${bookingId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              movieId,
              showTimeId,
              selectedSeats: selectedSeats
                .split(",")
                .map((seat) => seat.trim()),
            }),
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to update booking.");
        }

        Swal.fire("Updated!", "Booking has been updated.", "success");
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  return (
    <div className="add-booking-container">
      <form className="add-booking-form" onSubmit={handleSubmit}>
        <h2>Update Booking</h2>
        <input
          type="text"
          placeholder="Selected Seats (e.g., A1, A2, B3)"
          value={selectedSeats}
          onChange={(e) => setSelectedSeats(e.target.value)}
        />
        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
};

export default UpdateBooking;
