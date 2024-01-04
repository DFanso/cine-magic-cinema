import React from 'react';
import '../css/AllShowtimes.css'; // Ensure you have a separate CSS file for showtimes
import { Link } from 'react-router-dom';

const showtimes = [
    // Array of showtime objects
    {
        "id": 1,
        "bookedSeat": "A1",
        "time": "3:00 PM"
    },
    {
        "id": 1,
        "bookedSeat": "A1",
        "time": "3:00 PM"
    },
    {
        "id": 1,
        "bookedSeat": "A1",
        "time": "3:00 PM"
    },
    {
        "id": 1,
        "bookedSeat": "A1",
        "time": "3:00 PM"
    },
    {
        "id": 1,
        "bookedSeat": "A1",
        "time": "3:00 PM"
    },
    // ... add more showtime objects as needed
];

const ShowtimeCard = ({ showtime }) => {
    return (
        <div className="showtime-card">
            <div className="showtime-info">
                <h3>{showtime.title}</h3>
                <p>Booked Seat: {showtime.bookedSeat}</p>
                <p>Time: {showtime.time}</p>
                <div className="showtime-actions">
                    <Link to="/update-showtime" className="btn-link">
                        <button className="btn update-btn">Update</button>
                    </Link>
                    <Link to="/delete-showtime" className="btn-link">
                        <button className="btn delete-btn">Delete</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const ShowtimeGrid = () => {
    return (
        <div>
            <div className="add-showtime-button-container">

                <Link to="/add-showtime" className="btn-link">
                    <button className="btn add-btn">Add Showtime</button>
                </Link>
                <div className='h3-con'><h3 className='h3-st'>All Show Times for</h3><h3 className='h3-st-title'>Wonka</h3></div>
            </div>
            <div className="showtime-grid">
                {showtimes.map((showtime, index) => (
                    <ShowtimeCard key={index} showtime={showtime} />
                ))}
            </div>
        </div>
    );
};

export default ShowtimeGrid;
