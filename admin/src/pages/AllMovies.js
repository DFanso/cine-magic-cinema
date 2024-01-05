import "../css/AllMovies.css"; // Ensure you have a MovieCard.css file in the same directory
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import axios from "axios";
import Swal from "sweetalert2";

const MovieCard = ({ movie, isComingSoon }) => {
  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const adminToken = localStorage.getItem("admin-token");
        await axios.delete(`${process.env.REACT_APP_API_PATH}/movies/${id}`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        Swal.fire("Deleted!", "The movie has been deleted.", "success");
        // Optionally refresh the list of movies here
      } catch (error) {
        console.error("Error deleting the movie:", error);
        Swal.fire("Error!", "There was a problem deleting the movie.", "error");
      }
    }
  };
  return (
    <div className="movie-card">
      <img src={movie.coverImage} alt={movie.title} className="movie-cover" />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        {isComingSoon && <p className="coming-soon">Coming Soon</p>}
        <div className="movie-actions">
          <Link to={`/UpdateMovie/${movie._id}`} className="btn-link">
            <button className="new-btn">Update</button>
          </Link>
          <Link to="/showtime-view" className="btn-link">
            <button className="show-btn">Showtime</button>
          </Link>

          <button
            className="new-btn-del"
            onClick={() => handleDelete(movie._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const MovieGrid = () => {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const fetchMovies = async (nowShowing) => {
    try {
      const adminToken = localStorage.getItem("admin-token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_PATH}/movies`,
        {
          params: { nowShowing },
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      if (nowShowing) {
        setCurrentMovies(response.data);
      } else {
        setUpcomingMovies(response.data);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(true); // Fetch current movies
    fetchMovies(false); // Fetch upcoming movies
  }, []);
  return (
    <div>
      <div className="add-movie-button-container">
        <Link to="/AddMovie" className="btn-link">
          <Link to="/movies" className="btn-link">
            <button className="btn add-btn">Add Movie</button>
          </Link>
        </Link>
      </div>
      <div className="movie-grid">
        {currentMovies.map((movie, index) => (
          <MovieCard key={index} movie={movie} isComingSoon={false} />
        ))}
        {upcomingMovies.map((movie, index) => (
          <MovieCard key={index} movie={movie} isComingSoon={true} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
