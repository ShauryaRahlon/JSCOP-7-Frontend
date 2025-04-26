import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Hackathon.css";
import "./About.css";
import "./Tracks.css";
import "./Stats.css";
import "./Discord.css";
import "./Countdown.css";
import { CalendarDays, Clock, User, Globe } from "lucide-react";
import logo from "./../../assets/jscopLogo.png";
import ethereum_icon from "../../assets/images/ethereum_icon.png";
import innovation from "/images/innovation.png";
import ethereum from "./../../assets/ethereum-logo.png";
import devfolio1 from "./../../assets/devfolio1.png";

const Discord = () => {
  return (
    <section className="section discord" id="discord">
      <div className="container">
        <div className="discord-card">
          <div className="discord-content">
            <h2 className="section-title discord-title">Join our Discord Server!</h2>
            <div className="discord-btn-container">
              <div className="countdown-btn-container">
                <div
                  className="button-wrapper button__container"
                  style={{
                    filter: "grayscale(100%)",
                    WebkitFilter: "grayscale(100%)",
                  }}
                >
                  <a
                    target="_blank"
                    className="background-button"
                    href="https://discord.gg/hackbyte"
                    title="Join"
                  ></a>
                </div>
              </div>
              <div className="countdown-btn-container">
                <div
                  className="button-wrapper button__container"
                  style={{
                    filter: "grayscale(100%)",
                    WebkitFilter: "grayscale(100%)",
                  }}
                >
                  <a
                    target="_blank"
                    className="background-button"
                    href="https://tesserx.devfolio.co/"
                    title="Register Now"
                  ></a>
                </div>
              </div>
            </div>
            <div className="Contact">
              <h3 className="section-title contact-header">Contact Us</h3>
              <p className="contact-para">
                For any queries, please contact us at:
              </p>
              <p className="contact-para">
                <strong>Aryan Goel:</strong> +91 9928590499
              </p>
              <p className="contact-para">
                <strong>Shaurya Rahlon:</strong> +91 7905230216
              </p>
            </div>
          </div>

          <div className="discord-logo">
            <img src={logo} alt="TESSERX Logo" className="tesserx-logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Countdown = ({ eventDate, eventLocation, eventMode }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const difference = new Date(eventDate) - new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <section className="section countdown" id="schedule">
      <div className="container">
        <div className="countdown-wrapper">
          <div className="countdown-header">
            {/* <span className="section-subtitle">Mark Your Calendar</span> */}
            <h2 className="section-title">Hackathon Countdown</h2>
          </div>

          <div className="countdown-timer">
            <div className="timer-item">
              <div className="timer-value">{timeLeft.days}</div>
              <div className="timer-label">Days</div>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-item">
              <div className="timer-value">{timeLeft.hours}</div>
              <div className="timer-label">Hours</div>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-item">
              <div className="timer-value">{timeLeft.minutes}</div>
              <div className="timer-label">Minutes</div>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-item">
              <div className="timer-value">{timeLeft.seconds}</div>
              <div className="timer-label">Seconds</div>
            </div>
          </div>

          <div className="countdown-details">
            <div className="detail-item">
              <CalendarDays className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Date</span>
                <span className="detail-value">
                  {new Date(eventDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <Clock className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Time</span>
                <span className="detail-value">
                  {new Date(eventDate).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  onwards
                </span>
              </div>
            </div>

            <div className="detail-item">
              <User className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Organizer</span>
                <span className="detail-value">{eventLocation}</span>
              </div>
            </div>

            <div className="detail-item">
              <Globe className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Mode</span>
                <span className="detail-value">{eventMode}</span>
              </div>
            </div>
          </div>
          <div className="countdown-btn-container">
            <div
              className="button-wrapper button__container"
              style={{
                filter: "grayscale(100%)",
                WebkitFilter: "grayscale(100%)",
              }}
            >
              <a
                target="_blank"
                className="background-button"
                href="https://tesserx.devfolio.co/"
                title="Register Now"
              ></a>
            </div>
          </div>
          {/* <div className="countdown-cta">
            <a
              href="https://tesserx.devfolio.co/"
              target="_blank"
              className="btn btn-primary"
            >
              Register Now
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="section about" id="about">
      <div className="container">
        {/* <span className="section-subtitle">What is HackByte?</span> */}
        <h2 className="section-title">About TESSERX</h2>

        <div className="about-content">
          <div className="about-text">
            <p>
              Welcome to TesserX, where the lines between reality and
              imagination blur. Organized by the JIIT Optica Student Chapter as
              a part of JSCOP 7.0, this isn’t just a hackathon—it’s a
              dimensional leap into the realm of the extraordinary. Inspired by
              the concept of the Tesseract—a mysterious 4D cube beyond human
              perception—with the theme Interstellar, TesserX dares you to
              challenge the ordinary, bend the rules of tech, and craft
              innovations that exist beyond the visible spectrum of reality.
            </p>
            <p></p>
            {/* Features grid moved back inside about-text */}
            <div className="features-grid about-cta">
              <div className="feature-item">
                <div className="feature-icon">🏆</div> &nbsp;
                <div>
                  <div className="feature-title">Win Cash Prize</div>
                  <div className="feature-desc">
                    Win cash prize of upto $182
                  </div>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🚀</div> &nbsp; &nbsp;
                <div>
                  <div className="feature-title">Innovation</div>
                  <div className="feature-desc">
                    Transform ideas into reality
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-image">
            <div className="image-wrapper">
              <div className="about-card">
                <h3>Why Participate in TESSERX?</h3>
                <ul className="reasons-list">
                  <li>
                    <span className="reason-title">
                      Collaborate and Skill Up
                    </span>
                    <span className="reason-desc">
                      A reality-warping hackathon designed to unlock your most
                      mind-bending ideas.
                    </span>
                  </li>
                  <li>
                    <span className="reason-title">Exciting Prizes!</span>
                    <span className="reason-desc">
                      Top 3 teams plus best projects of each domain will win
                      prizes which will be disclosed soon!
                    </span>
                  </li>
                  <li>
                    <span className="reason-title">No boundaries</span>
                    <span className="reason-desc">
                      All themes, all tech – software or hardware(with demo
                      video) – your only limit is your imagination.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section className="section stats" id="stats" ref={sectionRef}>
      <h2 className="section-title sponsors-title">Our Proud Sponsor</h2>
      <div className="sponsor-images">
        <div className="sponsor-logos">
          <img
            src={ethereum}
            alt="Ethereum Logo"
            className="sponsor-logo"
          />
          <h3>Ethereum</h3>
        </div>
        <div className="sponsor-logos">
          <img
            src={devfolio1}
            alt="Ethereum Logo"
            className="sponsor-logo"
          />
          <h3>Devfolio</h3>
        </div>
      </div>

      {/* <div className="container">
        <div className="stats-grid"></div>
      </div> */}
    </section>
  );
};

const Tracks = () => {
  const tracks = [
    {
      id: 1,
      title: "Ethereum Track",
      // ethereum icon
      icon: ethereum_icon,
      description:
        "Select this track if you're building on Ethereum to be eligible for the prizes!",
      problems: [
        // "Develop a personalized education platform that adapts to individual learning styles",
        "$100: Best hack built on Ethereum",
      ],
    },

    {
      id: 5,
      title: "Open Innovation",
      icon: innovation,
      description:
        "Choose your own adventure! Build any innovative solution that doesn't fit the other tracks.",
      problems: [
        "Create something entirely new and innovative",
      ],
    },
  ];

  return (
    <section className="section tracks" id="tracks">
      <div className="container-1">
        {/* <span className="section-subtitle">Challenge Areas</span> */}
        <h2 className="section-title">Available Tracks</h2>
        <div className="tracks-grid">
          {tracks.map((track) => (
            <div key={track.id} className="track-card">
              <div
                className="track-header "
                style={{
                  paddingBottom: "20px",
                }}
              >
                <img
                  src={track.icon}
                  alt={track.title}
                  className="track-icon"
                  style={{
                    height: "40px",
                  }}
                />
                <h3 className="track-title">{track.title}</h3>
              </div>
              <p className="track-description">{track.description}</p>
              <div className="track-problems">
                <ul>
                  {track.problems.map((problem, index) => (
                    <li key={index}>{problem}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function Hackathon() {
  return (
    <div className="app hackathon-box">
      <div
        className="stars "
        style={{
          backgroundColor: "#16212c",
          minHeight: "fit-content",
        }}
      ></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <About />
        <Countdown
          eventDate="2025-05-02T04:00:00"
          eventLocation="JIIT Optica Student Chapter"
          eventMode="Online"
        />
        <Tracks />
        <Stats />

        <Discord />
      </motion.div>
    </div>
  );
}

export default Hackathon;
