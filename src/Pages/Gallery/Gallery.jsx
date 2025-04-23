import React, { useState, useEffect } from "react";
import "./Gallery.scss";

const Gallery = () => {
  // State to track which book is selected for the modal
  const [selectedBook, setSelectedBook] = useState(null);
  // State to control the visibility of the modal (for smooth exit animation)
  const [isClosing, setIsClosing] = useState(false);

  // Book image URLs
  const bookImages = [
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book10.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book02.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book03.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book04.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book05.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book06.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book07.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book08.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book09.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/book01.jpg",
  ];

  // Duplicate the array to match the original HTML
  const allBookImages = [...bookImages, ...bookImages];

  // Handle book click
  const handleBookClick = (index) => {
    // Prevent opening if another modal is in the process of closing
    if (isClosing) return;
    setSelectedBook(allBookImages[index]);
  };

  // Start the closing animation
  const startCloseModal = () => {
    setIsClosing(true);
    // Set a timeout to match the CSS animation duration
    setTimeout(() => {
      setSelectedBook(null);
      setIsClosing(false);
    }, 100); // Matches the exit animation duration
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && selectedBook) {
        startCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedBook]);

  return (
    <div className="book-grid-container">
      <ul className="book-grid">
        {allBookImages.map((src, index) => (
          <li
            key={index}
            className="book-item"
            onClick={() => handleBookClick(index)}
          >
            <img
              className="gal_img"
              src={src}
              alt={`Book cover ${index + 1}`}
            />
          </li>
        ))}
      </ul>

      {/* Modal for displaying the selected book */}
      {selectedBook && (
        <div
          className={`book-modal-overlay ${isClosing ? "closing" : ""}`}
          onClick={startCloseModal}
        >
          <div className={`book-modal ${isClosing ? "closing" : ""}`}>
            <img
              src={selectedBook}
              className="book-modal-image"
              alt="Selected book"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="gal-close-button" onClick={startCloseModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
