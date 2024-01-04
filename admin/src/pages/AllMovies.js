import "../css/AllMovies.css"; // Ensure you have a MovieCard.css file in the same directory
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import axios from "axios";

const MovieCard = ({ movie, isComingSoon }) => {
  return (
    <div className="movie-card">
      <img src={movie.coverImage} alt={movie.title} className="movie-cover" />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        {isComingSoon && <p className="coming-soon">Coming Soon</p>}
        <div className="movie-actions">
          <Link to="/UpdateMovie" className="btn-link">
            <button className="new-btn">Update</button>
          </Link>
          <Link to="/showtime-view" className="btn-link">
            <button className="show-btn">Showtime</button>
          </Link>
          <Link to="/DeleteMovie" className="btn-link">
            <button className="new-btn-del">Delete</button>
          </Link>
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
