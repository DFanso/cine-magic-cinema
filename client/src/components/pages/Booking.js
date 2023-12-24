import React, { useState } from "react";
import "../css/Booking.css"; // Make sure to import the CSS file
import { Link } from "react-router-dom";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const dates = ["Mon, 18 Dec", "Tue, 19 Dec", "Wed, 20 Dec", "Sun, 31 Dec"];

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="booking-container">
      <div className="showtimes">
        <h1 className="booking-movie-title">AQUAMAN AND THE LOST KINGDOM</h1>
        <div className="cinema">
          <div className="showtimes-sec">
            <span className="showtime-span">SHOWTIMES</span>
            <div>
              <select
                className="time-select"
                value={selectedDate}
                onChange={handleChange}
              >
                {dates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* <h2>AQUAMAN AND THE LOST KINGDOM</h2> */}
          <div className="sessions-one sessions gold-class">
            <span>GOLD CLASS</span>
            <Link to="/Seating">
              <button>04:15 PM</button>
              <button>07:00 PM</button>
              <button>10:00 PM</button>
            </Link>
          </div>
          <div className="sessions atmos">
            <span>ATMOS</span>
            <Link to="/seating">
              <button>11:30 AM</button>
              <button>02:00 PM</button>
              <button>04:30 PM</button>
              <button>07:00 PM</button>
              <button>09:30 PM</button>
            </Link>
          </div>
          <div className="cinema">
            {/* <h2>LIBERTY BY SCOPE CINEMAS - Colpetty</h2> */}
            <div className="sessions digital-3d">
              <span>Digital 3D</span>
              <Link to="/Seating">
                <button>10:00 AM</button>
                <button>01:15 PM</button>
                <button>04:00 PM</button>
                <button>09:30 PM</button>
                <button>09:45 PM</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="aside">
        <img src="/images/Aquaman-portrait-cover.jpg" alt="Aquaman Poster" />
        <div className="cta">
          <h2>AQUAMAN AND THE LOST KINGDOM (3D)</h2>
          <p>NOW SCREENING</p>
          <a href="https://youtu.be/UGc5Tzz19UY?si=I-mAbcrD6ZYayemB">
            <button>WATCH TRAILER</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Booking;
