import React from "react";
import "../css/Contact.css"; 

const ContactPage = () => {  
  return (
      <div className="contact-page-wrapper">
        <div className="contact-sec">
          <div className="contact-container">
            <div className="contact-form">
              <h2>
                If you wish to contact us via email please fill the following
                form and we will get in touch with you at the earliest.
              </h2>
              <form>
                <div className="input-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Ex: email@email.com"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">Mobile Number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone Ex: 0xxxxxxxxx"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="Message"
                    required
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
      </div>
  );
};

export default ContactPage;
