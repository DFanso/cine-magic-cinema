import React, { useState, useEffect } from "react";
import "../css/Booking.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useLoading } from "../LoadingContext.js";
import { TailSpin } from "react-loader-spinner";
import Chat from "../Chat";

const Booking = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [showTimes, setShowTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const { loading, setLoading } = useLoading();

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hours12 = hours % 12 || 12;
    const amPm = hours < 12 ? "AM" : "PM";
    return `${hours12}:${minutes} ${amPm}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const movieResponse = await axios.get(
          `${process.env.REACT_APP_API_PATH}/movies/${id}`
        );
        const showTimesResponse = await axios.get(
          `${process.env.REACT_APP_API_PATH}/movies/${id}/show-times`
        );

        setMovieDetails(movieResponse.data);
        setShowTimes(showTimesResponse.data);

        // Set the initial selected date to the date of the first show time
        if (showTimesResponse.data.length > 0) {
          setSelectedDate(showTimesResponse.data[0].date);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id, setLoading]);

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };
  return (
    <div className="booking-container">
      {loading ? (
        <TailSpin color="#00BFFF" height={100} width={100} />
      ) : (
        <>
          <div className="showtimes">
            <h1 className="booking-movie-title">
              {movieDetails?.name || "Movie Title"}
            </h1>
            <div className="cinema">
              <div className="showtimes-sec">
                <span className="showtime-span">SHOWTIMES</span>
                <div>
                  <select
                    className="time-select"
                    value={selectedDate}
                    onChange={handleChange}
                  >
                    {showTimes.map((showTime, index) => {
                      const date = new Date(showTime.date);
                      const formattedDate = date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      });
                      return (
                        <option key={index} value={showTime.date}>
                          {formattedDate}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="sessions-one sessions gold-class">
                <span>GOLD CLASS</span>
                {showTimes
                  .filter(
                    (showTime) =>
                      new Date(showTime.date).toDateString() ===
                      new Date(selectedDate).toDateString()
                  )
                  .map((filteredShowTime, index) => {
                    const startTime12hr = convertTo12HourFormat(
                      filteredShowTime.startTime
                    );
                    const showTimeId = filteredShowTime._id;
                    return (
                      <Link key={index} to={`/Seating/${showTimeId}/${id}`}>
                        <button>{startTime12hr}</button>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="aside">
            <img
              src={
                movieDetails?.coverImage || "/images/default-movie-poster.jpg"
              }
              alt={`${movieDetails?.name} Poster`}
            />
            <div className="cta">
              <h2>
                {movieDetails?.name
                  ? `${movieDetails.name} (3D)`
                  : "Movie Title (3D)"}
              </h2>
              <p>NOW SCREENING</p>
              <a href={movieDetails?.trailer || "#"}>
                <button>WATCH TRAILER</button>
              </a>
            </div>
          </div>
        </>
      )}
      <Chat />
    </div>
  );
};

export default Booking;
