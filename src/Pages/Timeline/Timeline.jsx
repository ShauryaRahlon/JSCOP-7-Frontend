import React, { useState, useEffect, useRef } from "react";
// Import the project's CSS files
import "./inline-styles.css";
import "./component.css";

// We don't need the default App.css or index.css from Vite as we are using the original project's CSS
// import './App.css';

// Data from the original inline script
const day1Data = [
  {
    title: "Super Daddy",
    link: "https://dribbble.com/forefathers",
    mainImage: "/img/Dribbble1/1.jpg", // Paths are relative to the public folder
    canvasImage: "/img/canvas.png",
    wireframeImage: "/img/wireframe.png",
    Detail: {
      title: "Super Daddy",
      time: "10:00 AM - 11:00 AM",
      place: "Room 2, 4th Floor",
    },
  },
  {
    title: "Julien Lavallee",
    // link: "https://dribbble.com/JulienLavallee",
    mainImage: "/img/Dribbble1/2_1.jpg",
    canvasImage: "/img/canvas.png",
    wireframeImage: "/img/wireframe.png",
    Detail: {
      title: "Julien Lavallee",
      time: "11:30 AM - 12:30 PM",
      place: "Room 3, 2nd Floor",
    },
  },
  {
    title: "Mike | Creative Mints",
    link: "https://dribbble.com/creativemints",
    mainImage: "/img/Dribbble1/3.jpg",
    canvasImage: "/img/canvas.png",
    wireframeImage: "/img/wireframe.png",
    Detail: {
      title: "Mike | Creative Mints",
      time: "1:00 PM - 2:30 PM",
      place: "Main Hall, 1st Floor",
    },
  },
  {
    title: "Mike | Creative Mints",
    link: "https://dribbble.com/creativemints",
    mainImage: "/img/Dribbble1/3.jpg",
    canvasImage: "/img/canvas.png",
    wireframeImage: "/img/wireframe.png",
    Detail: {
      title: "Mike | Creative Mints",
      time: "1:00 PM - 2:30 PM",
      place: "Main Hall, 1st Floor",
    },
  },
  {
    title: "Mike | Creative Mints",
    link: "https://dribbble.com/creativemints",
    mainImage: "/img/Dribbble1/3.jpg",
    canvasImage: "/img/canvas.png",
    wireframeImage: "/img/wireframe.png",
    Detail: {
      title: "Mike | Creative Mints",
      time: "1:00 PM - 2:30 PM",
      place: "Main Hall, 1st Floor",
    },
  },
  {
    title: "Mike | Creative Mints",
    link: "https://dribbble.com/creativemints",
    mainImage: "/img/Dribbble1/3.jpg",
    canvasImage: "/img/canvas.png",
    wireframeImage: "/img/wireframe.png",
    Detail: {
      title: "Mike | Creative Mints",
      time: "1:00 PM - 2:30 PM",
      place: "Main Hall, 1st Floor",
    },
  },
];

const day2Data = [
  {
    title: "Cosmin Capitanu",
    link: "https://dribbble.com/Radium",
    mainImage: "/img/Dribbble1/4_2.jpg",
    canvasImage: "/img/canvas.png",
    wireframeImage: "/img/wireframe.png",
    Detail: {
      title: "Cosmin Capitanu",
      time: "3:00 PM - 4:00 PM",
      place: "Conference Room, 5th Floor",
    },
  },
  {
    title: "Forefathers",
    link: "https://dribbble.com/forefathers",
    mainImage: "/img/Dribbble1/1_1.jpg",
    canvasImage: "/img/canvas.png",
    wireframeImage: "/img/wireframe.png",
    Detail: {
      title: "Forefathers",
      time: "4:30 PM - 5:30 PM",
      place: "Exhibition Hall, Ground Floor",
    },
  },
];

// Helper function to load scripts sequentially
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false; // Ensure sequential loading
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.body.appendChild(script);
  });
};

