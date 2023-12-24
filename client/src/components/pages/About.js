import React from "react";
import "../css/About.css"; 

const About = () => {
  return (
      <div className="about-us">
        <h1 className="title">ABOUT CINEMAGIC</h1>
        <p className="description">
          Cinemagic stands as a beacon of innovation in Sri Lanka's cinematic
          landscape, dedicated to elevating the movie-going experience to
          unprecedented heights. Our commitment is to kindle the nostalgia of
          classic film theatres while infusing it with cutting-edge technology
          and luxurious comfort that meets, and exceeds, international
          standards. At Cinemagic, we believe that watching a movie is an art
          form that should stir the soul and inspire the senses.
        </p>
        <div className="media-container">
          <img
            src="/images/about-cover-3.jpg"
            alt="CineMagic About cover"
            className="feature-image"
          />
        </div>
        <div className="vision-mission">
          <div className="vision">
            <h2>VISION</h2>
            <p>
              Cinemagic envisions becoming the pioneer of a revolutionary
              cinematic journey in Sri Lanka, transcending traditional movie
              experiences to offer a multi-sensory escapade.{" "}
            </p>
          </div>
          <div className="mission">
            <h2>MISSION</h2>
            <p>
              Our mission is to curate a cinematic haven where the magic of
              movies is alive in every detail. At Cinemagic, we are committed to
              delivering a diverse array of world-class filmic experiences.
            </p>
          </div>
        </div>
      </div>
  );
};

export default About;
