// MovieForm.js
import React from 'react';
import '../css/MovieUpdate.css'; // Import the CSS file for styling

const MovieForm = () => {
    return (

        <div className="movie-form-container">
            <form className="movie-form">
                <h2>Add a New Movie</h2>
                <input type="text" placeholder="Movie Name" />
                {/* <textarea placeholder="Movie Description"></textarea> */}
                <input type="text" placeholder="Year" />
                <input type="text" placeholder="Trailer" />
                <input type="text" placeholder="Start Date" />
                <div className="upload-container">
                    <div className='upload-sec-one'>
                        <label>Upload Cover Image:</label>
                        <input type="file" />
                    </div>
                    <div className='upload-sec-one'>
                        <label>Upload Banner Image:</label>
                        <input type="file" />
                    </div>
                </div>
                <button type="submit">Add Movie</button>
            </form>
        </div>

    );
};

export default MovieForm;
