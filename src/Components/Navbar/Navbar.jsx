import React, { useState, useEffect } from "react";
import { LayoutDashboard } from "lucide-react";
import "./Navbar.css";

function Navbar({ moveBetweenPages }) {
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

  // 📱 Touch events for mobile drag
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

  return (
    <div className="mobile_nav_app">
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

      <div
        className={`mobile_sidebar ${
          isSidebarOpen ? "mobile_sidebar_open" : ""
        }`}
      >
        <div className="mobile_sidebar_header">
          <div className="mobile_user_info">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
              alt="User"
              className="mobile_user_avatar"
            />
            <div className="mobile_user_details">
              <h3>JSCOP 7.0</h3>
              <p>Optica JIIT Student Chapter</p>
            </div>
          </div>
          <button className="mobile_close_button" onClick={toggleSidebar}>
            ×
          </button>
        </div>

        <nav className="mobile_nav">
          <div onClick={() => handlePageChange(0)} className="mobile_nav_item">
            <span className="mobile_nav_icon">⬜</span>
            Dashboard
          </div>
          <div onClick={() => handlePageChange(1)} className="mobile_nav_item">
            <span className="mobile_nav_icon">📈</span>
            Activity
          </div>
          <div onClick={() => handlePageChange(2)} className="mobile_nav_item">
            <span className="mobile_nav_icon">📊</span>
            Traffic
          </div>
          <div onClick={() => handlePageChange(3)} className="mobile_nav_item">
            <span className="mobile_nav_icon">📊</span>
            Statistic
          </div>
          <div onClick={() => handlePageChange(4)} className="mobile_nav_item">
            <span className="mobile_nav_icon">📄</span>
            Invoices
          </div>
          <div onClick={() => handlePageChange(5)} className="mobile_nav_item">
            <span className="mobile_nav_icon">💰</span>
            Wallet
          </div>
          {/* <a href="#" className="mobile_nav_item">
            <span className="mobile_nav_icon">🔔</span>
            Notification
          </a> */}
        </nav>

        <div className="mobile_messages">
          <h4>MESSAGES</h4>
          <div className="mobile_message_item">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
              alt="Erik"
            />
            <span>Erik Gunsel</span>
          </div>
          <div className="mobile_message_item">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
              alt="Emily"
            />
            <span>Emily Smith</span>
          </div>
          {/* <div className="mobile_message_item">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop"
              alt="Arthur"
            />
            <span>Arthur Ateik</span>
          </div> */}
        </div>

        <div className="mobile_task_card">
          <h3>Join JSCOP 2025!</h3>
          <p>
            Experience the annual flagship event of Optica JIIT Student Chapter
          </p>
          <button className="mobile_add_task">+ &nbsp; Register Now</button>
        </div>
      </div>

      <div
        className={`mobile_overlay ${
          isSidebarOpen ? "mobile_overlay_visible" : ""
        }`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
}

export default Navbar;
