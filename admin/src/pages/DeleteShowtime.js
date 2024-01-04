// AddShowtime.js
import React from 'react';
import '../css/AddShowtime.css'; // Import the CSS file for styling

const DeleteShowtime = () => {
    return (
        <div className="add-showtime-container">
            <form className="add-showtime-form">
                <h2>Delete Showtime</h2>
                <input type="text" placeholder="Movie ID" />
                <input type="text" placeholder="Showtime ID" />
                {/* <input type="text" placeholder="Time (e.g., 19:00)" /> */}
                <button type="submit">Delete Showtime</button>
            </form>
        </div>
    );
};

export default DeleteShowtime;
