import React, { useState } from "react";
// import './normalize.scss'; // Normalize CSS
// import './font-awesome.min.scss'; // Font Awesome icons
import "./demo.scss"; // Demo specific styles

// Assuming Card component will be created in './Card.jsx'
import Card from "./Card"; // Import the Card component
import { cardData } from "./data.js"; // Import data from data.js
import { dummydata } from "./dummydata.js";

function Events() {
  const [openingCardKey, setOpeningCardKey] = useState(null); // Track which card is open

  const handleCardOpening = (cardKey) => {
    setOpeningCardKey(cardKey);
  };

  const handleCardClosing = () => {
    setOpeningCardKey(null);
  };

  return (
    <div className="container_final demo-3_final ">
      <div
        className="stars events-box"
        style={{
          backgroundColor: "#1a2737",
        }}
      ></div>
      <div className="content_final">
        {/* Removed Trianglify pattern container */}
        {/* cards */}
        <div className="wrapper_events">
          {/* 
            Render Card components by mapping over data
          */}
          {dummydata.map((data) => (
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
            />
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
