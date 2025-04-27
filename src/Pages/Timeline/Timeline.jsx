import React from "react";
import { motion } from "framer-motion";
import "./Timeline.css";

const timelineData = [
  {
    name: "Inauguration",
    location: "LT-4",
    time: "10:00 AM - 11:00 AM",
    // venue: "LT-4",
  },
  {
    name: "Tea Break",
    location: "JBS Atrium",
    time: "10:30 AM - 11:00 AM",
    // venue: "xyz",
  },
  {
    name: "Physics Talk 1",
    location: "LT-4",
    time: "11:00 AM - 11:45 AM",
    // venue: "xyz",
  },
  {
    name: "Physics Talk 2",
    location: "LT-4",
    time: "11:45 AM - 12:30 PM",

  },
  {
    name: "Lunch",
    location: "Annapurna",
    time: "12:00 PM - 2:00 PM",
    // venue: "xyz",
  },
  {
    name: "CSE & ECE Events",
    location: "CL-01 ^ Ece Lab(ABB-1)",
    time: "2:00 PM - 3:00 PM",
    // venue: "xyz",
  },
  {
    name: "Fun Event",
    location: "LT-4",
    time: "3:00 PM - 5:00 PM",

  },
  {
    name: "End of Day 1",
  },
  {
    name: "Physics Talk 3",
    location: "LT-4",
    time: "9:30 AM - 10:30 AM",
  },
  {
    name: "Fun Event",
    location: "Campus",
    time: "10:30 AM - 12:30 PM",
  },
  {
    name: "Lunch",
    location: "Annapurna",
    time: "12:30 PM - 2:00 PM",
  },
  {
    name: "Tech Talk",
    location: "LT-4",
    time: "2:00 PM - 3:00 PM",
  },
  {
    name: "CSE Event",
    location: "CL-01",
    time: "3:00 PM - 4:30 PM",
  },
  {
    name: "Closing Ceremony",
    location: "Auditorium",
    time: "4:30 PM - 5:30 PM",
  }

];

const TimelineBox = ({ name, location, time, venue, index, isNextBox }) => {
  const isLeft = index % 2 !== 0;

  return (
    <motion.div
      className={`timeline-box ${isLeft ? "remove-left" : "remove-right"} ${isNextBox ? "next-box" : ""
        }`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }} // triggers once when 20% of it is in view
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="timeline-content">
        <div className={`content-background ${isLeft ? "left" : "right"}`} />
        {isNextBox ? (
          <>
            <div className="next-title">WHAT'S</div>
            <div className="next-main">NEXT?</div>
          </>
        ) : (
          <div
            style={{
              padding: isLeft ? "20px 20px 20px 0px" : "20px 20px 10px 20px",
            }}
          >
            <h2>{name}</h2>
            <p style={{ margin: "0" }}>{location}</p>
            <p style={{ margin: "0" }}>{time}</p>
            <p style={{ margin: "0" }}>{venue}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
const downloadNow = () => {
  const link = document.createElement("a");
  link.href = "/images/Timeline_Events/Timeline-schedule.jpeg";
  link.download = "schedule.jpeg"; // Specify the file name for download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
const Timeline = () => {
  return (
    <>
      <div className="timeline-wrapper box">
        <div
          className="stars"
          style={{
            backgroundColor: " #325b6c",
            // height: "152vh",
          }}
        ></div>
        {timelineData.map((item, index) => (
          <TimelineBox key={index} {...item} index={index} />
        ))}
        <div className="countdown-btn-container">
          <div
            className="button-wrapper button__container_Timeline"
            style={{
              filter: "grayscale(100%)",
              WebkitFilter: "grayscale(100%)",
            }}
          >
            <a
              target="_blank"
              className="background-button"
              title="Download Schedule"
              onClick={downloadNow}
            ></a>
          </div>
        </div>
      </div>

    </>

  );
};

export default Timeline;
