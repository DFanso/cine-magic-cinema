import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // If you're using PropTypes
import "./css/Cards.css";

function CardItem({ src, text, path, label }) {
  const [loading, setLoading] = useState(true);
  console.log(path);
  useEffect(() => {
    // Simulate a network request
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <li className={`cards__item ${loading ? "loading" : ""}`}>
      <Link className="cards__item__link" to={path}>
        {loading ? (
          <>
            <div
              className="card_image loading"
              aria-label="Loading image"
            ></div>
            <div
              className="card_title loading"
              aria-label="Loading title"
            ></div>
            <div
              className="card_description loading"
              aria-label="Loading description"
            ></div>
          </>
        ) : (
          <>
            <figure className="cards__item__pic-wrap" data-category={label}>
              <img
                src={src}
                alt="Movie"
                className="cards__item__img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "path_to_default_image.jpg";
                }}
              />
            </figure>
            <div className="cards__item__info">
              <h5 className="cards__item__text">{text}</h5>
            </div>
          </>
        )}
      </Link>
    </li>
  );
}

// PropTypes for type checking (optional but recommended)
CardItem.propTypes = {
  src: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default CardItem;
