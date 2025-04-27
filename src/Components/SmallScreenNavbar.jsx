import React, { useState } from "react";
import "./NewLandingPage.css";

const SmallScreenNavbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<div className="small-screen-navbar">
			<button className="menu-button" onClick={toggleMenu}>
				Menu
			</button>
			<div className="logo">Logo</div>
			<button className="hamburger-button" onClick={toggleMenu}>
				<span></span>
				<span></span>
				<span></span>
			</button>
			{isMenuOpen && (
				<div className="dropdown-menu">
					<ul>
						<li>Home</li>
						<li>About</li>
						<li>Services</li>
						<li>Portfolio</li>
						<li>Contact</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default SmallScreenNavbar;
