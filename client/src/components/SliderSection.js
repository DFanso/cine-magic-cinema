import React from "react";
import "./css/SliderSection.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCards from "../MovieCards.json";

function SliderSection() {
  const settings = {    
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <div className="slider">
        <h1 id="cards">Coming soon</h1>
        <Slider {...settings}>
          {MovieCards.map((item) => (
            <div className="card">
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
