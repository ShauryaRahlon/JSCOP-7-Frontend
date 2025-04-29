import React from "react";
import { motion } from "framer-motion";
import "./Timeline.css";

const timelineData = [
  {
    name: "Inauguration",
    location: "LT-4",
    date: "03-05-2025",
    time: "10:00 AM - 11:00 AM",
  },
  {
    name: "Tea Break",
    location: "JBS Atrium",
    date: "03-05-2025",
    time: "10:30 AM - 11:00 AM",
  },
  {
    name: "Physics Talk 1",
    location: "LT-4",
    date: "03-05-2025",
    time: "11:00 AM - 11:45 AM",
  },
  {
    name: "Physics Talk 2",
    location: "LT-4",
    date: "03-05-2025",
    time: "11:45 AM - 12:30 PM",
  },
  {
    name: "Lunch",
    location: "Annapurna",
    date: "03-05-2025",
    time: "12:00 PM - 2:00 PM",
  },
  {
    name: "CSE & ECE Events",
    location: "CL-01 ^ Ece Lab(ABB-1)",
    date: "03-05-2025",
    time: "2:00 PM - 3:00 PM",
  },
  {
    name: "Fun Event",
    location: "LT-4",
    date: "03-05-2025",
    time: "3:00 PM - 5:00 PM",
  },
  {
    name: "End of Day 1",
  },
  {
    name: "Physics Talk 3",
    location: "LT-4",
    date: "04-05-2025",
    time: "9:30 AM - 10:30 AM",
  },
  {
    name: "Fun Event",
    location: "Campus",
    date: "04-05-2025",
    time: "10:30 AM - 12:30 PM",
  },
  {
    name: "Lunch",
    location: "Annapurna",
    date: "04-05-2025",
    time: "12:30 PM - 2:00 PM",
  },
  {
    name: "Tech Talk",
    location: "LT-4",
    date: "04-05-2025",
    time: "2:00 PM - 3:00 PM",
  },
  {
    name: "CSE Event",
    location: "CL-01",
    date: "04-05-2025",
    time: "3:00 PM - 4:30 PM",
  },
  {
    name: "Closing Ceremony",
    location: "Auditorium",
    date: "04-05-2025",
    time: "4:30 PM - 5:30 PM",
  }
];

const TimelineBox = ({ name, location, time, venue, date, index, isNextBox }) => {
  const isLeft = index % 2 !== 0;
  return (
    <motion.div
      className={`timeline-box ${isLeft ? "remove-left" : "remove-right"} ${name === "End of Day 1" ? "end-day" : ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="timeline-content">
        <div className={`content-background ${isLeft ? "left" : "right"}`} />
        <div style={{ padding: isLeft ? "20px 20px 20px 0" : "20px 20px 10px 20px" }}>
          <h2>{name}</h2>
          {location && <p style={{ margin: 0 }}>Location: {location}</p>}
          {date && <p style={{ margin: 0 }}>Date: {date}</p>}
          {time && <p style={{ margin: 0 }}>Time :{time}</p>}
        </div>
      </div>
    </motion.div>
  );
};

const Timeline = () => (
  <div className="timeline-wrapper box">
    <div className="stars" style={{ backgroundColor: "#325b6c" }} />
    {timelineData.map((item, index) => (
      <TimelineBox key={index} {...item} index={index} />
    ))}
  </div>
);

export default Timeline;
