import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/UpdateShowtime.css";

const UpdateShowtime = () => {
  const [showtimeData, setShowtimeData] = useState({
    price: "",
    startTime: "",
    endTime: "",
    date: "",
  });
  const { movieId, showtimeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_PATH}/movies/${movieId}/show-times/${showtimeId}`
      )
      .then((response) => {
        const data = response.data;
        setShowtimeData({
          price: data.price,
          startTime: data.startTime,
          endTime: data.endTime,
          date: data.date.substring(0, 10), // Extract only the date part
        });
      })
      .catch((error) => {
        Swal.fire("Error", "Failed to fetch showtime details", "error");
      });
  }, [movieId, showtimeId]);

  const handleChange = (e) => {
    setShowtimeData({ ...showtimeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminToken = localStorage.getItem("admin-token");
    if (!adminToken) {
      Swal.fire("Error", "No admin token found", "error");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this showtime?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `${process.env.REACT_APP_API_PATH}/movies/${movieId}/show-times/${showtimeId}`,
            showtimeData,
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            }
          )
          .then((response) => {
            Swal.fire("Updated!", "Showtime has been updated.", "success");
            navigate(-1); // Go back to the previous page
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to update showtime", "error");
          });
      }
    });
  };

  return (
    <div className="add-showtime-container">
      <form className="add-showtime-form" onSubmit={handleSubmit}>
        <h2>Update Showtime</h2>
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
        <button type="submit">Update Showtime</button>
      </form>
    </div>
  );
};

export default UpdateShowtime;
