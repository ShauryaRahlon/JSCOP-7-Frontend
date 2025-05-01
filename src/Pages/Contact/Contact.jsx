import React, { useState, useEffect } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,

} from "lucide-react";
import "./Contact.scss";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after component mounts for animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`us-contact-container ${isVisible ? "visible" : ""}`}>
      <div
        className="stars"
        style={{
          backgroundColor: " #1b1e3d",
        }}
      ></div>
      {/* Left Side - Fixed content */}
      <div
        className="us-sidebar"
        style={{ position: "relative", zIndex: "100" }}
      >
        <div className="us-logo-section">
          {/* Logo can be added here if needed */}
          {/* <img src="logo.png" alt="Logo" className="logo" /> */}
          <div>
            <img src="/images/Jscop_logo.png" alt="Logo" className="us-logo" />
          </div>
          <h1 className="us-company-name">Connect With Us</h1>
          <p className="us-tagline">We're always here to help</p>
          <div className="mobile-us">
            <div className="mobile-contact-card">
              <h3>Shantanu Pandey - President</h3>
              {/* <p>President</p> */}
              <p>
                <Phone size={15} /> +91 9876543210
              </p>
              <p>shantanu.pandeydm@gmail.com</p>
            </div>
            <div className="mobile-contact-card">
              <h3>Sai Raj Singh - Vice President</h3>
              {/* <p>Vice President</p> */}
              <p>
                <Phone size={15} /> +91 9123456780
              </p>
              <p> sairajsingh400@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="us-social-media">
          <div className="us-social-icons">
            <a
              href="https://www.facebook.com/jiitopticachapter/"
              className="us-social-icon"
            >
              <Facebook size={24} color="white" />
            </a>
            <a href="https://twitter.com/jiitoptica" className="us-social-icon">
              <Twitter size={24} color="white" />
            </a>
            <a
              href="https://www.instagram.com/jiitopticachapter"
              className="us-social-icon"
            >
              <Instagram size={24} color="white" />
            </a>
            <a
              href="https://www.linkedin.com/company/jiitopticachapter/mycompany/"
              className="us-social-icon"
            >
              <Linkedin size={24} color="white" />
            </a>
            <a
              href="mailto:opticastudentchapterjiit@gmail.com"
              className="us-social-icon"
            >
              <Mail size={24} color="white" />
            </a>
          </div>
        </div>
      </div>

      {/* Right Side - Contact Information */}
      <div className="us-content">
        <div className="us-content-wrapper">
          <div className="us-contact-cards">
            {/* Sales Contact Card */}
            <div className="us-contact-card us-contact-box">
              <div className="us-card-bg"></div>
              <div className="us-card-bg-overlay"></div>

              {/* <div className="us-profile-circle">
                <Phone size={42} className="us-profile-icon" />
              </div> */}
              <div className="us-card-text-container">
                <p className="us-card-title">Shantanu Pandey</p>
                <p className="us-card-subtitle">President</p>

                <div className="us-contact-info">
                  <span>
                    <Phone size={15} /> +91 90261 52678
                  </span>
                  <span>shantan.pandeydm@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="us-contact-card us-contact-box">
              <div className="us-card-bg"></div>
              <div className="us-card-bg-overlay"></div>
              {/* <div className="us-profile-circle">
                <Mail size={42} className="us-profile-icon" />
              </div> */}
              <div className="us-card-text-container">
                <p className="us-card-title">Sai Raj Singh</p>
                <p className="us-card-subtitle">Vice President</p>

                <div className="us-contact-info">
                  <span>
                    <Phone size={15} /> +91 7439 557 090
                  </span>
                  <span>sairajsingh400@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Office Location Card */}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "0",
          width: "100%",
          textAlign: "center",
        }}
      >
        © 2025 JIIT Optica Chapter. All rights reserved.
      </div>
    </div>
  );
};

export default Contact;
