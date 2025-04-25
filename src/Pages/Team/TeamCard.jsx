import React, { useEffect, useState } from "react";
import "./TeamCard.scss";
import { Instagram, Github, Linkedin } from "lucide-react";
import TeamDetails from "../../assets/Data/TeamDetails";

// Accept filterType prop from TeamMember4
const TeamCard = ({ filterType }) => {
  // Removed selectedType state
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null); // Track which card is being hovered
  // Track rotation values for each card
  const [cardRotations, setCardRotations] = useState(
    TeamDetails.map(() => ({ rotateX: 0, rotateY: 0 }))
  );

  const lerp = (start, end, t) => {
    return start * (1 - t) + end * t;
  };

  // Reduced the clamp range for less rotation (e.g., from 15 to 8)
  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  const handleMouseMove = (e, index) => {
    if (hoveredCardIndex !== index) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    setCardRotations((prev) => {
      const newRotations = [...prev];
      // Reduced divisor and clamp range for less rotation intensity
      newRotations[index] = {
        rotateY: clamp(mouseX / 15, -8, 8), // Reduced max rotation
        rotateX: clamp(-mouseY / 15, -8, 8), // Reduced max rotation
      };
      return newRotations;
    });
  };

  const handleMouseEnter = (index) => {
    setHoveredCardIndex(index);
  };

  const handleMouseLeave = (index) => {
    setHoveredCardIndex(null);
  };

  // Animation effect to reset cards when not hovered
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setCardRotations((prev) => {
        const newRotations = [...prev];

        prev.forEach((rotation, index) => {
          if (index !== hoveredCardIndex) {
            newRotations[index] = {
              rotateX: lerp(rotation.rotateX, 0, 0.05),
              rotateY: lerp(rotation.rotateY, 0, 0.05),
            };
          }
        });

        return newRotations;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredCardIndex]);

  // Filter members based on the filterType prop received from TeamMember4
  const filteredMembers = TeamDetails.filter((member) => {
    // If filterType is not provided or is 'all', show all (optional fallback)
    if (!filterType || filterType === "all") return true;
    return member.type === filterType;
  });

  return (
    // Removed the outer card-container div, assuming TeamMember4 provides container
    // Removed Filter Buttons div
    <div className="team-grid_V">
      {/* Map over filtered members */}
      {filteredMembers.map((member, index) => (
        <div
          key={member.id} // Use member.id for a more stable key
          className="card_V"
          style={{
            transform: `rotateX(${cardRotations[index].rotateX}deg) rotateY(${cardRotations[index].rotateY}deg)`,
            backgroundImage: `url(${member.imgsrc})`,
            transition: hoveredCardIndex === index ? "none" : "all 0.6s ease",
            // Removed pointerEvents style from original fix
          }}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          {/* Removed pointerEvents style from original fix */}
          <div className="card-content_V">
            <div className="card-title-box_V">
              <h2 className="card-title_V">{member.name}</h2>
            </div>

            <div className="card-image_V">{/* optional image here */}</div>

            <div className="card-description-box_V">
              <p className="card-description_V">{member.role}</p>
              <div className="card-actions_V">
                {member.social.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.platform}
                    className="btn_V btn-secondary_V" // Using original button classes
                  >
                    {link.platform === "instagram" && <Instagram />}
                    {link.platform === "linkedin" && <Linkedin />}
                    {link.platform === "github" && <Github />}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    // Removed extra closing div tag introduced by formatter
  );
};

export default TeamCard;
