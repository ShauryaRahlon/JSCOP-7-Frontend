import React from "react";

const AboutOptica = () => {
  return (
    <section>
      <div></div>
      <div>
        <div
          className="container"
          style={{
            background:
              "linear-gradient(transparent 0%,#16212c 50%, #16212c 100%)",
          }}
        >
          <div className="section-container">
            <h2 className="section-title abt-title">WHAT JSCOP IS?</h2>
          </div>

          <div className="about-content">
            <div className="about-text aboutus-text">
              <div className="abt-mobile-nav">
                <img
                  src="images/Jscop_logo_2.png"
                  style={{ width: "80%", height: "70%", paddingBottom: "40px" }}
                ></img>
              </div>
              <p>
                JIIT OPTICA, the institute's internationally recognised
                scientific body, offers a forum for students to discover new
                worlds beyond the academic curriculum. The club organizes
                workshops, annual festivals, national conferences, alumni
                gatherings, and educational visits to top research and
                development institutions.
              </p>
              <p>
                To inspire young minds, lectures are regularly held by renowned
                scholars and researchers across diverse fields. From a modest
                beginning with just a handful of active members, JIIT OPTICA has
                grown into a vibrant community with impactful social outreach.
              </p>
              <p>
                The journey from following in others' footsteps to forging its
                own path has been remarkable. Through events like JSCOP,
                technical seminars, and continuous innovation, JIIT OPTICA has
                set a high benchmark of excellence.
              </p>
            </div>

            <div className="about-image aboutus-image">
              <div className="image-wrapper">
                <div className="about-card aboutus-card">
                  <img
                    className="card-image abt-img"
                    src="images/Jscop_logo.png"
                    style={{ width: "80%", height: "70%" }}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOptica;
