import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Gallery from "./Pages/Gallery/Gallery";
import Aboutus from "./Pages/AboutUs/Aboutus";
import Events from "./Pages/Events/Events";
import Timeline from "./Pages/Timeline/Timeline";
import Team from "./Pages/Team/Team";
import MainPage from "./Pages/MainPage/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<MainPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/events" element={<Events />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App;
