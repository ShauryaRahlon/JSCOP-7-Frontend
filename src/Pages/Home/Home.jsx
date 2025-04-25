import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../../Components/Navbar/Navbar";
import { Home, ArrowDown, ArrowLeft, Rotate3D } from "lucide-react";
import jscopLogo from "./../../assets/jscopLogo.png";
import opticaLogo from "./../../assets/opticaLogo.png";
import nav_jscop from "./../../assets/nav_jscop.png";
import nav_2_jscop from "./../../assets/nav_2_jscop.png";
// import rocketanimation from "./../../assets/rocket-animation.mp4";
import HomePageBG from "./../../assets/HomePageBG.mp4";
import "./NewLandingPage.css";
import Events from "../Events/Events";
import LoadComponent, { BackToHome } from "../LoadComponent/LoadComponent";

const Portfolio = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [endPosition, setEndPosition] = useState(0);
  const [initX, setInitX] = useState(0);
  const [difference, setDifference] = useState(0);
  const [index, setIndex] = useState(1);

  const [partName, setPartName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef(null);
  const sliderInnerRef = useRef(null);
  const cursorRef = useRef(null);
  const scrollRef = useRef(null);

  const offset = window.innerWidth <= 768 ? 370 : 760;
  const margin = 0;
  const threshold = 100;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prevParentRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  // Cursor settings
  const cursorSettings = {
    size: "18",
    expandedSize: "40",
    expandSpeed: 0.4,
    background: "rgba(161, 142, 218, 0.25)",
    opacity: "1",
    transitionTime: "1.4s",
    transitionEase: "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
    borderWidth: "0",
    borderColor: "black",
    iconSize: "11px",
    iconColor: "white",
    triggerElements: {
      trigger: {
        className: "trigger",
        icon: '<i class="fa fa-plus"></i>',
      },
      trigger2: {
        className: "slider_inner",
        icon: '<i class="fa fa-arrows-h"></i>',
      },
    },
  };

  useEffect(() => {
    // Center the slider
    if (sliderInnerRef.current) {
      const width = document.documentElement.clientWidth;
      const slideWidth = sliderInnerRef.current.querySelector(
        ".slider_inner__slide"
      ).offsetWidth;
      sliderInnerRef.current.style.left = `${width / 2 - slideWidth / 2}px`;
    }

    // Set introComplete after timeout
    const introTimer = setTimeout(() => {
      setIntroComplete(true);
    }, 2500);

    // Setup mouse speed detection
    setupMouseSpeedDetection();

    // Setup window resize event
    const handleResize = () => {
      if (sliderInnerRef.current) {
        const width = document.documentElement.clientWidth;
        const slideWidth = sliderInnerRef.current.querySelector(
          ".slider_inner__slide"
        ).offsetWidth;
        sliderInnerRef.current.style.left = `${width / 2 - slideWidth / 2}px`;
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      clearTimeout(introTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    // Setup wheel event
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        setScrollPosition((prev) => prev + 10);
        if (contentRef.current) {
          contentRef.current.style.top = `${-scrollPosition}px`;
        }

        if (introComplete) {
          document.querySelector(".page_portfolio").style.opacity = "1";
          document.querySelector(".page_portfolio").style.clipPath =
            "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)";
          document
            .querySelectorAll(
              ".logo img, .portfolio_home__title h1, .portfolio_home__title hr, .portfolio_home__title img.trigger"
            )
            .forEach((el) => {
              el.classList.add("out");
            });
          document.querySelector(".slider_inner").classList.add("in");

          setTimeout(() => {
            if (sliderInnerRef.current) {
              sliderInnerRef.current.click();
            }
          }, 2000);
        }
      } else {
        setScrollPosition((prev) => prev - 10);
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [introComplete, scrollPosition]);

  const handleTriggerClick = () => {
    const portfolioWork = document.querySelector(".portfolio_home__work");
    const portfolioPage = document.querySelector(".page_portfolio");

    console.log("r : ", portfolioPage);
    console.log("p : ", portfolioWork);

    if (portfolioWork && portfolioPage) {
      const isExpanded = portfolioWork.classList.contains("expand");
      const opacity = window
        .getComputedStyle(portfolioPage)
        .getPropertyValue("opacity");

      console.log("opacity is: ", opacity, isExpanded);

      if (isExpanded && opacity === "0") {
        // Delay setIsOpen(true) by 300ms
        setTimeout(() => {
          setIsOpen(true);
        }, 1100);
      } else {
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }

    document.querySelector(".page_portfolio").style.opacity = "1";
    document.querySelector(".page_portfolio").style.clipPath =
      "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)";
    document
      .querySelectorAll(
        ".logo img, .portfolio_home__title h1, .portfolio_home__title hr, .portfolio_home__title img.trigger"
      )
      .forEach((el) => {
        el.classList.add("out");
      });
    document.querySelector(".slider_inner").classList.add("in");

    setTimeout(() => {
      if (sliderInnerRef.current) {
        sliderInnerRef.current.click();
      }
    }, 2500);
  };
  const handleLandingTriggerClick = () => {
    setIsOpen(() => {
      const portfolioWork = document.querySelector(".portfolio_home__work");
      const portfolioPage = document.querySelector(".page_portfolio");
      console.log("r : ", portfolioPage);
      console.log("p : ", portfolioWork);

      if (portfolioWork && portfolioPage) {
        const isExpanded = portfolioWork.classList.contains("expand");
        const opacity = window
          .getComputedStyle(portfolioPage)
          .getPropertyValue("opacity");
        console.log("opacity is: ", opacity, isExpanded);

        if (isExpanded && opacity === "0") {
          return true;
        }
      }
      console.log("returning : ", false);
      return false;
    });
    // Reset styles for .page_portfolio
    const pagePortfolio = document.querySelector(".page_portfolio");
    if (pagePortfolio) {
      pagePortfolio.style.opacity = "";
      pagePortfolio.style.clipPath = "";
    }

    // Remove "out" class from elements
    document
      .querySelectorAll(
        ".logo img, .portfolio_home__title h1, .portfolio_home__title hr, .portfolio_home__title img.trigger"
      )
      .forEach((el) => {
        el.classList.remove("out");
      });

    // Remove "in" class from .slider_inner
    const sliderInner = document.querySelector(".slider_inner");
    if (sliderInner) {
      sliderInner.classList.remove("in");
    }
  };

  // const handleButtonClick = (e) => {
  //   e.target.parentNode.classList.add("clicked");
  //   e.target.parentNode.parentNode.parentNode.classList.add("clicked");
  //   document.querySelector(".portfolio_home__work").classList.add("expand");
  // };

  let prev_parent;
  // const prevParentRef = useRef(null);

  const handleButtonClick = (e) => {
    setPartName(e.target.dataset.partName);
    setTimeout(() => {
      // setIsScrolling((prev) => !prev);
      setIsOpen((prev) => !prev);
    }, 500);

    const parent = e.target.parentNode;
    prevParentRef.current = parent;
    console.log("prev sssss ....", prevParentRef.current);
    const grandParent = parent.parentNode.parentNode;
    const portfolioWork = document.querySelector(".portfolio_home__work");
    console.log("parent", parent);
    console.log("grandParent", grandParent);
    console.log("portfolioWork", portfolioWork);
    parent.classList.toggle("clicked");
    grandParent.classList.toggle("clicked");
    portfolioWork.classList.toggle("expand");
  };

  const handleNavClick = (index) => {
    const openCard = document.querySelector(".slider_inner__slide.clicked");
    if (openCard) {
      openCard.classList.remove("clicked");
      document
        .querySelector(".portfolio_home__work")
        .classList.remove("expand");
    }

    // Find the target card using the data-index attribute
    const targetCard = document.querySelector(
      `.slider_inner__slide[data-index="${index}"]`
    );
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "center" });

      // Open the target card after scrolling
      setTimeout(() => {
        targetCard.classList.add("clicked");
        document.querySelector(".portfolio_home__work").classList.add("expand");
      }, 500); // Delay to ensure scrolling is complete
    }

    // Update navbar underline
    const navItems = document.querySelectorAll(".nav ul li");
    navItems.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Update slider position
    const sliderInner = document.querySelector(".slider_inner");
    const newThreshold = offset - (offset + margin) * index;
    console.log("new....", newThreshold);
    console.log("New index", prevIdxRef.current + 1);
    sliderInner.style.transform = `translateX(${newThreshold}px) translateY(120px)`;
    sliderInner.style.transition = "transform 0.8s ease-in-out";
    sliderInner.scrollLeft = newThreshold;

    // Reset state variables
    setIndex(index);
    setEndPosition(newThreshold);
    setDifference(0);
    setDragging(false);
    setScrollPosition(0);
    setInitX(0);

    // Remove transition after animation
    setTimeout(() => {
      sliderInner.style.transition = "";
    }, 500);
  };
  const prevIdxRef = useRef(1);
  const moveBetweenPages = (openIdx) => {
    setIsOpen((prev) => false);
    console.log("hello......", prevParentRef.current);
    if (prevParentRef.current) {
      console.log("prev : ", prevParentRef.current);

      // Remove classes from previous elements
      prevParentRef.current.parentNode.parentNode.classList.remove("clicked");
      prevParentRef.current.parentNode.classList.remove("clicked");
      document
        .querySelector(".portfolio_home__work")
        .classList.remove("expand");
      prevParentRef.current.parentNode.classList.remove("expand");

      // Animate previous elements
    }
    const prevIdx = prevIdxRef.current;
    console.log(`.cats_${prevIdx}`, " prevIdx : ", prevIdx);

    const catsPrev = document.querySelector(`.cats_${prevIdx}`);
    const overlayPrev = document.querySelector(`.overlay_${prevIdx}`);
    const titlePrev = document.querySelector(`.title_${prevIdx}`);
    const buttonPrev = document.querySelector(`.button_${prevIdx}`);

    // Delay navigation and new fade-in
    setTimeout(() => {
      // Trigger the nav logic (e.g., change content)
      handleNavClick(openIdx);

      if (catsPrev) {
        catsPrev.style.transition = "opacity 0.6s ease";
        catsPrev.style.opacity = 0;
        console.log("called");
      }
      if (overlayPrev) {
        overlayPrev.style.transition = "opacity 0.6s ease";
        overlayPrev.style.opacity = 0;
      }
      if (titlePrev) {
        titlePrev.style.transition = "opacity 0.6s ease";
        titlePrev.style.opacity = 0;
      }
      if (buttonPrev) {
        buttonPrev.style.transition = "opacity 0.6s ease";
        buttonPrev.style.opacity = 0;
      }

      // Animate new elements in
      const catsNew = document.querySelector(`.cats_${openIdx}`);
      const overlayNew = document.querySelector(`.overlay_${openIdx}`);
      const titleNew = document.querySelector(`.title_${openIdx}`);
      const buttonNew = document.querySelector(`.button_${openIdx}`);

      if (catsNew) {
        catsNew.style.transition = "opacity 0.6s ease 0.2s";
        catsNew.style.opacity = 1;
      }
      if (overlayNew) {
        overlayNew.style.transition = "opacity 0.6s ease 0.2s";
        overlayNew.style.opacity = 1;
      }
      if (titleNew) {
        titleNew.style.transition = "opacity 0.6s ease 0.2s";
        titleNew.style.opacity = 1;
      }
      if (buttonNew) {
        buttonNew.style.transition = "opacity 0.6s ease 0.2s";
        buttonNew.style.opacity = 1;
      }
    }, 1000);
    // setTimeout(() => {
    //   document.querySelector(`.button_${openIdx}`).click();
    // }, 2000);
    prevIdxRef.current = openIdx;
    console.log("prevIdx", prevIdx);
  };

  const handleSliderScroll = () => {
    console.log("Scrolling");
    // i want to scroll the slider horizontally
    const sliderInner = document.querySelector(".slider_inner");
    const sliderInnerWidth = sliderInner.offsetWidth;
    const sliderInnerScrollLeft = sliderInner.scrollLeft;
    const sliderInnerScrollRight = sliderInner.scrollLeft + sliderInnerWidth;
    console.log(sliderInnerScrollLeft, sliderInnerScrollRight);

    if (sliderInnerScrollLeft === 0) {
      sliderInner.scrollLeft = sliderInnerWidth;
    }

    if (sliderInnerScrollRight === sliderInner.scrollWidth) {
      sliderInner.scrollLeft = 0;
    }
  };

  const handleSliderClick = () => {
    console.log("Clicked slider button");
    document.querySelectorAll(".slider_inner__slide").forEach((slide) => {
      slide.style.animation = "none";
      slide.style.transform = "rotateY(0deg) scale(1)";
    });
  };

  const handleSliderMouseDown = (e) => {
    console.log("SliderMouseDown");
    setInitX(e.clientX);
    setDragging(true);

    if (cursorRef.current) {
      cursorRef.current.style.transition = "transform 0s 0s";
    }
  };

  const handleSliderMouseMove = (e) => {
    if (dragging) {
      const mouseX = e.clientX;
      const newDifference = mouseX - initX;
      setDifference(newDifference);

      const currentIndex = index;

      // Adjust opacity of elements based on drag distance
      const selector = `.slider_inner__slide:nth-of-type(${parseInt(
        currentIndex + 1
      )}) .image .overlay, .slider_inner__slide:nth-of-type(${parseInt(
        currentIndex + 1
      )}) .image .title, .slider_inner__slide:nth-of-type(${parseInt(
        currentIndex + 1
      )}) .image .cats, .slider_inner__slide:nth-of-type(${parseInt(
        currentIndex + 1
      )}) .image .button`;

      document.querySelectorAll(selector).forEach((el) => {
        el.style.opacity = 1 - Math.abs(newDifference / 200);
        el.style.transition = "all .2s";
      });

      if (sliderInnerRef.current) {
        sliderInnerRef.current.style.transform = `translateX(${newDifference + endPosition
          }px) translateY(120px)`;
      }
    }
  };

  const handleSliderMouseUp = () => {
    console.log("SliderMouseUp");
    if (cursorRef.current) {
      cursorRef.current.style.transition = `transform ${cursorSettings.transitionTime} ${cursorSettings.transitionEase}, width ${cursorSettings.expandSpeed}s .2s, height ${cursorSettings.expandSpeed}s .2s, opacity 1s .2s`;
    }

    let newIndex = index;
    let newEndPosition = endPosition;

    if (difference < -160) {
      if (newIndex < 7) {
        newIndex++;
      }
    } else if (difference > 160) {
      if (newIndex > 0) {
        newIndex--;
      }
    }

    // Calculate new threshold position
    const newThreshold = offset - (offset + margin) * newIndex;

    if (sliderInnerRef.current) {
      sliderInnerRef.current.style.transform = `translateX(${newThreshold}px) translateY(120px)`;
    }

    setEndPosition(newThreshold);
    setIndex(newIndex);
    setDragging(false);
    setDifference(0);

    // Reset opacity and transform for slides
    document
      .querySelectorAll(
        `.slider_inner__slide:nth-of-type(${parseInt(
          newIndex + 1
        )}) .image .overlay, .slider_inner__slide:nth-of-type(${parseInt(
          newIndex + 1
        )}) .image .title, .slider_inner__slide:nth-of-type(${parseInt(
          newIndex + 1
        )}) .image .cats, .slider_inner__slide:nth-of-type(${parseInt(
          newIndex + 1
        )}) .image .button`
      )
      .forEach((el) => {
        el.style.opacity = 1;
      });

    document.querySelectorAll(".slider_inner__slide").forEach((slide) => {
      slide.style.transform = "rotateY(0deg) scale(1)";
    });

    // Hide all slideClones and show only the current one
    document.querySelectorAll(".slideClone").forEach((clone) => {
      clone.style.display = "none";
    });

    const currentClone = document.querySelector(
      `.slideClone:nth-of-type(${parseInt(newIndex + 2)})`
    );
    if (currentClone) {
      currentClone.style.display = "block";
    }

    // Update nav item active state
    const navItems = document.querySelectorAll(".nav ul li");
    navItems.forEach((item, idx) => {
      if (idx === newIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  const handleBackClick = (e) => {
    console.log("click");
    setIsOpen((prev) => false);
    console.log(e);
    e.target.parentNode.parentNode.parentNode.classList.remove("clicked");
    e.target.parentNode.parentNode.classList.remove("clicked");
    document.querySelector(".portfolio_home__work").classList.remove("expand");

    e.target.parentNode.parentNode.classList.remove("expand");
  };

  // Mouse speed detection setup
  const setupMouseSpeedDetection = () => {
    let lastMouseX = -1;
    let lastMouseY = -1;
    let lastMouseTime;
    let mouseTravel = 0;
    let mpoints = [];
    const mpointsMax = 30;
    let direction;

    const handleMouseMove = (e) => {
      const mouseX = e.pageX;
      const mouseY = e.pageY;

      if (lastMouseX > -1) {
        mouseTravel += Math.max(
          Math.abs(mouseX - lastMouseX),
          Math.abs(mouseY - lastMouseY)
        );
      }

      if (mouseX - lastMouseX > 0) {
        direction = "+";
      } else {
        direction = "-";
      }

      lastMouseX = mouseX;
      lastMouseY = mouseY;

      // Update cursor position
      if (cursorRef.current) {
        cursorRef.current.style.opacity = cursorSettings.opacity;
        cursorRef.current.style.top = "0";
        cursorRef.current.style.left = "0";
        cursorRef.current.style.transform = `translateX(calc(${mouseX}px - 50%)) translateY(calc(${mouseY}px - 50%))`;
      }
    };

    const calculateMouseSpeed = () => {
      const now = new Date().getTime();

      if (lastMouseTime && lastMouseTime !== now) {
        const pps = Math.round((mouseTravel / (now - lastMouseTime)) * 1000);
        mpoints.push(pps);

        if (mpoints.length > mpointsMax) {
          mpoints.splice(0, 1);
        }

        mouseTravel = 0;

        if (dragging) {
          const velocity = 0.5 - pps / 40000;

          document.querySelectorAll(".slider_inner__slide").forEach((slide) => {
            slide.style.transform = `rotateY(${direction}${pps / 110
              }deg) scale(1)`;
            slide.style.transition = `all ${velocity}s`;
          });
        }
      }

      lastMouseTime = now;
      setTimeout(calculateMouseSpeed, 30);
    };

    document.addEventListener("mousemove", handleMouseMove);
    calculateMouseSpeed();

    // Set up idle detection
    let idleTimer;
    const handleActivity = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = cursorSettings.opacity;
      }

      clearTimeout(idleTimer);

      idleTimer = setTimeout(() => {
        if (cursorRef.current) {
          cursorRef.current.style.opacity = 0;
        }
      }, 4000);
    };

    document.addEventListener("mousemove", handleActivity);

    // Setup triggers for custom cursor
    setTimeout(() => {
      setupTriggers();
    }, 500);
  };

  // Setup trigger elements for custom cursor
  const setupTriggers = () => {
    Object.keys(cursorSettings.triggerElements).forEach((key) => {
      const className = cursorSettings.triggerElements[key].className;
      const icon = cursorSettings.triggerElements[key].icon;

      const triggers = document.querySelectorAll(`.${className}`);

      triggers.forEach((trigger) => {
        trigger.style.cursor = "default";

        trigger.addEventListener("mouseover", () => {
          if (cursorRef.current) {
            cursorRef.current.style.width = `${cursorSettings.expandedSize}px`;
            cursorRef.current.style.height = `${cursorSettings.expandedSize}px`;

            const cursorIcon = cursorRef.current.querySelector(".cursorIcon");
            if (cursorIcon) {
              cursorIcon.innerHTML = icon;
              cursorIcon.style.opacity = 1;
            }
          }
        });

        trigger.addEventListener("mouseout", () => {
          if (cursorRef.current) {
            cursorRef.current.style.width = `${cursorSettings.size}px`;
            cursorRef.current.style.height = `${cursorSettings.size}px`;

            const cursorIcon = cursorRef.current.querySelector(".cursorIcon");
            if (cursorIcon) {
              cursorIcon.style.opacity = 0;
            }
          }
        });
      });
    });
  };

  // Create dynamic cursor
  useEffect(() => {
    const cursor = document.createElement("div");
    const cursorIcon = document.createElement("div");

    cursorIcon.classList.add("cursorIcon");
    cursorIcon.style.position = "absolute";
    cursorIcon.style.fontFamily = "Raleway";
    cursorIcon.style.textTransform = "uppercase";
    cursorIcon.style.fontWeight = "800";
    cursorIcon.style.textAlign = "center";
    cursorIcon.style.top = "50%";
    cursorIcon.style.width = "100%";
    cursorIcon.style.transform = "translateY(-50%)";
    cursorIcon.style.color = cursorSettings.iconColor;
    cursorIcon.style.fontSize = cursorSettings.iconSize;
    cursorIcon.style.opacity = 0;
    cursorIcon.style.transition = `opacity ${cursorSettings.expandSpeed}s`;

    cursor.classList.add("dynamicCursor");
    cursor.style.boxSizing = "border-box";
    cursor.style.width = `${cursorSettings.size}px`;
    cursor.style.height = `${cursorSettings.size}px`;
    cursor.style.borderRadius = `${cursorSettings.expandedSize}px`;
    cursor.style.opacity = 0;
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = 999;
    cursor.style.transition = `transform ${cursorSettings.transitionTime} ${cursorSettings.transitionEase}, width ${cursorSettings.expandSpeed}s .2s, height ${cursorSettings.expandSpeed}s .2s, opacity 1s .2s`;
    cursor.style.border = `${cursorSettings.borderWidth}px solid ${cursorSettings.borderColor}`;
    cursor.style.position = "fixed";
    cursor.style.background = cursorSettings.background;

    cursor.appendChild(cursorIcon);
    document.body.appendChild(cursor);

    cursorRef.current = cursor;

    // Fixed scroll handler function with both X and Y scroll positions
    const handleScroll = () => {
      const scrollX = window.scrollX || window.pageXOffset;
      console.log("Scroll position - X:");

      // Example of logic using horizontal scroll
      if (scrollX > 200) {
        console.log("User scrolled horizontally past threshold");
        // Do something when user scrolled horizontally past 200px
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Load Font Awesome
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://maxcdn.icons8.com/fonts/line-awesome/1.1/css/line-awesome-font-awesome.min.css";
    document.head.appendChild(link);

    setTimeout(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = cursorSettings.opacity;
      }
    }, 500);

    return () => {
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }

      // Clean up scroll event listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="cursor">
        <div className="cursor_point"></div>
        <div className="cursor_outer"></div>
      </div>
      <div className="portfolio">
        <div className="portfolio_home">
          <div className="rocket-animation-overlay"></div>
          <div className="rocket-animation-container">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="rocket-animation-video"
            >
              <source src={HomePageBG} type="video/mp4" />
            </video>
          </div>
          <div className="portfolio_home__header">
            <div className="hamburger trigger" onClick={handleTriggerClick}>
              <div className="hamburger_part"></div>
              <div className="hamburger_part"></div>
              <div className="hamburger_part"></div>
            </div>
          </div>
          <div className="portfolio_home__title">
            <div className="logo">
              <img
                className="first"
                src={opticaLogo}
                // src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/clogotemp.png"
                alt="Logo"
              />{" "}
              &nbsp;
              <img
                className="second"
                src={jscopLogo}
                // src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/clogotemp2.png"
                alt="Logo"
              />
              <div className="page_portfolio">
                <div className="portfolio_home__header">
                  <div className="logoMain">
                    <img src={nav_jscop} alt="jscop" />
                    {/* <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/cagencylogo.png"
                      alt="Agency Logo"
                    /> */}
                  </div>
                  <div className="nav">
                    <ul>
                      <li
                        className="trigger"
                        onClick={() => moveBetweenPages(0)}
                      >
                        About Us
                      </li>
                      <li
                        className="active trigger"
                        onClick={() => moveBetweenPages(1)}
                      >
                        Events
                      </li>
                      <li
                        className="trigger"
                        onClick={() => moveBetweenPages(2)}
                      >
                        Speakers
                      </li>
                      <li
                        className="trigger"
                        onClick={() => moveBetweenPages(3)}
                      >
                        Timeline
                      </li>
                      <li
                        className="trigger"
                        onClick={() => moveBetweenPages(4)}
                      >
                        Team
                      </li>
                      <li
                        className="trigger"
                        onClick={() => moveBetweenPages(5)}
                      >
                        Gallery
                      </li>
                      <li
                        className="trigger"
                        onClick={() => moveBetweenPages(6)}
                      >
                        Hackathon
                      </li>
                      <li
                        className="trigger"
                        onClick={() => moveBetweenPages(7)}
                      >
                        Contact
                      </li>
                    </ul>
                  </div>
                  {/* <div className="number black">0161 345 3464</div> */}
                  {/* <div style={{ position: "relative" }}> */}
                  <Navbar moveBetweenPages={moveBetweenPages} />
                  {/* </div> */}
                  <div
                    className="hamburger black trigger"
                    onClick={handleLandingTriggerClick}
                  >
                    <div className="hamburger_part"></div>
                    <div className="hamburger_part"></div>
                    <div className="hamburger_part"></div>
                  </div>
                </div>
                <div className="slider_note">Drag through our work</div>
                <div className="portfolio_home__work">
                  <div className="portfolio_home__header work">
                    {/* <div className="back" onClick={handleBackClick}> */}
                    {/* <img
                        className="trigger"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png"
                        alt="Arrow"
                        // onClick={handleButtonClick}
                      /> */}
                    {/* <ArrowLeft
                        className="trigger"
                        size={30}
                        style={{
                          marginTop: "82vh",
                          position: "absolute",
                          left: "10px",
                          bottom: "100px",
                          zIndex: "1000",
                        }}
                        color="#b9c1ca"
                      /> */}
                    <BackToHome
                      isOpen={isOpen}
                      handleBackClick={handleBackClick}
                    />
                    {/* </div> */}
                    <div className="logoMain">
                      <img src={nav_2_jscop} alt="Logo White" />
                      {/* <img
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/slogowhite.png"
                        alt="Logo White"
                      /> */}
                    </div>
                    <div className="nav">
                      <ul>
                        <li
                          className="trigger"
                          onClick={() => moveBetweenPages(0)}
                        >
                          About Us
                        </li>
                        <li
                          className="active trigger"
                          onClick={() => moveBetweenPages(1)}
                        >
                          Events
                        </li>
                        <li
                          className="trigger"
                          onClick={() => moveBetweenPages(2)}
                        >
                          Speakers
                        </li>
                        <li
                          className="trigger"
                          onClick={() => moveBetweenPages(3)}
                        >
                          Timeline
                        </li>
                        <li
                          className="trigger"
                          onClick={() => moveBetweenPages(4)}
                        >
                          Team
                        </li>
                        <li
                          className="trigger"
                          onClick={() => moveBetweenPages(5)}
                        >
                          Gallery
                        </li>
                        <li
                          className="trigger"
                          onClick={() => moveBetweenPages(6)}
                        >
                          Hackathon
                        </li>
                        <li
                          className="trigger"
                          onClick={() => moveBetweenPages(7)}
                        >
                          Contact
                        </li>
                      </ul>
                    </div>
                    {/* <div className="number white">0161 345 3464</div> */}
                    <div
                      className="hamburger white trigger"
                      onClick={handleLandingTriggerClick}
                    >
                      <div className="hamburger_part"></div>
                      <div className="hamburger_part"></div>
                      <div className="hamburger_part"></div>
                    </div>
                  </div>
                  <div className="slideClone">
                    <div className="title f">
                      .01
                      <br />
                      About Us
                    </div>
                    <div className="image parent_0">
                      <img
                        draggable="false"
                        src="https://images4.alphacoders.com/135/thumb-1920-1355268.jpeg"
                        alt="My Protein"
                        width={"100%"}
                      />
                      <div className="overlay"></div>
                      <div className="cats">OPTICA · JIIT · SOCIETY</div>
                      <div className="title">
                        Optica’s student-led journey through JSCOP
                      </div>
                    </div>
                  </div>
                  <div className="slideClone">
                    <div className="title f">
                      .02
                      <br />
                      Events
                    </div>
                    <div
                      className="image parent_1"
                    // style={{
                    //   position: "relative",
                    //   overflow: flag ? "scroll" : "hidden",
                    // }}
                    >
                      <img
                        draggable="false"
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/source/02896e26093165.5634f7cdacf7b.png"
                        alt="Nike Air Max"
                        width={"100%"}
                      />
                      <div className="overlay"></div>
                      <div className="cats">
                        ALL THE ACTION, ALL IN ONE PLACE
                      </div>
                      <div className="title">
                        From Fun Games to Tech & ECE Events
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          left: "10px",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <LoadComponent isOpen={isOpen} part={partName} />
                      </div>
                    </div>
                  </div>
                  <div className="slideClone">
                    <div className="title f">
                      .03
                      <br />
                      Speakers
                    </div>
                    <div className="image parent_2">
                      <img
                        draggable="false"
                        src="https://i.pinimg.com/1200x/99/0d/a2/990da2cf0c344336fb5f1cb3d126cdf8.jpg"
                        alt="Apple Watch"
                        width={"100%"}
                      />
                      <div className="overlay"></div>
                      <div className="cats">Our ESTEEMED SPEAKERS</div>
                      <div className="title">
                        Get inspired by expert speakers & professionals.
                      </div>
                    </div>
                  </div>
                  <div className="slideClone">
                    <div className="title f">
                      .04
                      <br />
                      Timeline
                    </div>
                    <div className="image parent_3">
                      <img
                        draggable="false"
                        src="https://i.pinimg.com/1200x/0b/ad/76/0bad76ab3862413a4ae861b7f55d4313.jpg"
                        alt="Jade Teriyaki"
                        width={"100%"}
                      />
                      <div className="overlay"></div>
                      <div className="cats">MARK THE DATES, DON'T BE LATE</div>
                      <div className="title">
                        Keep up with what's next — stay tuned!
                      </div>
                    </div>
                  </div>
                  <div className="slideClone">
                    <div className="title f">
                      .05
                      <br />
                      Our Team
                    </div>
                    <div className="image parent_4">
                      <img
                        draggable="false"
                        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5181c7f5-4300-4d23-a0d1-d0cc2a40214b/de8ruib-78b98309-28f0-4c3f-a560-f58e885d2d27.jpg/v1/fill/w_1192,h_670,q_70,strp/anomaly_by_tobiasroetsch_de8ruib-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzUxODFjN2Y1LTQzMDAtNGQyMy1hMGQxLWQwY2MyYTQwMjE0YlwvZGU4cnVpYi03OGI5ODMwOS0yOGYwLTRjM2YtYTU2MC1mNThlODg1ZDJkMjcuanBnIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.EqxrCHV903nldbc4EMwoSlVlWfP51pWUJUi__43zbw0
                        "
                        alt="Jade Teriyaki"
                      />
                      <div className="overlay"></div>
                      <div className="cats">
                        TEAM OPTICA: THE MINDS BEHIND JSCOP
                      </div>
                      <div className="title">
                        Meet the crew making JSCOP 7.0 magic
                      </div>
                    </div>
                  </div>
                  <div
                    className="slideClone"
                  // style={{
                  //   overflowY: isScrolling ? "scroll" : "hidden",
                  //   overflowX: "hidden",
                  // }}
                  >
                    <div className="title f">
                      .06
                      <br />
                      Gallery
                    </div>
                    <div className="image parent_5">
                      <img
                        draggable="false"
                        src="https://i.pinimg.com/1200x/1f/dc/04/1fdc0438f61ea244d2e48ea3ccefffb6.jpg"
                        alt="Jade Teriyaki"
                      />
                      <div className="overlay"></div>
                      <div className="cats">
                        RELIVE THE MOMENTS, EXPLORE OUR GALLERY
                      </div>
                      <div className="title">
                        Browse through memories of our events
                      </div>

                      {/* <LoadComponent isOpen={isOpen} part={"gallery"} /> */}
                    </div>
                  </div>
                  <div className="slideClone">
                    <div className="title f">
                      .07
                      <br />
                      Hackathon
                    </div>
                    <div className="image parent_6">
                      <img
                        draggable="false"
                        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9f4085a5-316b-4aa3-9708-18958f71343d/dj6qfii-99ab04c2-8a40-404a-be03-900f6ab30361.jpg/v1/fill/w_1210,h_660,q_70,strp/tidal_gravity_generation_habitat__by_artworksstudio_dj6qfii-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Njk5IiwicGF0aCI6IlwvZlwvOWY0MDg1YTUtMzE2Yi00YWEzLTk3MDgtMTg5NThmNzEzNDNkXC9kajZxZmlpLTk5YWIwNGMyLThhNDAtNDA0YS1iZTAzLTkwMGY2YWIzMDM2MS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.mS4eLyHQInmTOGAb7VFCLlYPvDbVWNF_7JV-TtgNpdY"
                        alt="Jade Teriyaki"
                        width={"100%"}
                      />
                      <div className="overlay"></div>
                      <div className="cats">CODE. CREATE. CONQUER.</div>
                      <div className="title">
                        Collaborate, compete, and create at Hackathon
                      </div>
                    </div>
                  </div>
                  <div className="slideClone">
                    <div className="title f">
                      .08
                      <br />
                      Contact Us
                    </div>
                    <div className="image parent_7">
                      <img
                        draggable="false"
                        src="https://i.pinimg.com/1200x/5f/e3/e1/5fe3e182ec10205edfc194c3126eb3aa.jpg"
                        alt="Jade Teriyaki"
                        width={"100%"}
                      />
                      <div className="overlay"></div>
                      <div className="cats">GET IN TOUCH WITH OPTICA</div>
                      <div className="title">
                        Questions, ideas, or feedback? Let’s connect.
                      </div>
                    </div>
                  </div>
                  {/* <img
                    className="scroll"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png"
                    alt="Scroll"
                  /> */}
                  <div className="arrow-icon">
                    <ArrowDown className="scroll" size={30} color="#b9c1ca" />
                  </div>
                </div>
                <div className="portfolio_home__slider">
                  <div
                    className="slider_inner"
                    ref={sliderInnerRef}
                    onClick={handleSliderClick}
                    onMouseDown={handleSliderMouseDown}
                    onMouseMove={handleSliderMouseMove}
                    onMouseUp={handleSliderMouseUp}
                    onScroll={handleSliderScroll}
                  // ref={scrollRef}
                  >
                    <div className="slider_inner__slide">
                      <div className="title" data-index="0">
                        .01
                        <br />
                        About Us
                      </div>
                      <div className="image parent_0">
                        <img
                          draggable="false"
                          src="https://images4.alphacoders.com/135/thumb-1920-1355268.jpeg"
                          alt="My Protein"
                          width={"100%"}
                        />
                        <div className="overlay overlay_0"></div>
                        <div className="cats cats_0">
                          OPTICA · JIIT · SOCIETY
                        </div>
                        <div className="title title_0">
                          Optica’s student-led journey through JSCOP
                        </div>
                        <div
                          className="button button_0"
                          onClick={handleButtonClick}
                          data-part-name="aboutus"
                        >
                          Get to Know Us
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="slider_inner__slide">
                      <div className="title" data-index="1">
                        .02
                        <br />
                        Events
                      </div>
                      <div className="image parent_1">
                        <img
                          draggable="false"
                          src="https://mir-s3-cdn-cf.behance.net/project_modules/source/02896e26093165.5634f7cdacf7b.png"
                          alt="Nike Air Max"
                          width={"100%"}
                        />
                        <div className="overlay overlay_1"></div>
                        <div className="cats cats_1">
                          ALL THE ACTION, ALL IN ONE PLACE
                        </div>
                        <div className="title title_1">
                          From Fun Games to Tech & ECE Events
                        </div>
                        <div
                          className="button button_1"
                          onClick={handleButtonClick}
                          data-part-name="events"
                        >
                          See What’s Happening
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="slider_inner__slide">
                      <div className="title" data-index="2">
                        .03
                        <br />
                        Speakers
                      </div>
                      <div className="image parent_2">
                        <img
                          draggable="false"
                          src="https://i.pinimg.com/1200x/99/0d/a2/990da2cf0c344336fb5f1cb3d126cdf8.jpg"
                          alt="Apple Watch"
                          width={"100%"}
                        />
                        <div className="overlay overlay_2"></div>
                        <div className="cats cats_2">OUR ESTEEMED SPEAKERS</div>
                        <div className="title title_2">
                          Get inspired by expert speakers & professionals.
                        </div>
                        <div
                          className="button button_2"
                          onClick={handleButtonClick}
                        >
                          Meet Our Guests
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="slider_inner__slide">
                      <div className="title" data-index="3">
                        .04
                        <br />
                        Timeline
                      </div>
                      <div className="image parent_3">
                        <img
                          draggable="false"
                          src="https://i.pinimg.com/1200x/0b/ad/76/0bad76ab3862413a4ae861b7f55d4313.jpg"
                          alt="Jade Teriyaki"
                          width={"100%"}
                        />
                        <div className="overlay overlay_3"></div>
                        <div className="cats cats_3">
                          MARK THE DATES, DON'T BE LATE
                        </div>
                        <div className="title title_3">
                          Keep up with what's next — stay tuned!
                        </div>
                        <div
                          className="button button_3"
                          onClick={handleButtonClick}
                          data-part-name="timeline"
                        >
                          View Full Timeline
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="slider_inner__slide">
                      <div className="title" data-index="4">
                        .05
                        <br />
                        Our Team
                      </div>
                      <div className="image parent_4">
                        <img
                          draggable="false"
                          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5181c7f5-4300-4d23-a0d1-d0cc2a40214b/de8ruib-78b98309-28f0-4c3f-a560-f58e885d2d27.jpg/v1/fill/w_1192,h_670,q_70,strp/anomaly_by_tobiasroetsch_de8ruib-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzUxODFjN2Y1LTQzMDAtNGQyMy1hMGQxLWQwY2MyYTQwMjE0YlwvZGU4cnVpYi03OGI5ODMwOS0yOGYwLTRjM2YtYTU2MC1mNThlODg1ZDJkMjcuanBnIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.EqxrCHV903nldbc4EMwoSlVlWfP51pWUJUi__43zbw0"
                          alt="Jade Teriyaki"
                          width={"100%"}
                        />
                        <div className="overlay overlay_4"></div>
                        <div className="cats cats_4">
                          TEAM OPTICA: THE MINDS BEHIND JSCOP
                        </div>
                        <div className="title title_4">
                          Meet the crew making JSCOP 7.0 magic
                        </div>
                        <div
                          className="button button_4"
                          onClick={handleButtonClick}
                          data-part-name="team"
                        >
                          Meet the Team
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="slider_inner__slide">
                      <div className="title" data-index="5">
                        .06
                        <br />
                        Gallery
                      </div>
                      <div className="image parent_5">
                        <img
                          draggable="false"
                          src="https://i.pinimg.com/1200x/1f/dc/04/1fdc0438f61ea244d2e48ea3ccefffb6.jpg"
                          alt="Jade Teriyaki"
                          width={"100%"}
                        />
                        <div className="overlay overlay_5"></div>
                        <div className="cats cats_5">
                          RELIVE THE MOMENTS, EXPLORE OUR GALLERY
                        </div>
                        <div className="title title_5">
                          Browse through memories of our events
                        </div>
                        <div
                          className="button button_5"
                          onClick={handleButtonClick}
                          data-part-name="gallery"
                        >
                          View Moments
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="slider_inner__slide">
                      <div className="title" data-index="6">
                        .07
                        <br />
                        Hackathon
                      </div>
                      <div className="image parent_6">
                        <img
                          draggable="false"
                          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9f4085a5-316b-4aa3-9708-18958f71343d/dj6qfii-99ab04c2-8a40-404a-be03-900f6ab30361.jpg/v1/fill/w_1210,h_660,q_70,strp/tidal_gravity_generation_habitat__by_artworksstudio_dj6qfii-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Njk5IiwicGF0aCI6IlwvZlwvOWY0MDg1YTUtMzE2Yi00YWEzLTk3MDgtMTg5NThmNzEzNDNkXC9kajZxZmlpLTk5YWIwNGMyLThhNDAtNDA0YS1iZTAzLTkwMGY2YWIzMDM2MS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.mS4eLyHQInmTOGAb7VFCLlYPvDbVWNF_7JV-TtgNpdY"
                          alt="Jade Teriyaki"
                          width={"100%"}
                        />
                        <div className="overlay overlay_6"></div>
                        <div className="cats cats_6">
                          CODE. CREATE. CONQUER.
                        </div>
                        <div className="title title_6">
                          Collaborate, compete, and create at Hackathon
                        </div>
                        <div
                          className="button button_6"
                          onClick={handleButtonClick}
                          data-part-name="hackathon"
                        >
                          Join the Hack
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="slider_inner__slide">
                      <div className="title" data-index="7">
                        .08
                        <br />
                        Contact Us
                      </div>
                      <div className="image parent_7">
                        <img
                          draggable="false"
                          src="https://i.pinimg.com/1200x/5f/e3/e1/5fe3e182ec10205edfc194c3126eb3aa.jpg"
                          alt="Jade Teriyaki"
                          width={"100%"}
                        />
                        <div className="overlay overlay_7"></div>
                        <div className="cats cats_7">
                          GET IN TOUCH WITH OPTICA
                        </div>
                        <div className="title title_7">
                          Questions, ideas, or feedback? Let’s connect.
                        </div>
                        <div
                          className="button button_7"
                          onClick={handleButtonClick}
                          data-part-name="contact"
                        >
                          Get in Touch
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {/* <h1>
              We are an Independent
              <span> Creative Advertising</span>
              &amp;
              <span>Branding Agency</span>
            </h1> */}
            <h1>
              Welcome to
              <span> JSCOP 7.0 </span>
              <div>
                <p className="mainpage_title">—</p>
                <span> JIIT Student Conference for Optics and Photonics</span>
              </div>
              <div className="mainpage_title">
                The Annual Flagship Event of
                <span> JIIT Optica Student Chapter </span>
              </div>
            </h1>
            {/* <img
              className="trigger"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png"
              alt="Arrow"
              onClick={handleTriggerClick}
            /> */}
            <div className="arrow-icon">
              <ArrowDown
                size={30}
                color="#b9c1ca"
                onClick={handleTriggerClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;