import React, { useState, useEffect } from "react";
import Home from "../Home/Home";
import FlyIn from "../Loader/Loader";

const Layout = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [showFlyIn, setShowFlyIn] = useState(true);

  useEffect(() => {
    // Disable scroll when FlyIn is active
    document.body.style.overflow = "hidden";

    // Start fade-out after 8 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      document.body.style.overflow = "auto"; // Allow scroll after fade starts

      // After fade-out animation finishes (1s), remove FlyIn
      setTimeout(() => {
        setShowFlyIn(false);
      }, 1000); // match your CSS fadeOut animation duration
    }, 8000);

    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <>
      {showFlyIn && <FlyIn fadeOut={fadeOut} />}
      <Home />
    </>
  );
};

export default Layout;
