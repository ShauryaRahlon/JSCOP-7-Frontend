import React, { useState } from 'react';
// import './normalize.scss'; // Normalize CSS
// import './font-awesome.min.scss'; // Font Awesome icons
import './demo.scss'; // Demo specific styles

// Assuming Card component will be created in './Card.jsx'
import Card from './Card'; // Import the Card component
import { cardData } from './data.js'; // Import data from data.js

function Events() {
    const [openingCardKey, setOpeningCardKey] = useState(null); // Track which card is open

    const handleCardOpening = (cardKey) => {
        setOpeningCardKey(cardKey);
    };

    const handleCardClosing = () => {
        setOpeningCardKey(null);
    };

    return (
        <div className="container_final demo-3_final">
            <header className="codrops-header_final">
                {/* Header content remains the same */}
                <div className="codrops-links_final"></div>
                <h1>Upcoming Events <span>Polygonal clip, reversed pattern.</span></h1>
                {/* <nav className="codrops-demos_final"> */}
                {/* <a className="current-demo_final" href="#">Demo 3 (React)</a> Updated link */}
                {/* </nav> */}
            </header>
            <div className="content_final">
                {/* Removed Trianglify pattern container */}
                {/* cards */}
                <div className="wrapper_events">
                    {/* 
            Render Card components by mapping over data
          */}
                    {cardData.map(data => (
                        <Card
                            key={data.id}
                            cardKey={data.id} // Pass the key explicitly as a prop
                            openingCardKey={openingCardKey} // Pass the state of which card is open
                            onOpening={handleCardOpening} // Pass the opening handler
                            onClosing={handleCardClosing} // Pass the closing handler
                            // Pass other data for card content
                            imgSrc={data.imgSrc}
                            title={data.title}
                            subtitle={data.subtitle} // Re-added subtitle
                            authorImg={data.authorImg} // Re-added authorImg
                            authorName={data.authorName} // Re-added authorName
                            date={data.date}
                            copy={data.copy} // Re-added copy data
                            secondaryImgSrc={data.secondaryImgSrc} // Pass secondary image source
                        />
                    ))}
                </div>
                {/* /wrapper */}
            </div>{/* /content */}

            {/* Related demos */}

        </div>
    );
}

export default Events;
