// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css'; // Import the CSS file

const Sidebar = () => {
    // Navigation items
    const navigation = [
        { title: 'Movies', link: '/movies-view' },
        { title: 'Add Movie', link: '/movies' },
        { title: 'Update Movie', link: '/UpdateMovie' },
        { title: 'Delete Movie', link: '/DeleteMovie' },
        { emptytitle: '', link: '' },
        { title: 'Showtimes', link: '/showtime-view' },
        { title: 'Add Showtime', link: '/add-showtime' },
        { title: 'Update Showtime', link: '/update-showtime' },
        { title: 'Delete Showtime', link: '/delete-showtime' },
        { emptytitle: '', link: '' },
        { title: 'Bookings', link: '/Booking-view' },
        { title: 'Add Booking', link: '/add-booking' },
        { title: 'Update Booking', link: '/update-booking' },
        { title: 'Delete Booking', link: '/delete-booking' },
        { emptytitle: '', link: '' },
        { title: 'Chat', link: '/chat' },


        // Add more navigation items here
    ];

    return (
        <div className="sidebar">
            {navigation.map((item, index) => (
                <Link to={item.link} key={index} className="sidebar-item">
                    {item.title}
                </Link>

            ))}
        </div>
    );
};

export default Sidebar;
