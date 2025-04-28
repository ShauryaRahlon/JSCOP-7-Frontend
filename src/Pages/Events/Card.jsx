import React, { useState, useRef, useEffect } from "react";
import "./card.scss"; // Card specific styles
import { MapPin, Timer } from "lucide-react"; // Import icons from react-feather
import cross_icon from "/images/cross_icon.png"; // Import the cross icon

// Declare global variables used by the scripts loaded in index.html
/* global TimelineLite, TweenLite, Expo, Power2 */

// Enum of CSS classes (mirrors original script)
const CLASSES = {
  containerClosed: "card_events__container--closed",
  bodyHidden: "body_events--hidden",
  cardHidden: "card_events--hidden", // Add class for hiding inactive cards
};

// Accept props from App
function Card({
  cardKey,
  openingCardKey,
  onOpening,
  onClosing,
  imgSrc,
  title,
  date,
  Description, // Re-added copy prop
  location,
  venue,
  time,
  faq,
  rules_link,
  contact_number,
  showbg,
  setShowbg,
  form_link,
}) {
  const clipPathId = `clipPath-${cardKey}`; // Generate unique ID
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null); // Ref for the main card element
  const containerRef = useRef(null); // Ref for the card__container
  const contentRef = useRef(null); // Ref for card__content
  const clipRef = useRef(null); // Ref for the SVG polygon.clip
  const primaryImageRef = useRef(null); // Ref for the primary SVG image
  const timelineRef = useRef(null); // Ref to store the GSAP timeline

  const [openIndex, setOpenIndex] = useState(null);

  const handleFaqToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // --- Animation Functions (adapted from Card-polygon.js) ---

  const slideContentDown = () => {
    if (!contentRef.current) return null;
    return TweenLite.to(contentRef.current, 0.8, {
      y: window.innerHeight,
      ease: Expo.easeInOut,
    });
  };

  const clipImageIn = () => {
    if (!clipRef.current) return null;
    const TL = new TimelineLite();
    const start = [
      [0, 500],
      [0, 0],
      [1920, 0],
      [1920, 500],
    ];
    const end = [
      [1025, 330],
      [1117, 171],
      [828, 206],
      [913, 260],
    ];
    let points = [];

    start.forEach((point, i) => {
      const tween = TweenLite.to(point, 1.5, {
        ...end[i], // Spread the target coordinates
        onUpdate: () => {
          points.push(point.join());
          if (points.length === end.length) {
            if (clipRef.current) {
              clipRef.current.setAttribute("points", points.join(" "));
            }
            points = [];
          }
        },
        ease: Expo.easeInOut,
      });
      TL.add(tween, 0);
    });
    return TL;
  };

  const floatContainer = () => {
    if (!containerRef.current) return null;
    document.body.classList.add(CLASSES.bodyHidden);
    const TL = new TimelineLite();
    const rect = containerRef.current.getBoundingClientRect();
    const windowW = window.innerWidth;
    const track = {
      width: rect.width, // Start tracking from initial width
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    TL.set(containerRef.current, {
      width: rect.width,
      height: rect.height,
      x: rect.left,
      y: rect.top,
      position: "fixed",
      overflow: "hidden", // Keep hidden during transition
    });

    TL.to([containerRef.current, track], 2, {
      width: windowW,
      height: "100%",
      x: windowW / 2,
      y: 0,
      xPercent: -50,
      // overflowY: 'auto', // REMOVE from animation properties
      ease: Expo.easeInOut,
      // clearProps: 'all', // Delay clearProps until reverse complete
      className: "-=" + CLASSES.containerClosed,
      // Removed onUpdate call to onCardMove
      onComplete: () => {
        // ADD onComplete callback
        // Set overflowY after animation finishes
        if (containerRef.current) {
          containerRef.current.style.overflowY = "auto";
        }
      },
    });

    return TL;
  };

  const clipImageOut = () => {
    const tween = clipImageIn();
    if (tween) {
      // Need to wait for the tween to be created before reversing
      // Using a slight delay or ensuring it's fully created might be needed,
      // but GSAP's reverse() usually handles this if called on the timeline instance.
      tween.reverse();
    }
    return tween;
  };

  const slideContentUp = () => {
    if (!contentRef.current) return null;
    return TweenLite.to(contentRef.current, 1, {
      y: 0,
      // clearProps: 'all', // Delay clearProps
      ease: Expo.easeInOut,
    });
  };

  // --- Effect to handle hiding/showing based on openingCardKey ---
  useEffect(() => {
    if (!cardRef.current) return;

    if (openingCardKey && openingCardKey !== cardKey) {
      // Another card is opening, hide this one
      cardRef.current.classList.add(CLASSES.cardHidden);
    } else {
      // This card is opening or no card is opening, show this one
      cardRef.current.classList.remove(CLASSES.cardHidden);
    }
  }, [openingCardKey, cardKey]); // Rerun when openingCardKey changes

  // --- Event Handlers ---

  const handleOpen = () => {
    // Prevent opening if another card is already opening or this card is animating
    if (openingCardKey || timelineRef.current?.isActive()) return;

    onOpening(cardKey); // Notify App that this card is opening

    const tl = new TimelineLite({
      onComplete: () => {
        setIsOpen(true); // Update local state after main animation
      },
    });
    timelineRef.current = tl; // Store the timeline

    const anim1 = slideContentDown();
    const anim2 = clipImageIn();
    const anim3 = floatContainer();
    const anim4 = clipImageOut();
    const anim5 = slideContentUp();

    // Add tweens to timeline if they exist
    if (anim1) tl.add(anim1);
    if (anim2) tl.add(anim2, 0);
    if (anim3) tl.add(anim3, "-=" + (anim2?.duration() ?? 0) * 0.6);
    if (anim4) tl.add(anim4, "-=" + (anim3?.duration() ?? 0) * 0.3);
    if (anim5) tl.add(anim5, "-=" + (anim4?.duration() ?? 0) * 0.6);

    tl.play();
  };

  const handleClose = () => {
    setTimeout(() => {
      setShowbg(false);
    }, 500);
    if (!isOpen || !timelineRef.current || timelineRef.current.isActive())
      return; // Prevent if already closed or animating

    // Mobile specific: Show primary image before closing starts
    if (window.innerWidth <= 580 && primaryImageRef.current) {
      TweenLite.set(primaryImageRef.current, {
        opacity: 1,
        visibility: "visible",
      });
    }

    // 1. Fade out secondary image *first*

    // If no secondary image, just scroll and reverse
    if (containerRef.current) {
      TweenLite.to(containerRef.current, 0.4, {
        scrollTo: { y: 0 },
        ease: Power2.easeOut,
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.overflow = "hidden";
          }
          reverseMainTimeline();
        },
      });
    } else {
      reverseMainTimeline();
    }
  };

  // Helper function to reverse the main timeline and handle cleanup
  const reverseMainTimeline = () => {
    if (!timelineRef.current) return;

    timelineRef.current.eventCallback("onReverseComplete", () => {
      // Clean up styles after reverse animation completes
      TweenLite.set(
        [containerRef.current, contentRef.current, primaryImageRef.current],
        { clearProps: "all" }
      ); // Clear all relevant props
      document.body.classList.remove(CLASSES.bodyHidden);
      setIsOpen(false); // Update local state
      timelineRef.current = null; // Clear timeline ref
      onClosing(); // Notify App that closing is complete
    });

    timelineRef.current.reverse();
  };

  // Note: hideCard

  // const handleFaqToggle = (index) => {
  //   // Get all FAQ items within this component
  //   const faqItems = containerRef.current.querySelectorAll(".faq_item");

  //   // Toggle active class on the clicked item
  //   faqItems[index].classList.toggle("active");
  // };

  // Close on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  return (
    // Add cardRef here
    <div className="card_events " ref={cardRef}>
      <div
        // Apply closed class based on local isOpen state
        className={`card_events__container ${
          !isOpen ? CLASSES.containerClosed : ""
        }`}
        ref={containerRef}
      >
        <svg
          className="card_events__image evt-card-img"
          ref={primaryImageRef} // Add ref here
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1920 500"
          preserveAspectRatio="xMidYMid slice"
          onClick={handleOpen} // Attach open handler
          style={{
            ...(showbg && {
              backgroundColor: "rgb(26, 39, 55)",
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backdropFilter: "blur(8px)",
              // filter: showbg ? "blur(8px)" : "blur(0px)",
              // transition: "filter 0.5s ease, background-image 0.5s ease",
            }),
          }}
        >
          <defs>
            {/* Use unique ID for the clip path */}
            <clipPath id={clipPathId}>
              <polygon
                ref={clipRef}
                className="clip"
                points="0,500 0,0 1920,0 1920,500"
              ></polygon>
            </clipPath>
          </defs>

          {/* Main image clipped and sharp (not blurred) */}
          <image
            clipPath={`url(#${clipPathId})`}
            width="1920"
            height="500"
            xlinkHref={imgSrc}
          ></image>
        </svg>

        <div className="card_events__content event-box" ref={contentRef}>
          <div className="top-fade-mask-2"></div>
          <button
            className="card_events__btn-close "
            onClick={handleClose} // Attach close handler
          >
            <img className="card_events__btn-close-icon" src={cross_icon}></img>
          </button>
          {/* Explicit Back button removed */}
          <div className="card_events__caption">
            <h2 className="card_events__title">
              {title}
              <div className="white-line"></div>
            </h2>
          </div>

          <div className="card_events__copy">
            {/* Date displayed at the top */}
            <div className="meta_events">
              <div className="meta_events__date" style={{ color: "#ffffff" }}>
                Date : {date}
              </div>
            </div>

            {/* Paragraphs from the copy prop */}
            {Description &&
              Description.map((paragraph, index) => (
                <p
                  key={index}
                  style={{ color: "#ffffff", textAlign: "justify" }}
                >
                  {paragraph}
                </p>
              ))}

            {/* Event details with icons */}
            <div className="event_details__container">
              <div className="event_details">
                {location && (
                  <div className="event_details__item">
                    <div
                      className="evt-tm-vn"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <MapPin className="event_details__icon" color="#1E293B" />
                      <span
                        className="event_details__text"
                        style={{ color: "#1E293B" }}
                      >
                        {location}
                      </span>{" "}
                      &nbsp; &nbsp;
                    </div>
                    <div
                      className="evt-tm-vn"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Timer className="event_details__icon" color="#1E293B" />
                      <span
                        className="event_details__text"
                        style={{ color: "#1E293B" }}
                      >
                        {time}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="card_events__buttons card_events__buttons2"
                style={{ paddingTop: "40px" }}
              >
                {form_link && (
                  <div
                    className={`button-wrapper`}
                    style={{
                      filter: "grayscale(100%)",
                      WebkitFilter: "grayscale(100%)",
                    }}
                  >
                    <a
                      className="background-button evt-background-btn"
                      href={form_link}
                      title="Register"
                    ></a>
                  </div>
                )}
                {rules_link && (
                  <div
                    className={`button-wrapper`}
                    style={{
                      filter: "grayscale(100%)",
                      WebkitFilter: "grayscale(100%)",
                    }}
                  >
                    <a
                      className="background-button evt-background-btn"
                      href={rules_link}
                      title="Rules"
                    ></a>
                  </div>
                )}
              </div>
            </div>
            {/* FAQ Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {faq && faq.length > 0 && (
                <div className="faq_section">
                  <h3 className="faq_section__title">
                    Frequently Asked Questions
                  </h3>
                  <div className="faq_list">
                    {faq.map((item, index) => (
                      <div
                        key={index}
                        className={`faq_item ${
                          openIndex === index ? "open" : ""
                        }`}
                      >
                        <div
                          className="faq_item__question"
                          onClick={() => handleFaqToggle(index)}
                        >
                          <span>{item.question}</span>
                          <span className="faq_icon">
                            {openIndex === index ? "−" : "+"}
                          </span>
                        </div>
                        <div className="faq_item__answer_wrapper">
                          <p className="faq_item__answer">{item.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
