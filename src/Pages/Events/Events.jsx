import React, { useState } from "react";
// import './normalize.scss'; // Normalize CSS
// import './font-awesome.min.scss'; // Font Awesome icons
import "./demo.scss"; // Demo specific styles

// Assuming Card component will be created in './Card.jsx'
import Card from "./Card"; // Import the Card component
import { cardData } from "./data.js"; // Import data from data.js
import { dummydata } from "./dummydata.js";

function Events({ setShareZindex }) {
  const [openingCardKey, setOpeningCardKey] = useState(null); // Track which card is open
  const [showbg, setShowbg] = useState(false);

  const handleCardOpening = (cardKey) => {
    setOpeningCardKey(cardKey);
    setShareZindex(true);
    setTimeout(() => {
      setShowbg(true);
    }, 3300);
  };

  const handleCardClosing = () => {
    // setShowbg(false);
    setOpeningCardKey(null);
    setShareZindex(false);
  };

  return (
    <div className="container_final demo-3_final">
      <div className="top-fade-mask"></div>
      <div
        className="stars evt-stars "
        style={{
          backgroundColor: "#1a2737",
        }}
      ></div>
      <div className="content_final">
        <div
          className="click-guide"
          style={{
            color: "white",
            position: "absolute",
            top: "28px",
            // width: "100%",
            textAlign: "center",
            // backgroundColor: "yellow",
            opacity: "0.4",
          }}
        >
          [ Click the images to View Details ]
        </div>
        {/* Removed Trianglify pattern container */}
        {/* cards */}
        <div className="wrapper_events" style={{ paddingTop: "60px" }}>
          {/* 
            Render Card components by mapping over data
          */}
          {cardData.map((data) => (
            <>
              <Card
                key={data.id}
                cardKey={data.id} // Pass the key explicitly as a prop
                openingCardKey={openingCardKey} // Pass the state of which card is open
                onOpening={handleCardOpening} // Pass the opening handler
                onClosing={handleCardClosing} // Pass the closing handler
                // Pass other data for card content
                imgSrc={data.imgSrc}
                title={data.title}
                date={data.date}
                Description={data.Description} // Re-added copy data
                location={data.location} // Re-added location
                venue={data.venue} // Re-added venue
                time={data.time} // Re-added time
                faq={data.faq} // Re-added FAQ data
                rules_link={data.rules_link} // Re-added rules link
                contact_number={data.contact_number} // Re-added contact numbers
                showbg={showbg}
                setShowbg={setShowbg}
                form_link={data.form_link}
              />
            </>
          ))}
        </div>
        {/* /wrapper */}
      </div>
      {/* /content */}

      {/* Related demos */}
    </div>
  );
}

export default Events;
