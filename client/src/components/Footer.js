import React, { useState, useRef } from "react";
import "./css/Footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef(null);

  const validateEmail = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess("");
      emailRef.current.focus();
      setEmail("");
      return;
    }

    setError("");
    setSuccess("Thank you for subscribing!");
    setEmail("");
    setTimeout(() => {
      setSuccess("");
    }, 1500);
  };

  return (
    <div className="footer-container">
      <div className="subscription_links">
        <section className="footer-subscription">
          <p className="footer-subscription-heading">
            Join to receive the latest offers and deals
          </p>
          <p className="footer-subscription-text">
            You can subscribe/unsubscribe any time!
          </p>
          <div className="input-areas">
            <form onSubmit={validateEmail}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="footer-input"
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <Button buttonStyle="btn--outline" type="submit">
                Subscribe
              </Button> */}
              <button type="submit">Subscribe</button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
            </form>
          </div>
        </section>
        <div className="footer-links">
          <div className="footer-link-wrapper">
            <div className="footer-link-items">
              <Link to={"/"}>Home</Link>
              <Link to={"/"}>Buy tickets</Link>
              <Link to={"/about"}>About Us</Link>
              <Link to={"/contact-page"}>Contact Us</Link>
              <Link to={"/login-container"}>Login</Link>
            </div>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to={"/"} className="social-logo">
              <span style={{ color: "#F6C20A" }}>CINE</span>
              <span style={{ color: "white" }}>MAGIC</span>
            </Link>
          </div>
          <small className="website-rights">cinemagic © 2024</small>
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to={"https://www.facebook.com/"}
              target="_blank"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link
              className="social-icon-link instagram"
              to={"https://www.instagram.com/"}
              target="_blank"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link
              className="social-icon-link youtube"
              to={"https://youtube.com/"}
              target="_blank"
              aria-label="Youtube"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
            <Link
              className="social-icon-link twitter"
              to={"https://twitter.com/"}
              target="_blank"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link
              className="social-icon-link linkedin"
              to={"https://www.linkedin.com/"}
              target="_blank"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
