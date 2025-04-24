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
    <div className="team-section">
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
          <button
            className={
              (activeTab === "technical" ? "active" : "", "button__container")
            }
            // threeD__btn
            onClick={() => setActiveTab("technical")}
          >
            Technical
          </button>
          <button
            className={
              (activeTab === "management" ? "active" : "", "button__container")
            }
            onClick={() => setActiveTab("management")}
          >
            Management
          </button>
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
