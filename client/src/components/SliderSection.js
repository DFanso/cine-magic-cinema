import React, { useEffect, useState } from "react";
import "./css/SliderSection.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

function SliderSection() {
  const [movieCards, setMovieCards] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_PATH}/movies`,
          {
            params: { nowShowing: false },
          }
        );
        const transformedMovies = response.data.map((movie) => ({
          id: movie._id,
          title: movie.name,
          description: movie.description,
          image: movie.coverImage,
        }));
        setMovieCards(transformedMovies);
        console.log(transformedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);
  const settings = {
    infinite: movieCards.length > 3, // Only loop if there are more than 3 movies
    speed: 500,
    slidesToShow: Math.min(3, movieCards.length), // Show up to 3 movies, or fewer if there aren't enough
    slidesToScroll: 1, // Scroll one at a time
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust speed as needed
    arrows: true, // Enable arrows for navigation
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(3, movieCards.length),
          slidesToScroll: 1,
          infinite: movieCards.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, movieCards.length),
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: movieCards.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: movieCards.length > 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <h1 id="cards">Coming soon</h1>
        <Slider {...settings}>
          {movieCards.map((item) => (
            <div key={item.id} className="card">
              <div className="card-top">
                <div className="image-container">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-image"
                  />
                </div>
                <h1>{item.title}</h1>
              </div>
              <div className="card-bottom">
                <h3>{item.description}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SliderSection;
