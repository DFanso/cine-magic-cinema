import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaTicketAlt, FaPlayCircle } from "react-icons/fa";
import "../css/Movie.css";

import { TailSpin } from "react-loader-spinner";
import { useLoading } from "../LoadingContext.js";

function MoviePage() {
  const [movieData, setMovieData] = useState({});
  const [omdbData, setOmdbData] = useState({});

  const { loading, setLoading } = useLoading();

  const { id } = useParams();
  // const tokenExists = localStorage.getItem("token") !== null;
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

        const omdbResponse = await fetch(
          `http://www.omdbapi.com/?&apikey=${
            process.env.REACT_APP_OMDB_API_KEY
          }&t=${encodeURIComponent(data.name)}&y=${data.year}`
        );
        if (!omdbResponse.ok) {
          throw new Error(`HTTP error! Status: ${omdbResponse.status}`);
        }
        const omdbData = await omdbResponse.json();
        setOmdbData(omdbData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);
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
          <div className="movie-details">
            <section className="storyline">
              <h2>DESCRIPTION</h2>
              <p className="movie-des-p">
                {omdbData.Plot || "Description not available"}
              </p>
            </section>
            <section className="cast">
              <h2>CAST</h2>
              <div className="cast-table">
                {omdbData.Actors ? (
                  omdbData.Actors.split(", ").map((actor, index) => (
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
                  <span>{omdbData.Director || "Director not available"}</span>
                </div>
                <div>
                  <span>Produced by</span>
                  <span>
                    {omdbData.Production || "Producers not available"}
                  </span>
                </div>
                <div>
                  <span>Written by</span>
                  <span>{omdbData.Writer || "Writers not available"}</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
  );
}
export default MoviePage;
