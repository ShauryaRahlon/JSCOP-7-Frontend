import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./LoadComponent.css";
import Gallery from "../Gallery/Gallery";
import Events from "../Events/Events";
import Team from "../Team/Team";
import Timeline from "../Timeline/Timeline";
// import Hackathon from "../Hackathon/Hackathon";
import { ArrowLeft } from "lucide-react";
import Contact from "../Contact/Contact";
import AboutUs from "../AboutUs/Aboutus";
import Hackathon from "../Hackathon/Hackathon";

const FadePortal = ({ isOpen, children }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 400); // Ensure fadeOut finishes before unmounting (same as animation duration)
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <div className={`fade-wrapper ${isOpen ? "fadeIn" : "fadeOut"}`}>
      {children}
    </div>,
    document.body
  );
};

const BackToHome = ({ isOpen, handleBackClick }) => {
  //   if (!isOpen) return null;
  return (
    <FadePortal isOpen={isOpen}>
      <div
        onClick={handleBackClick}
        className="loadComponent-fade-back backToHome"
      >
        <ArrowLeft size={28} className="trigger" color="#b9c1ca" />
      </div>
    </FadePortal>
  );
};

const LoadComponent = ({ isOpen, part }) => {
  //   if (!isOpen) return null;

  const renderComponent = () => {
    switch (part) {
      case "aboutus":
        return <AboutUs />;
      case "gallery":
        return <Gallery />;
      case "events":
        return <Events />;
      case "team":
        return <Team />;
      case "timeline":
        return <Timeline />;
      case "hackathon":
        return <Hackathon />;
      case "contact":
        return <Contact />;

      default:
        return null;
    }
  };

  return (
    <FadePortal isOpen={isOpen}>
      <div className="component_wrapper loadComponent-fade-back">
        {/* <Gallery /> */}
        {renderComponent()}
      </div>
    </FadePortal>
  );
};

export default LoadComponent;
export { BackToHome };
