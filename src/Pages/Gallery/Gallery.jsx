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
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778399/Jscop%207.O/Rename9_jmme31.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778399/Jscop%207.O/Rename7_stegmk.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778398/Jscop%207.O/Rename8_zqvkiy.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778398/Jscop%207.O/Rename4_os4fik.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778398/Jscop%207.O/Rename6_bctff3.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778398/Jscop%207.O/Rename5_pqsamb.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778398/Jscop%207.O/Rename3_uylaqi.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778397/Jscop%207.O/Rename2_u3zffm.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778397/Jscop%207.O/Rename0_a7mb1l.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778397/Jscop%207.O/Rename1_ol5uav.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778400/Jscop%207.O/Rename10_dluajo.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778399/Jscop%207.O/Rename12_kmsxkv.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778400/Jscop%207.O/Rename13_o5osyx.jpg",
    "https://res.cloudinary.com/dcuc1uetk/image/upload/v1745778400/Jscop%207.O/Rename14_rxthvj.jpg",

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
          className={`book-modal-overlay ${isClosing ? "closing" : ""
            }`}
          onClick={startCloseModal}
        >
          <div className={`book-modal ${isClosing ? "closing" : ""}`}>
            <img
              src={selectedBook}
              className="book-modal-image"
              alt="Selected book"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="gal-close-button"
              onClick={startCloseModal}
            >
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