function Timeline() {
  const sectionRef = useRef(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentData, setCurrentData] = useState(day1Data);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const isoLayerRef = useRef(null); // Ref to the isolayer element
  const gridContainerRef = useRef(null); // Ref to the grid container

  const [sectionReachedTop, setSectionReachedTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const top = sectionRef.current.getBoundingClientRect().top;
        // When top edge of section hits top edge of viewport
        setSectionReachedTop(top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to load scripts and initialize grid on mount and when data changes
  useEffect(() => {
    let isoGridInstance = null;

    const initializeGrid = async () => {
      // Destroy previous instance if it exists and has a destroy method
      // Accessing instance might be tricky if stored differently by original script
      const isoLayerElement = isoLayerRef.current;
      if (
        isoLayerElement &&
        isoLayerElement.instance &&
        typeof isoLayerElement.instance.destroy === "function"
      ) {
        try {
          isoLayerElement.instance.destroy();
          isoLayerElement.instance = null; // Clear the reference
          console.log("Previous IsoGrid instance destroyed.");
        } catch (error) {
          console.error("Error destroying previous IsoGrid instance:", error);
        }
      } else {
        // If no instance or destroy method, clear the grid manually before re-rendering might help
        if (gridContainerRef.current) {
          // console.log("Clearing grid container manually (fallback).");
          // gridContainerRef.current.innerHTML = ''; // This might interfere with React's rendering
        }
      }

      // Ensure the grid container is ready (might need a slight delay after React render)
      // Using setTimeout 0 to wait for the next tick after DOM update
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Check if IsoGrid is available (loaded by animOnScroll.js)
      if (typeof window.IsoGrid === "function") {
        console.log("IsoGrid constructor found. Initializing...");
        try {
          isoLayerElement.instance = new window.IsoGrid(isoLayerElement, {
            type: "scrollable",
            transform:
              "translateX(-15vw) translateY(275px) rotateX(45deg) rotateZ(45deg)",
            stackItemsAnimation: {
              properties: function (pos) {
                return {
                  translateZ: (pos + 1) * 50,
                  rotateZ: Math.floor(Math.random() * (3 - -3 + 1)) + -3, // Simplified getRandomInt
                };
              },
              options: function (pos, itemstotal) {
                // Ensure dynamics is loaded
                if (window.dynamics) {
                  return {
                    type: window.dynamics.bezier,
                    duration: 500,
                    points: [
                      { x: 0, y: 0, cp: [{ x: 0.2, y: 1 }] },
                      { x: 1, y: 1, cp: [{ x: 0.3, y: 1 }] },
                    ],
                  };
                } else {
                  console.warn(
                    "dynamics.js not loaded yet for animation options."
                  );
                  return { duration: 500 }; // Fallback
                }
              },
            },
            onGridLoaded: function () {
              console.log("IsoGrid loaded callback triggered.");
              document.body.classList.add("grid-loaded");
            },
          });
          isoGridInstance = isoLayerElement.instance; // Keep track of the instance
        } catch (error) {
          console.error("Error initializing IsoGrid:", error);
        }
      } else {
        console.warn(
          "IsoGrid constructor not found. Grid initialization skipped."
        );
      }
    };

    // Load scripts only once on mount
    if (!window.scriptsLoaded) {
      console.log("Loading external scripts...");
      loadScript("/js/modernizr.custom.js")
        .then(() => loadScript("/js/imagesloaded.pkgd.min.js"))
        .then(() => loadScript("/js/masonry.pkgd.min.js"))
        .then(() => loadScript("/js/dynamics.min.js"))
        .then(() => loadScript("/js/classie.js"))
        .then(() => loadScript("/js/animOnScroll.js")) // This should define IsoGrid
        .then(() => loadScript("/js/main.js")) // This might use IsoGrid or trigger initialization
        .then(() => {
          console.log("All scripts loaded.");
          window.scriptsLoaded = true; // Mark scripts as loaded
          initializeGrid(); // Initialize grid after all scripts are loaded
        })
        .catch((error) => console.error("Script loading failed:", error));
    } else {
      // Scripts already loaded, just re-initialize grid for new data
      console.log("Scripts already loaded. Re-initializing grid for new data.");
      initializeGrid();
    }

    // Cleanup function (optional, might cause issues if scripts add global listeners)
    // return () => {
    //     if (isoGridInstance && typeof isoGridInstance.destroy === 'function') {
    //         try {
    //             isoGridInstance.destroy();
    //             console.log('IsoGrid instance destroyed on component unmount.');
    //         } catch (error) {
    //             console.error('Error destroying IsoGrid instance on unmount:', error);
    //         }
    //     }
    //     // Remove dynamically added scripts? Maybe not necessary or desirable.
    // };
  }, [currentData]); // Re-run effect when currentData changes

  const handleDayChange = (day) => {
    if (day === currentDay) return; // Do nothing if already selected

    console.log(`Changing to Day ${day}`);
    document.body.classList.remove("grid-loaded"); // Remove class to potentially reset animations/state
    setCurrentDay(day);
    setCurrentData(day === 1 ? day1Data : day2Data);
    setActiveCardIndex(null); // Reset active card on day change
  };

  const handleMouseEnter = (index) => {
    setActiveCardIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveCardIndex(null);
  };

  return (
    <div ref={sectionRef} className="box timeline-section">
      <div className="centre">
        {sectionReachedTop ? (
          <header className="codrops-header">
            {/* Day buttons */}
            <div className="day-buttons">
              <div style={{ marginLeft: "10px" }}>
                <div
                  className={`button-wrapper ${
                    currentDay === 1 ? "active" : ""
                  }`}
                  style={{
                    // filter: `hue-rotate(${36}deg)`,
                    // WebkitFilter: `hue-rotate(${36}deg)`,
                    filter: "grayscale(100%)",
                    WebkitFilter: "grayscale(100%)",
                  }}
                  onClick={() => handleDayChange(1)}
                >
                  <a className="background-button" href="#" title="Day 1"></a>
                </div>
              </div>
              <div style={{ marginLeft: "40px" }}>
                <div
                  className={`button-wrapper ${
                    currentDay === 2 ? "active" : ""
                  }`}
                  style={{
                    filter: "grayscale(100%)",
                    WebkitFilter: "grayscale(100%)",
                  }}
                  onClick={() => handleDayChange(2)}
                >
                  <a className="background-button" href="#" title="Day 2"></a>
                </div>
              </div>
            </div>

            <div className="day-buttons">
              <div style={{ marginLeft: "10px" }}>
                <div
                  className={`button-wrapper ${
                    currentDay === 1 ? "active" : ""
                  }`}
                  style={{
                    // filter: `hue-rotate(${36}deg)`,
                    // WebkitFilter: `hue-rotate(${36}deg)`,
                    filter: "grayscale(100%)",
                    WebkitFilter: "grayscale(100%)",
                  }}
                  onClick={() => handleDayChange(1)}
                >
                  <a
                    className="background-button"
                    href="#"
                    title="D1 Schedule"
                  ></a>
                </div>
              </div>
              <div style={{ marginLeft: "40px" }}>
                <div
                  className={`button-wrapper ${
                    currentDay === 2 ? "active" : ""
                  }`}
                  style={{
                    filter: "grayscale(100%)",
                    WebkitFilter: "grayscale(100%)",
                  }}
                  onClick={() => handleDayChange(2)}
                >
                  <a
                    className="background-button"
                    href="#"
                    title=" D2 Schedule"
                  ></a>
                </div>
              </div>
            </div>
            {/* Default header content (hidden on hover) */}
            <div
              className="header-content"
              id="default-header"
              style={{ display: activeCardIndex !== null ? "none" : "block" }}
            >
              {/* Original index.html had no default content here, add if needed */}
              {/* <h1>Isometric Grids</h1> */}
            </div>
            {/* Card details container */}
            <div
              id="card-details-container"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                marginTop: "20px",
                //   padding: "40px 20px",
                //   background:
                //     "linear-gradient(to right, #0f0f0f, #1c1c1c, #2a2a2a)",
                //   minHeight: "100vh",
              }}
            >
              <div
                className="card-detailss"
                style={{
                  //   background: "#ffffff08",
                  //   border: "1px solid #ffffff20",
                  borderRadius: "16px",
                  padding: "10px 15px",
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0.1),rgba(255,255,255,0))",
                  //   padding: "24px",
                  //   backdropFilter: "blur(10px)",
                  //   boxShadow: "0 4px 20px rgba(255, 255, 255, 0.05)",
                  //   transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  color: "#f1f1f1",

                  borderLeft: "5px solid #00ffe1",
                }}
              >
                <p
                  style={{
                    // marginBottom: "6px",
                    fontSize: "1rem",
                    color: "#cfcfcf",
                  }}
                >
                  Hover or click card to see details
                </p>
                {/* <p style={{ fontSize: "1rem", color: "#cfcfcf" }}>
                  <strong style={{ color: "#ffffff" }}>Location:</strong> okay
                </p> */}
              </div>
              {currentData.map((item, index) => (
                <div
                  key={index}
                  className={`card-details ${
                    activeCardIndex === index ? "active" : ""
                  }`}
                  id={`card-details-${index}`}
                  style={{
                    //   background: "#ffffff08",
                    //   border: "1px solid #ffffff20",
                    borderRadius: "16px",
                    padding: "10px 15px",
                    background:
                      "linear-gradient(to right, rgba(255,255,255,0.1),rgba(255,255,255,0))",
                    //   padding: "24px",
                    //   backdropFilter: "blur(10px)",
                    //   boxShadow: "0 4px 20px rgba(255, 255, 255, 0.05)",
                    //   transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    color: "#f1f1f1",

                    transform:
                      activeCardIndex === index ? "scale(1.03)" : "scale(1)",
                    borderLeft:
                      activeCardIndex === index
                        ? "5px solid #00ffe1"
                        : "5px solid transparent",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "1.8rem",
                      // marginBottom: "10px",
                      color: "#ffffff",
                    }}
                  >
                    {item.Detail.title}
                  </h2>
                  <p
                    style={{
                      // marginBottom: "6px",
                      fontSize: "1rem",
                      color: "#cfcfcf",
                    }}
                  >
                    <strong style={{ color: "#ffffff" }}>Time:</strong>{" "}
                    {item.Detail.time}
                  </p>
                  <p style={{ fontSize: "1rem", color: "#cfcfcf" }}>
                    <strong style={{ color: "#ffffff" }}>Location:</strong>{" "}
                    {item.Detail.place}
                  </p>
                </div>
              ))}
            </div>
          </header>
        ) : null}
      </div>
      <main>
        {/* The isolayer element needs a ref */}
        <div
          ref={isoLayerRef}
          className="isolayer isolayer--scroll1 isolayer--shadow"
        >
          {/* The grid container needs a ref */}
          <ul
            ref={gridContainerRef}
            className="grid grid--effect-flip"
            id="grid-container"
          >
            {currentData.map((item, index) => (
              <li
                key={index}
                className="grid__item"
                data-index={index} // Keep data-index if original JS relies on it
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Link is present but not used for navigation in original? */}
                <a
                  className="grid__link"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.preventDefault()}
                >
                  {" "}
                  {/* Prevent default link behavior */}
                  <img
                    className="grid__img layer"
                    src={item.canvasImage}
                    alt="Canvas Dummy"
                  />
                  <img
                    className="grid__img layer"
                    src={item.wireframeImage}
                    alt="Wireframe Dummy"
                  />
                  <img
                    className="grid__img layer"
                    src={item.mainImage}
                    alt={item.title}
                  />
                  {/* Title span removed as per original final script */}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      {/* Original scripts are loaded via useEffect */}
    </div>
  );
}

export default Timeline;
