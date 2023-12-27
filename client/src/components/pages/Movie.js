import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaTicketAlt, FaPlayCircle } from "react-icons/fa";
import "../css/Movie.css";
import Testimonial from "../Testimonial-Section.js";
import { TailSpin } from "react-loader-spinner";
import { useLoading } from "../LoadingContext.js";

function MoviePage() {
  const [movieData, setMovieData] = useState({});
  const { loading, setLoading } = useLoading();
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_PATH}/movies/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, setLoading]);

  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission, e.g., sending data to a server
    console.log(feedback);
  };

  return (
    // {tokenExists ? <UserNavbar /> : <Navigation />}
    <div className="movie">
      <div
        className="movie-cover"
        style={{ backgroundImage: `url('${movieData.bannerImage}')` }}
      >
        {loading ? (
          <TailSpin color="#00BFFF" height={100} width={100} />
        ) : (
          <div className="movie-info">
            <h1 className="movie-title">{movieData.name}</h1>
            <div className="movie-actions">
              <a href="/booking" className="movie-action">
                <FaTicketAlt className="icon" />
                <span className="movie-small-text">
                  Buy <b>Tickets</b> Online
                </span>
              </a>
              <a
                href={movieData.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="movie-action"
              >
                <FaPlayCircle className="icon" />
                <span className="movie-small-text">
                  Watch <b>Trailer</b>
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
      {!loading && (
        <div className="movie-detail-feedback-wrapper">
          <div className="movie-details">
            <div className="whole-movie-details">
              <section className="storyline">
                <h2>DESCRIPTION</h2>
                <p className="movie-des-p">
                  {movieData.Plot || "Description not available"}
                </p>
              </section>
              <section className="cast">
                <h2>CAST</h2>
                <div className="cast-table">
                  {movieData.Actors ? (
                    movieData.Actors.split(", ").map((actor, index) => (
                      <div key={index}>
                        <span>{actor}</span>
                      </div>
                    ))
                  ) : (
                    <div>No cast information available.</div>
                  )}
                </div>
              </section>
              <section className="team">
                <h2>TEAM</h2>
                <div className="team-table">
                  <div>
                    <span>Directed by</span>
                    <span>
                      {movieData.Director || "Director not available"}
                    </span>
                  </div>
                  <div>
                    <span>Produced by</span>
                    <span>
                      {movieData.Production || "Producers not available"}
                    </span>
                  </div>
                  <div>
                    <span>Written by</span>
                    <span>{movieData.Writer || "Writers not available"}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="feedback-section">
            <div className="feedback-container">
              <h2>Movie Feedback</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  onChange={handleChange}
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  onChange={handleChange}
                ></textarea>
                <div className="feedback-btn">
                  <button type="submit">Send Request</button>
                </div>
              </form>
            </div>
          </div>

          <Testimonial />
        </div>
      )}
    </div>
  );
}
export default MoviePage;
