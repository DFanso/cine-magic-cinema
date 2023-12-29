import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaTicketAlt, FaPlayCircle } from "react-icons/fa";
import "../css/Movie.css";
import Testimonial from "../Testimonial-Section.js";
import { TailSpin } from "react-loader-spinner";
import { useLoading } from "../LoadingContext.js";

const MovieFeedbackForm = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleFeedbackChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic
    console.log({ message, rating });
  };

  return (
    <div className="feedback-section">
      <div className="feedback-container">
        <h2>Rate this Movie !</h2>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            name="message"
            placeholder="Message"
            onChange={handleFeedbackChange}
            value={message}
          ></textarea>
          <div className="star-rating">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <span
                  key={index}
                  className={`star ${ratingValue <= (hover || rating) ? 'filled' : 'empty'}`}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setRating(ratingValue)}
                >
                  &#9733;
                </span>
              );
            })}
          </div>
          <div className="feedback-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};


function MoviePage() {
  const [movieData, setMovieData] = useState({});
  const { loading, setLoading } = useLoading();
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/movies/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMovieData(data);
      setLoading(false);
    };
    fetchMovieData();
  }, [id, setLoading]);

  return (
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
          <Testimonial />
          <MovieFeedbackForm />

        </div>
      )}
    </div>
  );
}

export default MoviePage;
