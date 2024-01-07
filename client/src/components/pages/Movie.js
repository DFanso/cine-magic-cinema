import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTicketAlt, FaPlayCircle } from "react-icons/fa";
import "../css/Movie.css";
import Testimonial from "../Testimonial-Section.js";
import { TailSpin } from "react-loader-spinner";
import { useLoading } from "../LoadingContext.js";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Chat from "../Chat";
import { HttpStatusCode } from "axios";

const MovieFeedbackForm = () => {
  var { id } = useParams();
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleFeedbackChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();

    const jwtToken = localStorage.getItem("token"); // Replace with your actual key

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_PATH}/feedbacks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            movieId: id, // Assuming 'id' is the movie ID from useParams()
            rating: rating,
            comment: message,
          }),
        }
      );

      if (!response.ok) {
        throw response;
      }

      // Handle success
      Swal.fire({
        title: "Success!",
        text: "Your feedback has been submitted.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Optionally reset form or state here
      setMessage("");
      setRating(0);
    } catch (error) {
      if (error.status === 404) {
        Swal.fire({
          title: "Error!",
          text: "You have to purchase the movie first!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Error submitting feedback:", error);
        Swal.fire({
          title: "Error!",
          text: "There was a problem submitting your feedback.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
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
                  className={`feedback-star ${
                    ratingValue <= (hover || rating) ? "filled" : "empty"
                  }`}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(rating)}
                  onClick={() => setRating(ratingValue)}
                >
                  &#9733; {/* This is the HTML entity for a star character */}
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
  const [feedbacks, setFeedbacks] = useState([]);
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  var { id } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_PATH}/movies/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovieData(data);

        const feedbackResponse = await fetch(
          `${process.env.REACT_APP_API_PATH}/feedbacks/movie/${id}`
        );
        if (feedbackResponse.ok) {

          const feedbackData = await feedbackResponse.json();
          setFeedbacks(feedbackData);
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to load movie data.",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/"); // Redirect to home page using navigate
          }
        });
      } finally {
        setLoading(false);
      }
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
              <Link to={`/booking/${id}`} className="movie-action">
                <FaTicketAlt className="icon" />
                <span className="movie-small-text">
                  Buy <b>Tickets</b> Online
                </span>
              </Link>

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
                  {movieData.description || "Description not available"}
                </p>
              </section>
              <section className="cast">
                <h2>CAST</h2>
                <div className="cast-table">
                  {movieData.cast ? (
                    movieData.cast.join(", ")
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
                      {movieData.directedBy || "Director not available"}
                    </span>
                  </div>
                  <div>
                    <span>Produced by</span>
                    <span>
                      {movieData.producedBy || "Producers not available"}
                    </span>
                  </div>
                  <div>
                    <span>Written by</span>
                    <span>
                      {movieData.writtenBy
                        ? movieData.writtenBy.join(", ")
                        : "Writers not available"}
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <Testimonial movieId={id} />
          <MovieFeedbackForm />
        </div>
      )}
      <Chat />
    </div>
  );
}

export default MoviePage;
