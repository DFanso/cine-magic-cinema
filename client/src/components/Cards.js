import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import "./css/Cards.css";
import axios  from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Movie from "../Movie.json";

function Cards() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Function to fetch movie data from API
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_PATH}/movies?nowShowing=true`
        );

        

        //const data = await response.json();

        console.log(response.data)

        // Transforming API response to match the cardData format
        const transformedMovies = response.data.map((movie) => ({
          id: movie._id,
          title: movie.name,
          image: movie.coverImage,
          path: `/movie/${movie._id}`,
          // Updated path to include movie ID
        }));

        setMovies(transformedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    // <div className="cards">
    //   <h1 id="cards">now showing</h1>
    //   <div className="cards__container">
    //     <ul className="cards__items">
    //       {movies.map((movie) => {
    //         return (
    //           <CardItem
    //             key={movie.id}
    //             src={movie.image}
    //             text={movie.title}
    //             label="Movies"
    //             path={movie.path}
    //           />
    //         );
    //       })}
    //     </ul>
    //   </div>
    // </div>
    <div className="cards">
      <h1 id="cards">now showing</h1>
      <Slider {...settings}>
        {Movie.map((item) => (
          <div key={item.id}>
            <CardItem
              src={item.image}
              text={item.title}
              label="Movies"
              path={item.path}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Cards;
