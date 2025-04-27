// import { useState, useEffect, useRef } from "react"

// export default function AboutSection({
//     title = "WHAT OPTICA DOES?",
//     paragraphs = [
//         "JIIT OPTICA, the institute's internationally recognised scientific body, offers a forum for students to discover new worlds beyond the academic curriculum. The club organizes workshops, annual festivals, national conferences, alumni gatherings, and educational visits to top research and development institutions.",
//         "To inspire young minds, lectures are regularly held by renowned scholars and researchers across diverse fields. From a modest beginning with just a handful of active members, JIIT OPTICA has grown into a vibrant community with impactful social outreach.",
//         "The journey from following in others' footsteps to forging its own path has been remarkable. Through events like JSCOP, technical seminars, and continuous innovation, JIIT OPTICA has set a high benchmark of excellence.",
//     ],
//     backgroundImage = "https://res.cloudinary.com/dnqsoxydq/image/upload/v1713942223/JSCOP6.0/whatpic1_blfkrk.jpg",
//     gradientColor = "rgba(103, 58, 183, 0.3)",
// }) {
//     const [activeIndex, setActiveIndex] = useState(0)
//     const [isVisible, setIsVisible] = useState(false)
//     const sectionRef = useRef(null)

//     // Helper to highlight "OPTICA" in the title
//     function renderTitle(title) {
//         const regex = /(OPTICA)/i
//         const parts = title.split(regex)
//         return parts.map((part, idx) =>
//             regex.test(part)
//                 ? <span key={idx} className="highlight-ocean_aboutsection">{part}</span>
//                 : part
//         )
//     }

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => setIsVisible(entry.isIntersecting),
//             { threshold: 0.2 }
//         )

//         if (sectionRef.current) {
//             observer.observe(sectionRef.current)
//         }

//         return () => {
//             if (sectionRef.current) {
//                 observer.unobserve(sectionRef.current)
//             }
//         }
//     }, [])

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setActiveIndex((prev) => (prev + 1) % paragraphs.length)
//         }, 8000)

//         return () => clearInterval(interval)
//     }, [paragraphs.length])

//     return (
//         <div
//             ref={sectionRef}
//             className={`about-section_aboutsection ${isVisible ? 'visible' : ''}`}
//             style={{
//                 backgroundImage: `url(${backgroundImage})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 position: "relative",
//                 overflow: "hidden",
//                 opacity: isVisible ? 1 : 0,
//                 transform: `translateY(${isVisible ? 0 : '30px'})`,
//                 transition: 'opacity 0.9s ease, transform 0.9s ease',
//             }}
//         >
//             <div
//                 style={{
//                     position: "absolute",
//                     inset: 0,
//                     background: "rgba(30,30,60,0.32)",
//                     zIndex: 1,
//                     pointerEvents: "none",
//                 }}
//             />
//             <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
//                 {[...Array(5)].map((_, i) => {
//                     const left = `${Math.random() * 90 + 5}%`
//                     const top = `${Math.random() * 90 + 5}%`
//                     return (
//                         <div
//                             key={i}
//                             className="gradient-orb_aboutsection"
//                             style={{
//                                 position: "absolute",
//                                 left,
//                                 top,
//                                 width: "70px",
//                                 height: "70px",
//                                 borderRadius: "50%",
//                                 background: `radial-gradient(circle at 60% 40%, ${gradientColor.replace("0.3", "0.18")} 60%, transparent 100%)`,
//                                 zIndex: 0,
//                                 filter: "blur(40px)",
//                                 opacity: 0.35,
//                                 pointerEvents: "none",
//                             }}
//                         />
//                     )
//                 })}
//             </div>
//             <h2
//                 className="heading_aboutsection"
//                 style={{
//                     position: "relative",
//                     zIndex: 2,
//                     opacity: isVisible ? 1 : 0,
//                     transform: `translateY(${isVisible ? 0 : '-40px'})`,
//                     transition: 'opacity 0.9s ease, transform 0.9s ease',
//                 }}
//             >
//                 {renderTitle(title)}
//             </h2>
//             <div className="heading-underline_aboutsection" />
//             <div className="content-container_aboutsection" style={{ position: "relative", zIndex: 2 }}>
//                 <div className="content_aboutsection">
//                     <p style={{
//                         opacity: 1,
//                         transition: 'opacity 0.9s ease'
//                     }}>
//                         {paragraphs[activeIndex]}
//                     </p>
//                     <div className="pagination_aboutsection">
//                         {paragraphs.map((_, index) => (
//                             <button
//                                 key={index}
//                                 className={`pagination-dot_aboutsection ${index === activeIndex ? "active_aboutsection" : ""}`}
//                                 onClick={() => setActiveIndex(index)}
//                                 aria-label={`Go to paragraph ${index + 1}`}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
