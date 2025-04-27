import React from "react";
import "./Loader.css"; // linking the css
import BlackHole from "../../Components/UI/BlackHole";
// import { div } from "framer-motion/client";

const FlyIn = ({ fadeOut }) => {
  return (
    <div className={`loader-div ${fadeOut ? "fade-out" : ""}`}>
      <div style={{ zIndex: "200", position: "fixed" }}>
        <BlackHole />
      </div>
      <div id="fly-in">
        <div>
          JIIT Optica Chapter <span>Presents</span>
        </div>
        <div>
          JSCOP 7.0 <span>Student Conference</span>
        </div>
        <div style={{ display: "none" }}>
          Still Loops <span>for eternity</span>
        </div>
        <div style={{ display: "none" }}>
          JSCOP 7.0 <span>Student Conference</span>
        </div>
        <div style={{ display: "none" }}>
          JIIT Optica Chapter <span>Presents</span>
        </div>
        <div>
          JSCOP 7.0 <span>Student Conference</span>
        </div>
        <div>
          JIIT Optica Chapter <span>Presents</span>
        </div>
        <div>
          JSCOP 7.0 <span>Student Conference</span>
        </div>
      </div>
    </div>
  );
};

export default FlyIn;
