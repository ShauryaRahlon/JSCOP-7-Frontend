import React, { useState, useEffect } from "react";
import Home from "../Home/Home";
import FlyIn from "../Loader/Loader";

const Layout = () => {
  const [showFlyIn, setShowFlyIn] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 9 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 8000);

    // Remove FlyIn after 10 seconds
    const timer = setTimeout(() => {
      setShowFlyIn(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, []);

  return <>{showFlyIn ? <FlyIn fadeOut={fadeOut} /> : <Home />}</>;
};

export default Layout;
