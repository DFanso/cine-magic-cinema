import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/Seating.css";
import clsx from "clsx";

import { TailSpin } from "react-loader-spinner";
import { useLoading } from "../LoadingContext.js";

export default function Seating() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [seatPrice, setSeatPrice] = useState(0);
  const { id, showTimeId } = useParams();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios(
          `${process.env.REACT_APP_API_PATH}/movies/${id}/show-times/${showTimeId}`
        );
        setMovieDetails(response.data.movieId);
        setBookedSeats(response.data.Seats.bookedSeats);
        setStartTime(convertTo12Hour(response.data.startTime));
        setSeatPrice(response.data.price);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
    fetchData();
  }, [id, showTimeId]);

  function convertTo12Hour(time) {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const amPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${amPm}`;
  }

  const totalSeats =
    movieDetails && movieDetails.Seats ? movieDetails.Seats.totalSeats : 0;
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  const totalPrice = selectedSeats.length * seatPrice;

  return (
    <div className="App">
      {loading ? (
        <div className="loading-spinner">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <>
          <div className="main-content">
            <Movies movie={movieDetails} startTime={startTime} />
            <ShowCase />
            <Cinema
              bookedSeats={bookedSeats}
              selectedSeats={selectedSeats}
              onSelectedSeatsChange={setSelectedSeats}
            />
            <p className="info">
              You have selected{" "}
              <span className="count">{selectedSeats.length}</span> seats for
              the price of{" "}
              <span className="total">{totalPrice.toFixed(2)}$</span>
            </p>
          </div>

          <div className="seating-aside">
            <img
              src={movieDetails ? movieDetails.coverImage : ""}
              alt={movieDetails ? movieDetails.name : ""}
            />
            <div className="cta">
              <h2>{movieDetails ? movieDetails.name : ""}</h2>
            </div>
            <button className="pay-now-button">Pay Now</button>
          </div>
        </>
      )}
    </div>
  );
}

function Movies({ movie, startTime }) {
  return (
    <div className="Movies">
      <h1 className="seating-movie-title">{movie ? movie.name : ""}</h1>
      <div className="title-seating-div">
        <h1 className="seating-showtime">SHOWTIME</h1>
        <button className="seating-btn">{startTime}</button>
      </div>
    </div>
  );
}

function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <div className="seat-seat-tag">
          <span className="seat" /> <small>N/A</small>
        </div>
      </li>
      <li>
        <div className="seat-seat-tag">
          <span className="seat selected" /> <small>Selected</small>
        </div>
      </li>
      <li>
        <div className="seat-seat-tag">
          <span className="seat occupied" /> <small>Occupied</small>
        </div>
      </li>
    </ul>
  );
}

function Cinema({ bookedSeats, selectedSeats, onSelectedSeatsChange }) {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(selectedSeats.filter((s) => s !== seat));
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }

  return (
    <div className="Cinema">
      <div className="screen" />
      <div className="seats">
        {Array.from({ length: 64 }, (_, i) => i).map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          const isBooked = bookedSeats.includes(seat);
          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                "seat",
                isSelected && "selected",
                isBooked && "occupied"
              )}
              onClick={!isBooked ? () => handleSelectedState(seat) : null}
              onKeyPress={
                !isBooked
                  ? (e) => e.key === "Enter" && handleSelectedState(seat)
                  : null
              }
            />
          );
        })}
      </div>
    </div>
  );
}
