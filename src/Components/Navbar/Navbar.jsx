import React, { useState, useEffect } from "react";
import { LayoutDashboard, Instagram, Github, Linkedin } from "lucide-react";
import "./Navbar.css";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

function Navbar({ moveBetweenPages, mobile }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [position, setPosition] = useState({ top: 30, right: 70 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page) => {
    moveBetweenPages(page);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      const newX = window.innerWidth - e.clientX - rel.x;
      const newY = e.clientY - rel.y;
      setPosition({ top: newY, right: newX });
    };

    const stopDragging = () => setDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopDragging);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
    };
  }, [dragging, rel]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    const relX = window.innerWidth - e.clientX - position.right;
    const relY = e.clientY - position.top;
    setRel({ x: relX, y: relY });
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const relX = window.innerWidth - touch.clientX - position.right;
    const relY = touch.clientY - position.top;
    setRel({ x: relX, y: relY });
    setDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
    const newX = window.innerWidth - touch.clientX - rel.x;
    const newY = touch.clientY - rel.y;
    setPosition({ top: newY, right: newX });
  };

  const handleTouchEnd = () => setDragging(false);

  return ReactDOM.createPortal(
    <div className="mobile_nav_app">
      {mobile ? (
        <button
          className="mobile_menu_button"
          onClick={toggleSidebar}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            top: `${position.top}px`,
            right: `${position.right}px`,
            cursor: "grab",
          }}
        >
          <LayoutDashboard size={24} />
        </button>
      ) : null}

      <div
        className={`mobile_sidebar ${
          isSidebarOpen ? "mobile_sidebar_open" : ""
        }`}
      >
        <div className="mobile_sidebar_header">
          <button
            className={`mobile_close_button ${
              isSidebarOpen ? "mobile_close_button_animate" : ""
            }`}
            onClick={toggleSidebar}
          >
            ×
          </button>
        </div>

        <nav className="mobile_nav">
          {[
            "About Us",
            "Events",
            "Speakers",
            "Timeline",
            "Team",
            "Gallery",
            "Hackathon",
            "Contact Us",
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => handlePageChange(index)}
              className={`mobile_nav_item ${
                isSidebarOpen ? "mobile_nav_item_animate" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item}
            </div>
          ))}
          <Link to="/registration">
            <div
              className={`mobile_nav_item ${
                isSidebarOpen ? "mobile_nav_item_animate" : ""
              }`}
              style={{
                animationDelay: `${8 * 0.1}s`,
                backgroundColor: "rgba(47, 81, 108, 0.7)",
                borderRadius: "30px",
                textAlign: "center",
                padding: "6px 30px",
              }}
            >
              Register
            </div>
          </Link>
        </nav>

        {/* Social Media Icons */}
        <div
          className={`social_icons ${
            isSidebarOpen ? "social_icons_animate" : ""
          }`}
        >
          <a
            href="https://www.instagram.com/jiitopticachapter/"
            target="_blank"
            rel="noopener noreferrer"
            className="social_icon"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://github.com/jiitopticachapter"
            target="_blank"
            rel="noopener noreferrer"
            className="social_icon"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/company/jiitopticachapter/"
            target="_blank"
            rel="noopener noreferrer"
            className="social_icon"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>

      <div
        className={`mobile_overlay ${
          isSidebarOpen ? "mobile_overlay_visible" : ""
        }`}
        onClick={toggleSidebar}
      ></div>
    </div>,
    document.body
  );
}

export default Navbar;
