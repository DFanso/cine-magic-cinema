// AddBooking.js
import React from 'react';
import '../css/AddBooking.css'; // Import the CSS file for styling

const UpdateBooking = () => {
    return (
        <div className="add-booking-container">
            <form className="add-booking-form">
                <h2>Update Booking</h2>
                <input type="text" placeholder="Movie ID" />
                <input type="text" placeholder="Showtime ID" />
                <input type="text" placeholder="Selected Seats (e.g., A1, A2, B3)" />
                <button type="submit">Update Booking</button>
            </form>
        </div>
    );
};

export default UpdateBooking;
