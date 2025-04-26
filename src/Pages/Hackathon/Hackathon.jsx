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
import ethereum_icon from "../../../public/images/ethereum_icon.png";
import innovation from "/images/innovation.png";

const Discord = () => {
  return (
    <section className="section discord" id="discord">
      <div className="container">
        <div className="discord-card">
          <div className="discord-content">
            <h2 className="discord-title">Join our Discord Server!</h2>
            <a
              href="https://discord.gg/hackbyte"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary discord-btn"
            >
              <span className="discord-icon">
                <svg
                  viewBox="0 -28.5 256 256"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  width="20"
                  height="20"
                >
                  <g>
                    <path
                      d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                      fill="#ffffff"
                    ></path>
                  </g>
                </svg>
              </span>
              Join
            </a>
            <div className="Contact">
              <h3 className="contact-header">Contact Us</h3>
              <p className="contact-para">
                For any queries, please email us at: JiitOptica@gmail.com
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

            <div className="features-grid">
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
      <div className="sponsor-logos">
        <img
          src="https://static.vecteezy.com/system/resources/previews/008/073/640/non_2x/ethereum-logo-icon-isolated-on-white-background-free-vector.jpg"
          alt="Ethereum Logo"
          className="sponsor-logo"
        />
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
        "Solve a unique problem in your community",
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
