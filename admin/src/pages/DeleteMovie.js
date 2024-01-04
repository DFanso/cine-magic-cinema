// MovieForm.js
import React from 'react';
import '../css/DeleteMovie.css'; // Import the CSS file for styling

const DeleteMovieForm = () => {
    return (
        <div className="movie-form-container">
            <form className="movie-form">
                <h2>Delete a New Movie</h2>
                <input type="text" placeholder="Movie ID" />
                <button type="submit">Delete Movie</button>
            </form>
        </div>
    );
};

export default DeleteMovieForm;
