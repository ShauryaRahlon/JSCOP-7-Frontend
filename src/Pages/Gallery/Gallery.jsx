import { useState, useEffect } from "react";
import "./Gallery.scss";
import cross_icon from "/images/cross_icon.png"; // Import the cross icon

const Gallery = () => {
  // State to track which book is selected for the modal
  const [selectedBook, setSelectedBook] = useState(null);
  // State to control the visibility of the modal (for smooth exit animation)
  const [isClosing, setIsClosing] = useState(false);

  // Book image URLs
  const bookImages = [
    "/images/Event_Images/Rename0.jpg",
    "/images/Event_Images/Rename1.webp",
    "/images/Event_Images/Rename2.webp",
    "/images/Event_Images/Rename3.webp",
    "/images/Event_Images/Rename4.jpg",
    "/images/Event_Images/Rename5.JPG",
    "/images/Event_Images/Rename6.JPG",
    "/images/Event_Images/Rename7.JPG",
    "/images/Event_Images/Rename8.JPG",
    "/images/Event_Images/Rename9.JPG",
    "/images/Event_Images/Rename0.jpg",
    "/images/Event_Images/Rename1.webp",
    "/images/Event_Images/Rename2.webp",
    "/images/Event_Images/Rename3.webp",
    "/images/Event_Images/Rename4.jpg",
    "/images/Event_Images/Rename5.JPG",
    "/images/Event_Images/Rename6.JPG",
    "/images/Event_Images/Rename7.JPG",
    "/images/Event_Images/Rename8.JPG",
    "/images/Event_Images/Rename9.JPG",



  ];

  // Handle book click
  const handleBookClick = (index) => {
    // Prevent opening if another modal is in the process of closing
    if (isClosing) return;
    setSelectedBook(bookImages[index]);
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
    <div className="book-grid-container gallary-box">
      <div
        className="stars"
        style={{
          backgroundColor: "#16212c",
        }}
      ></div>
      <ul className="book-grid">
        {bookImages.map((src, index) => (
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
              <img
                src={cross_icon}
                alt="cross"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
