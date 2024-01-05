import React, { useState } from 'react';
import '../css/AllShowtimes.css';
import { Link } from 'react-router-dom';

const showtimes = [
    // Array of showtime objects
    {
        "id": 1,
        "bookedSeat": "A1",
        "time": "3:00 PM",
        "price": "Rs.2000"
    },
    {
        "id": 1,
        "bookedSeat": "B1",
        "time": "3:00 PM",
        "price": "Rs.2500"
    },
    {
        "id": 1,
        "bookedSeat": "A1",
        "time": "3:00 PM",
        "price": "Rs.2000"
    },
    {
        "id": 1,
        "bookedSeat": "B1",
        "time": "3:00 PM",
        "price": "Rs.2500"
    },
    {
        "id": 1,
        "bookedSeat": "A1",
        "time": "3:00 PM",
        "price": "Rs.2000"
    },
    // ... add more showtime objects as needed
];

const BookingCard = ({ showtime }) => {
    return (
        <div className="showtime-card">
            <div className="showtime-info">
                <h3>{showtime.title}</h3>
                <p>Booked Seat: {showtime.bookedSeat}</p>
                <p>Time: {showtime.time}</p>
                <p>Price: {showtime.price}</p>
                <div className="showtime-actions">
                    <Link to="/update-booking" className="btn-link">
                        <button className="btn update-btn">Update</button>
                    </Link>
                    <Link to="/delete-booking" className="btn-link">
                        <button className="btn delete-btn">Delete</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const BookingGrid = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    return (
        <div>
            <div className="add-showtime-button-container">
                <Link to="/add-booking" className="btn-link">
                    <button className="btn add-btn">Add Booking</button>
                </Link>
                <div className='search-container'>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <div className='h3-con'>
                    <h3 className='h3-st'>All bookings for</h3>
                    <h3 className='h3-st-title'>Wonka</h3>
                </div>
            </div>
            <div className="showtime-grid">
                {showtimes.map((showtime, index) => (
                    <BookingCard key={index} showtime={showtime} />
                ))}
            </div>
        </div>
    );
};

export default BookingGrid;
