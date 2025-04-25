import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"


export default function AboutSection({
    title = "WHAT OPTICA DOES?",
    paragraphs = [
        "JIIT OPTICA, the institute's internationally recognised scientific body, offers a forum for students to discover new worlds beyond the academic curriculum. The club organizes workshops, annual festivals, national conferences, alumni gatherings, and educational visits to top research and development institutions.",
        "To inspire young minds, lectures are regularly held by renowned scholars and researchers across diverse fields. From a modest beginning with just a handful of active members, JIIT OPTICA has grown into a vibrant community with impactful social outreach.",
        "The journey from following in others' footsteps to forging its own path has been remarkable. Through events like JSCOP, technical seminars, and continuous innovation, JIIT OPTICA has set a high benchmark of excellence.",
    ],
    backgroundImage = "https://res.cloudinary.com/dnqsoxydq/image/upload/v1713942223/JSCOP6.0/whatpic1_blfkrk.jpg",
    gradientColor = "rgba(103, 58, 183, 0.3)",
}) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)
    const [fadeState, setFadeState] = useState("visible")
    const prevBgRef = useRef(backgroundImage)

    // Helper to highlight "OPTICA" in the title
    function renderTitle(title) {
        const regex = /(OPTICA)/i
        const parts = title.split(regex)
        return parts.map((part, idx) =>
            regex.test(part)
                ? <span key={idx} className="highlight-ocean_aboutsection">{part}</span>
                : part
        )
    }

    // Fade out/in when backgroundImage changes
    useEffect(() => {
        if (prevBgRef.current !== backgroundImage) {
            setFadeState("fadingOut")
            const timeout = setTimeout(() => {
                prevBgRef.current = backgroundImage
                setFadeState("fadingIn")
                setTimeout(() => setFadeState("visible"), 600)
            }, 600)
            return () => clearTimeout(timeout)
        }
    }, [backgroundImage])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.2 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % paragraphs.length)
        }, 8000)

        return () => clearInterval(interval)
    }, [paragraphs.length])



    // Orb animation variants for even smoother, more organic movement
    const orbVariants = {
        animate: {
            x: [0, 25, -25, 0],
            y: [0, -25, 25, 0],
            scale: [1, 1.12, 1, 1.08, 1],
            opacity: [0.45, 0.65, 0.55, 0.6, 0.45],
            transition: {
                duration: 14,
                repeat: Infinity,
                ease: [0.43, 0.13, 0.23, 0.96],
            },
        },
    }

    // Content animation variants with spring for extra smoothness
    const contentVariants = {
        initial: { opacity: 0, x: 60 },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 60,
                damping: 18,
                mass: 0.7
            }
        },
        exit: {
            opacity: 0,
            x: -60,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
            }
        },
    }

    return (
        <AnimatePresence mode="wait">
            {fadeState !== "fadingOut" && (
                <motion.div
                    key={backgroundImage}
                    ref={sectionRef}
                    className="about-section_aboutsection"
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                        fadeState === "fadingIn"
                            ? { opacity: [0, 1], y: [30, 0] }
                            : isVisible
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                    }
                    exit={{ opacity: 0, y: 30, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Overlay to soften background and orb clash */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(30,30,60,0.32)",
                            zIndex: 1,
                            pointerEvents: "none",
                        }}
                    />
                    {/* Orbs behind overlay */}
                    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                        {[...Array(5)].map((_, i) => {
                            const left = `${Math.random() * 90 + 5}%`
                            const top = `${Math.random() * 90 + 5}%`
                            return (
                                <motion.div
                                    key={i}
                                    className="gradient-orb_aboutsection"
                                    variants={orbVariants}
                                    animate="animate"
                                    style={{
                                        position: "absolute",
                                        left,
                                        top,
                                        width: "70px",
                                        height: "70px",
                                        borderRadius: "50%",
                                        background: `radial-gradient(circle at 60% 40%, ${gradientColor.replace("0.3", "0.18")} 60%, transparent 100%)`,
                                        zIndex: 0,
                                        filter: "blur(40px)",
                                        opacity: 0.35,
                                        pointerEvents: "none",
                                    }}
                                />
                            )
                        })}
                    </div>
                    <motion.h2
                        className="heading_aboutsection"
                        initial={{ y: -40, opacity: 0 }}
                        animate={isVisible ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
                        transition={{ duration: 0.7, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
                        style={{ position: "relative", zIndex: 2 }}
                    >
                        {renderTitle(title)}
                    </motion.h2>
                    <div className="heading-underline_aboutsection" />
                    <div className="content-container_aboutsection" style={{ position: "relative", zIndex: 2 }}>
                        {/* <button className="nav-button_aboutsection prev" onClick={prevParagraph} aria-label="Previous paragraph">
                            <ChevronLeft className="w-6 h-6" />
                        </button> */}

                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                className="content_aboutsection"
                                key={activeIndex}
                                variants={contentVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <p>{paragraphs[activeIndex]}</p>
                                <div className="pagination_aboutsection">
                                    {paragraphs.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`pagination-dot_aboutsection ${index === activeIndex ? "active_aboutsection" : ""}`}
                                            onClick={() => setActiveIndex(index)}
                                            aria-label={`Go to paragraph ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* <button className="nav-button_aboutsection next" onClick={nextParagraph} aria-label="Next paragraph"></button>
                            <ChevronRight className="w-6 h-6" />
                        </button> */}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
