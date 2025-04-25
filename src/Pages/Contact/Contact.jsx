import React, { useState, useEffect } from "react";
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Phone,
	Mail,
	MapPin,
	Clock,
	Menu,
} from "lucide-react";
import "./Contact.scss";

const Contact = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Set visible after component mounts for animation
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={`contact-container ${isVisible ? "visible" : ""}`}>
			{/* Left Side - Fixed content */}
			<div className="sidebar">
				<div className="logo-section">
					{/* Logo can be added here if needed */}
					{/* <img src="logo.png" alt="Logo" className="logo" /> */}
					<div>
						<img
							src="/images/Jscop_logo.png"
							alt="Logo"
							className="logo"
						/>
					</div>
					<h1 className="company-name">Connect With Us</h1>
					<p className="tagline">We're always here to help</p>
				</div>

				{/* Social Media Icons */}
				<div className="social-media">
					<div className="social-icons">
						<a
							href="https://www.facebook.com/jiitopticachapter/"
							className="social-icon"
						>
							<Facebook size={24} />
						</a>
						<a
							href="https://twitter.com/jiitoptica"
							className="social-icon"
						>
							<Twitter size={24} />
						</a>
						<a
							href="https://www.instagram.com/jiitopticachapter"
							className="social-icon"
						>
							<Instagram size={24} />
						</a>
						<a
							href="https://www.linkedin.com/company/jiitopticachapter/mycompany/"
							className="social-icon"
						>
							<Linkedin size={24} />
						</a>
						<a
							href="mailto:opticastudentchapterjiit@gmail.com"
							className="social-icon"
						>
							<Mail size={24} />
						</a>
					</div>
				</div>
			</div>

			{/* Right Side - Contact Information */}
			<div className="content">
				<div className="content-wrapper">
					<div className="contact-cards">
						{/* Sales Contact Card */}
						<div className="contact-card">
							<div className="card-bg"></div>
							<div className="card-bg-overlay"></div>

							<div className="profile-circle">
								<Phone size={42} className="profile-icon" />
							</div>
							<div className="card-text-container">
								<p className="card-title">Shantanu Pandey</p>
								<p className="card-subtitle">President</p>

								<div className="contact-info">
									<span>
										<Phone size={15} /> +91 90261 52678
									</span>
									<span>shantan.pandeydm@gmail.com</span>
								</div>
							</div>
						</div>

						<div className="contact-card">
							<div className="card-bg"></div>
							<div className="card-bg-overlay"></div>
							<div className="profile-circle">
								<Mail size={42} className="profile-icon" />
							</div>
							<div className="card-text-container">
								<p className="card-title">Sai Raj Singh</p>
								<p className="card-subtitle">Vice President</p>

								<div className="contact-info">
									<span>
										<Phone size={15} /> +91 7439 557 090
									</span>
									<span>sairajsingh400@gmail.com</span>
								</div>
							</div>
						</div>

						{/* Office Location Card */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
