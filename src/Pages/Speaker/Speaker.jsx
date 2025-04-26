import { useEffect, useRef } from "react";
import SpeakerDetails from "../../assets/Data/SpeakerDetails";
import SpeakerCard from "./SpeakerCard";
import "./Speaker.scss";

function Speaker() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = containerRef.current.querySelectorAll(".tile");
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="speaker-section speaker-box">
      <div className="stars-bg"></div>
      <div className="speaker-container" ref={containerRef}>
        <div className="speaker-heading">
          <h2>Featured Speakers</h2>
          <div />
          <div className="cosmic-line"></div>
        </div>
        <div className="wrap">
          {SpeakerDetails.map((card) => (
            <SpeakerCard
              key={card.id}
              imgSrc={card.imgSrc}
              title={card.title}
              subtitle={card.subtitle}
              description={card.description}
              date={card.date}
              time={card.time}
              venue={card.venue}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Speaker;
