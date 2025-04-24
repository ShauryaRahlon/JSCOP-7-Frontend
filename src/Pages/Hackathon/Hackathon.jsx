import React, { useState } from 'react'
import './Hackathon.css'

const faqs = [
    {
        question: "What is a Hackathon?",
        answer:
            "A hackathon is a collaborative coding event where developers, designers, and programmers come together to create solutions for real-world problems and compete for exciting prizes. It offers a fast-paced learning environment where participants push their limits and work in sync to build projects from scratch."
    },
    {
        question: "Why should someone join a hackathon?",
        answer:
            "There are many reasons people join hackathons: the thrill of solving tough challenges, the chance to express creativity, the spirit of collaboration, networking opportunities, and of course, the goodies and swag! A wide range of problem statements keeps participants excited and fully engaged.",
    },
    {
        question: "Who can take part? Are there any requirements?",
        answer:
            "Anyone with a passion for innovation, coding skills, and creative ideas is welcome to join! The only condition is that you must be currently pursuing an undergraduate degree.",
    },
    {
        question: "Is forming a team necessary?",
        answer:
            "Yes, forming a team is mandatory to participate. Each team must consist of 3 members.",
    },
    {
        question: "Can I bring a project I've already built?",
        answer:
            "No, all projects must be built during the 40-hour time slot of the hackathon. Pre-existing projects are not allowed.",
    },
    {
        question: "Can I make a cross-college team?",
        answer:
            "NO, it's not allowed. All team members must belong to the same college.",
    },
];

const Hackathon = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            <div id='title'></div>

            <div className='hackathon-container-wrapper'>
                <div className='hackathon-container'>
                    <p>
                        JIIT OPTICA STUDENT CHAPTER PRESENTS
                        <span> TESSERX </span>
                        &mdash; Hack the code, reach the stars. &mdash;
                    </p>
                </div>
                <a href="https://tesserx.devfolio.co/" target="_blank" rel="noopener noreferrer">
                    <button className='button__container'>REGISTER</button>
                </a>
            </div>

            <div className='hackathon-about-wrapper'>
                <div className='hackathon-about'>
                    <span>About </span>
                    <span className="hackathon-tesserx">
                        <span className="hackathon-blue">T</span>
                        <span className="hackathon-blue">E</span>
                        <span className="hackathon-blue">S</span>
                        <span className="hackathon-blue">S</span>
                        <span className="hackathon-blue">E</span>
                        <span className="hackathon-blue">R</span>
                        <span className="hackathon-orange">X</span>
                        <span className='hackathon-white'> ?</span>
                    </span>
                    <p>
                        Launch Ideas Into New Dimensions.
                        Welcome to TessereX — the annual flagship hackathon organized by the JIIT Optica Student Chapter, proudly hosted at Jaypee Institute of Information Technology, Noida – Sector 62.
                        Inspired by the concept of the tesseract — a 4-dimensional cube that exists beyond the limits of ordinary perception — TessereX isn't just a hackathon. It's a journey into uncharted territories of innovation, where logic bends, creativity thrives, and boundaries dissolve.
                        At TessereX, we challenge participants to go beyond conventional thinking. To build what hasn’t been built before. To reshape reality with the power of code.
                        Whether you're crafting solutions for real-world problems, exploring futuristic tech, or simply pushing the limits of your imagination — TessereX provides the perfect platform to code, create, and conquer.
                        Join us for three days of innovation, collaboration, and cosmic creativity. Step into a new dimension of hacking.
                    </p>
                </div>
            </div>

            <div className="hackathon-rules">
                <p>The Rules of the Competition</p>
                <ul>
                    <li>Teams need to have at least 3 hackers.</li>
                    <li>Teams should be made up exclusively of accepted hackers who are not organizers, volunteers, mentors, judges, sponsors, or any other privileged position at the event.</li>
                    <li>Teams can gain advice and support from organizers, volunteers, sponsors, and others.</li>
                    <li>All work on a project must be done at the hackathon.</li>
                    <li>Teams can use an idea they had before the event.</li>
                    <li>Teams can work on ideas that have already been done. Hacks do not have to be “innovative”.</li>
                    <li>Teams can work on an idea that they have worked on before (as long as they do not re-use code).</li>
                    <li>Teams can use libraries, frameworks, or open-source code in their projects.</li>
                    <li>Adding new features to existing projects is allowed. Judges will only consider new functionality introduced or new features added during the hackathon.</li>
                    <li>Teams must stop hacking once the time is up. Small bug fixes after time is up are allowed.</li>
                    <li>Projects that violate the Code of Conduct are not allowed.</li>
                    <li>Teams can be disqualified at the organizers' discretion.</li>
                </ul>
            </div>

            <div className="hackathon-faq-section">
                <h2 className="hackathon-faq-title">FAQs</h2>
                <div className="hackathon-faq-items">
                    {faqs.map((faq, index) => (
                        <div key={index} className="hackathon-faq-item">
                            <div className={`hackathon-faq-question ${openIndex === index ? 'open' : ''}`} onClick={() => toggle(index)}>
                                <span>{faq.question}</span>
                                <span className="hackathon-arrow">{openIndex === index ? "▲" : "▼"}</span>
                            </div>
                            {openIndex === index && (
                                <div className="hackathon-faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Hackathon;
