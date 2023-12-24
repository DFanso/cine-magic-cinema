import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faTimes,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./css/UserNavbar.css";

function UserNavbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="user-navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <FontAwesomeIcon id="faFilm" icon={faFilm} />
            <span style={{ color: "#F6C20A" }}>CINE</span>
            <span style={{ color: "white" }}>MAGIC</span>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <FontAwesomeIcon
              icon={click ? faTimes : faBars}
              id={click ? "id-faTimes" : "id-faBars"}
            />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact-page"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/user-profile"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                user-profile
              </Link>
            </li>
          </ul>
          {button && (
            <Link to="/user-profile" className="icon-link">
              <FontAwesomeIcon icon={faUser} className="user-icon" />
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
export default UserNavbar;
