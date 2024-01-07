import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios for making API requests
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/Testimonial-Section.css";

const Testimonials = (movieId) => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_PATH}/feedbacks/movie/${movieId.movieId}`
        );
        const formattedTestimonials = response.data.map((item) => ({
          quote: item.comment,
          name: `${item.userId.firstName} ${item.userId.lastName}`,
          position: "Movie Viewer",
          rating: item.rating,
        }));
        setTestimonials(formattedTestimonials);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status !== 404) {
            // Handle all errors except 404
            console.error("An error occurred:", error);
          }
        } else {
          // Handle non-Axios errors
          console.error("An error occurred:", error);
        }
        // If the error is 404, it will not be caught here
      }
    };

    fetchTestimonials();
  }, [movieId.movieId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // StarRating component
  const StarRating = ({ rating }) => {
    const totalStars = 5;

    return (
      <div className="star-rating">
        {[...Array(totalStars)].map((_, index) => (
          <span key={index} className="star">
            {index < rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="testimonial-section">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <h5 className="testimonial-name">{testimonial.name}</h5>
            <p className="testimonial-quote">{testimonial.quote}</p>
            <StarRating rating={testimonial.rating} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
