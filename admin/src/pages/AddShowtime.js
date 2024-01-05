import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/AddShowtime.css";

const AddShowtime = () => {
  const [showtimeData, setShowtimeData] = useState({
    price: "",
    startTime: "",
    endTime: "",
    date: "",
  });
  const { movieId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setShowtimeData({ ...showtimeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminToken = localStorage.getItem("admin-token");
    if (!adminToken) {
      Swal.fire("Error", "No admin token found", "error");
      return;
    }

    const postData = {
      ...showtimeData,
      Seats: {
        totalSeats: 64,
        bookedSeats: [],
      },
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_PATH}/movies/${movieId}/show-times`,
        postData,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      Swal.fire("Success", "Showtime added successfully", "success");
      navigate(-1); // Go back to the previous page
    } catch (error) {
      Swal.fire("Error", "Failed to add showtime", "error");
    }
  };

  return (
    <div className="add-showtime-container">
      <form className="add-showtime-form" onSubmit={handleSubmit}>
        <h2>Add Showtime</h2>
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={showtimeData.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="startTime"
          placeholder="Start Time"
          value={showtimeData.startTime}
          onChange={handleChange}
        />
        <input
          type="text"
          name="endTime"
          placeholder="End Time"
          value={showtimeData.endTime}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Date (e.g., 2023-12-15)"
          value={showtimeData.date}
          onChange={handleChange}
        />
        <button type="submit">Add Showtime</button>
      </form>
    </div>
  );
};

export default AddShowtime;
