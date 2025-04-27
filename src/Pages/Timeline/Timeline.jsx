import React from "react";
import { motion } from "framer-motion";
import "./Timeline.css";

const timelineData = [
  {
    name: "JAN",
    location: "Countries began lockdowns.",
    time: "hello",
    venue: "xyz",
  },
  {
    name: "FEB",
    location: "Countries began lockdowns.",
    time: "hello",
    venue: "xyz",
  },
  {
    name: "MAR",
    location: "Countries began lockdowns.",
    time: "hello",
    venue: "xyz",
  },
  {
    name: "APR",
    location: "Countries began lockdowns.",
    time: "hello",
    venue: "xyz",
  },
  {
    name: "MAY",
    location: "Countries began lockdowns.",
    time: "hello",
    venue: "xyz",
  },
];

const TimelineBox = ({ name, location, time, venue, index, isNextBox }) => {
  const isLeft = index % 2 !== 0;

  return (
    <motion.div
      className={`timeline-box ${isLeft ? "remove-left" : "remove-right"} ${
        isNextBox ? "next-box" : ""
      }`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }} // triggers once when 20% of it is in view
      transition={{ duration: 1, ease: "easeOut" }}
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

const Timeline = () => {
  return (
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
    </div>
  );
};

export default Timeline;
