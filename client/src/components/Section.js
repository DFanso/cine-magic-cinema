import React from "react";
import "./css/Section.css";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faCouch,
  faVolumeUp,
  faTicket,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function Section() {
  return (
    <div
      className="section-container"
      style={{
        backgroundImage: "url('/videos/home.gif')",
      }}
    >
      {/* <video src="/videos/home.mp4" autoPlay loop muted /> */}
      <h1 id="section-container">
        cinema magic <br /> at its best
      </h1>
      <p>just a ticket away!</p>

      <div className="social-icons">
        <FontAwesomeIcon icon={faFilm} className="icons" />
        <FontAwesomeIcon icon={faCouch} className="icons" />
        <FontAwesomeIcon icon={faVolumeUp} className="icons" />
        <FontAwesomeIcon icon={faTicket} className="icons" />
        <FontAwesomeIcon icon={faStar} className="icons" />
      </div>
    </div>
  );
}

export default Section;
