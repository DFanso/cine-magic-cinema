import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Swal from "sweetalert2";

import "../css/AllShowtimes.css";
import { useUserContext } from "./auth/UserContext";

const ShowtimeCard = ({ showtime, onUpdate, onDelete }) => {
  const formattedDate = new Date(showtime.date).toLocaleDateString();
  const formattedStartTime = showtime.startTime;
  const formattedEndTime = showtime.endTime;
  const bookedSeats = showtime.Seats.bookedSeats.join(", ");

  return (
    <div className="showtime-card">
      <div className="showtime-info">
        <h3>
          {showtime.movieId.name} ({showtime.movieId.year})
        </h3>
        <p>Date: {formattedDate}</p>
        <p>
          Time: {formattedStartTime} - {formattedEndTime}
        </p>
        <p>Booked Seats: {bookedSeats}</p>
        <p>Price: ${showtime.price}</p>
        <div className="showtime-actions">
          <button
            className="btn update-btn"
            onClick={() => onUpdate(showtime._id)}
          >
            Update
          </button>
          <button
            className="btn delete-btn"
            onClick={() => onDelete(showtime.movieId._id, showtime._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ShowtimeGrid = () => {
  const [showtimes, setShowtimes] = useState([]);
  const { isLoading, setLoading } = useUserContext();
  const { id, name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_PATH}/movies/${id}/show-times`)
      .then((response) => {
        setShowtimes(response.data);
        setLoading(false);
      })

      .catch((error) => {
        setLoading(false);
        Swal.fire("Error", "Error fetching showtimes", "error");
      });
  }, [id]);

  const handleUpdate = (showtimeId) => {
    navigate(`/update-showtime/${id}/${showtimeId}`);
  };

  const handleDelete = (movieId, showtimeId) => {
    const adminToken = localStorage.getItem("admin-token");
    if (!adminToken) {
      Swal.fire("Error", "No admin token found", "error");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this showtime!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(
            `${process.env.REACT_APP_API_PATH}/movies/${movieId}/show-times/${showtimeId}`,
            {
              headers: { Authorization: `Bearer ${adminToken}` },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              setShowtimes((currentShowtimes) =>
                currentShowtimes.filter(
                  (showtime) => showtime._id !== showtimeId
                )
              );
              setLoading(false);
              Swal.fire(
                "Deleted!",
                "The showtime has been deleted.",
                "success"
              );
            } else {
              setLoading(false);
              Swal.fire("Error", "Failed to delete showtime", "error");
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              "An error occurred while deleting the showtime",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className={`login-wrapper ${isLoading ? "blurred" : ""}`}>
      {isLoading && (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      )}
      <div>
        <div className="add-showtime-button-container">
          <Link to={`/add-showtime/${id}`} className="btn-link">
            <button className="btn add-btn">Add Showtime</button>
          </Link>
          <div className="h3-con">
            <h3 className="h3-st">All Show Times for</h3>
            <h3 className="h3-st-title">{name}</h3>
          </div>
        </div>
        <div className="showtime-grid">
          {showtimes.length > 0
            ? showtimes.map((showtime, index) => (
                <ShowtimeCard
                  key={index}
                  showtime={showtime}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))
            : !showtimes.length > 0 && (
                <p>There are no showtimes for this movie</p>
              )}
        </div>
      </div>
    </div>
  );
};
export default ShowtimeGrid;
