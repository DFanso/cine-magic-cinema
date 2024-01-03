import React, { useState } from "react";
import "../css/Contact.css";

import axios from "axios";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
import { useLoading } from "../LoadingContext.js";
const ContactPage = () => {
  const { loading, setLoading } = useLoading();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_API_PATH}/email/contact`,
        formData
      );
      setLoading(false);
      // Display SweetAlert success message
      Swal.fire(
        "Success!",
        "Your message has been sent successfully.",
        "success"
      );
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      // Handle error (e.g., showing an error message)
      Swal.fire("Error", "There was a problem sending your message.", "error");
    }
  };
  return (
    <div className={loading ? "loading-overlay" : ""}>
      {loading && (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
      )}
      <div className={`contact-page-wrapper ${loading ? "blurred" : ""}`}>
        <div className="contact-sec">
          <div className="contact-container">
            <div className="contact-form">
              <h2>
                If you wish to contact us via email please fill the following
                form and we will get in touch with you at the earliest.
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    required
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Ex: email@email.com"
                    required
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">Mobile Number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone Ex: 0xxxxxxxxx"
                    required
                    onChange={handleChange}
                    value={formData.phone}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                    value={formData.message}
                  ></textarea>
                </div>
                {/* Include CAPTCHA here */}
                <div className="contact-btn-div">
                  <button type="submit" className="contact-btn">
                    NEXT
                  </button>
                </div>
              </form>
            </div>
            <div className="contact-info">
              <div className="info-section">
                <h3>MARKETING CONTACT DETAILS</h3>
                <p>0711200220 - Galagedara</p>
                <p>galagedara@cinemagic.com</p>
              </div>
              <div className="info-section">
                <h3>THEATER CONTACT DETAILS</h3>
                <p>CCC Cinema - 0112083064</p>
                <p>Cinemagic - 0112325266</p>
              </div>
              <div className="info-section">
                <h3>HELP DESK</h3>
                <p>(09.00 am - 06.00 pm Monday - Friday)</p>
                <p>0112083063 / 0703387602</p>
                <p>helpdesk@cinemagic.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default ContactPage;
