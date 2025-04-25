import { useState } from "react";
import TeamCard from "./TeamCard";
import "./Team.scss";

function Team() {
  const [activeTab, setActiveTab] = useState("technical");

  // Filter team members based on active tab
  // No longer need to pre-filter IDs here
  // const technicalMembers = [1, 2, 3, 4, 5];
  // const managementMembers = [6, 7];
  // const activeMembers = activeTab === "technical" ? technicalMembers : managementMembers;

  return (
    <div className="team-section team-box">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="wormhole"></div>

      <div className="content">
        {/* <header className="heading">
          <h3>TEAM MEMBERS</h3>
          <p className="quote">
            "Do not go gentle into that good night. Rage, rage against the dying
            of the light."
          </p>
        </header> */}

        <main className="toggle-box">
          <div style={{ marginLeft: "10px" }}>
            <div
              className={`button-wrapper ${
                (activeTab === "technical" ? "active" : "", "button__container")
              }`}
              style={{
                // filter: `hue-rotate(${36}deg)`,
                // WebkitFilter: `hue-rotate(${36}deg)`,
                filter: "grayscale(100%)",
                WebkitFilter: "grayscale(100%)",
              }}
              onClick={() => setActiveTab("technical")}
            >
              <a className="background-button" href="#" title="Tech Team"></a>
            </div>
          </div>
          <div>
            <div
              className={`button-wrapper ${
                (activeTab === "management" ? "active" : "",
                "button__container")
              }`}
              style={{
                filter: "grayscale(100%)",
                WebkitFilter: "grayscale(100%)",
              }}
              onClick={() => setActiveTab("management")}
            >
              <a className="background-button" href="#" title="Core Team"></a>
            </div>
          </div>
        </main>

        <div className="team-container">
          {/* Pass the activeTab state as filterType prop */}
          <TeamCard filterType={activeTab} />
        </div>
      </div>
    </div>
  );
}

export default Team;
