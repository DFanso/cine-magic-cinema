// AddShowtime.js
import React from 'react';
import '../css/AddShowtime.css'; // Import the CSS file for styling

const AddShowtime = () => {
    return (
        <div className="add-showtime-container">
            <form className="add-showtime-form">
                <h2>Add Showtime</h2>
                <input type="text" placeholder="Movie ID" />
                <input type="text" placeholder="Start Time" />
                <input type="text" placeholder="End Time" />
                <input type="text" placeholder="Date eg:(2023-12-15)" />
                <button type="submit">Add Showtime</button>
            </form>
        </div>
    );
};

export default AddShowtime;
