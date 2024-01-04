import React from 'react';
import '../css/AllMovies.css'; // Ensure you have a MovieCard.css file in the same directory
import { Link } from 'react-router-dom';

const movies = [
    // JSON-like array of movie objects
    {
        "id": 1,
        "title": "Wonka",
        "coverImage": "/images/wonka.jpeg"
    },
    {
        "id": 2,
        "title": "Marvels",
        "coverImage": "/images/marvels1.jpg"
    },
    {
        "id": 3,
        "title": "Migration",
        "coverImage": "/images/migration.jpg"
    },
    {
        "id": 4,
        "title": "Aquaman",
        "coverImage": "/images/aquaman-cover-2.jpg"
    }
    // ... add more movie objects as needed
];


const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={movie.coverImage} alt={movie.title} className="movie-cover" />
            <div className="movie-info">
                <h3>{movie.title}</h3>
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
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieGrid;
