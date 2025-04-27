import React from "react";
import "./Loader.css"; // linking the css
import BlackHole from "../../Components/UI/BlackHole";
import { div } from "framer-motion/client";

const FlyIn = ({ fadeOut }) => {
  return (
    <div
      className={`loader-div ${fadeOut ? "fade-out" : ""}`}
      //   style={{ backgroundColor: "#111" }}
    >
      <BlackHole />
      <div id="fly-in">
        {/* <BlackHole /> */}
        <div>
          JIIT Optica Chapter
          <span>Presents</span>
        </div>
        <div>
          JSCOP 7.0 <span>Student Conference</span>
        </div>
        <div>
          Still Loops <span>for eternity</span>
        </div>
        <div>
          JSCOP 7.0 <span>Student Conference</span>
        </div>
        <div>
          JIIT Optica Chapter
          <span>Presents</span>
        </div>
        <div>
          JSCOP 7.0 <span>Student Conference</span>
        </div>
        <div>
          JIIT Optica Chapter
          <span>Presents</span>
        </div>
        <div>
          JSCOP 7.0 <span>Student Conference</span>
        </div>
      </div>
    </div>
  );
};

export default FlyIn;
