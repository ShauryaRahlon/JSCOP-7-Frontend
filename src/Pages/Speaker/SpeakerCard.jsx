import { useEffect, useRef } from "react";
import "./SpeakerCard.scss";

function SpeakerCard({
  imgSrc,
  title,
  subtitle,
  description,
  date,
  time,
  venue,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const stars = [];

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };

    // Create stars
    const initStars = () => {
      stars.length = 0;
      const starCount = Math.floor((canvas.width * canvas.height) / 1000);

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random(),
          speed: Math.random() * 0.05,
        });
      }
    };

    // Animate stars
    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Move star
        star.y += star.speed;

        // Reset star position if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animateStars);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animateStars();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="tile">
      <div className="cosmic-glow"></div>
      <img
        src={imgSrc || "/placeholder.svg"}
        alt={title}
        crossOrigin="anonymous"
      />
      <div className="text">
        <h1 className="speaker-title">{title}</h1>
        <h2 className="animate-text speaker-subtitle">{subtitle}</h2>
        <div className="speaker-description-box">
          <h4 className="animate-text description">
            {description}
            <div className="cosmic-line2"></div>
          </h4>
        </div>
        <div className="event-details">
          <div className="date-container">
            <p className="animate-text date">Date: {date}</p>
          </div>
          <div className="time-container">
            <p className="animate-text time">Time: {time}</p>
          </div>
          <div className="venue-container">
            <p className="animate-text venue">Venue: {venue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeakerCard;
