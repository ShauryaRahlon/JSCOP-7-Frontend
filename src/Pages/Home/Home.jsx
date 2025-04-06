import React, { useState, useEffect, useRef } from "react";
import "./NewLandingPage.css";
const Portfolio = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [endPosition, setEndPosition] = useState(0);
  const [initX, setInitX] = useState(0);
  const [difference, setDifference] = useState(0);
  const [index, setIndex] = useState(1);

  const contentRef = useRef(null);
  const sliderInnerRef = useRef(null);
  const cursorRef = useRef(null);
  const scrollRef = useRef(null);

  const offset = 760;
  const margin = 0;
  const threshold = 100;

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

  const handleButtonClick = (e) => {
    const parent = e.target.parentNode;
    prev_parent = parent;
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
    if (prev_parent) {
      console.log("prev : ", prev_parent);

      // Remove classes from previous elements
      prev_parent.parentNode.parentNode.classList.remove("clicked");
      prev_parent.parentNode.classList.remove("clicked");
      document
        .querySelector(".portfolio_home__work")
        .classList.remove("expand");
      prev_parent.parentNode.classList.remove("expand");

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
        sliderInnerRef.current.style.transform = `translateX(${
          newDifference + endPosition
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
      if (newIndex < 3) {
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
  };

  const handleBackClick = (e) => {
    console.log("click");
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
            slide.style.transform = `rotateY(${direction}${
              pps / 110
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
          <div
            style={{
              position: "fixed",
              zIndex: -99,
              width: "2320px",
              height: "180%",
              left: 0,
              top: "-38%",
            }}
          >
            <iframe
              frameBorder="0"
              height="100%"
              width="100%"
              src="https://youtube.com/embed/tz8Puc4W5BM?autoplay=1&controls=0&showinfo=0&autohide=1&mute=1"
            ></iframe>
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
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/clogotemp.png"
                alt="Logo"
              />
              <img
                className="second"
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/clogotemp2.png"
                alt="Logo"
              />
              <div className="page_portfolio">
                <div className="portfolio_home__header">
                  <div className="logoMain">
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/cagencylogo.png"
                      alt="Agency Logo"
                    />
                  </div>
                  <div className="nav">
                    <ul>
                      <li
                        className="trigger"
                        onClick={() => moveBetweenPages(0)}
                      >
                        Our work
                      </li>
                      <li
                        className="active trigger"
                        onClick={() => moveBetweenPages(1)}
                      >
                        Our services
                      </li>
                      <li
                        className="trigger"
                        onClick={() => moveBetweenPages(2)}
                      >
                        About us
                      </li>
                      <li
                        className="trigger"
                        onClick={() => moveBetweenPages(3)}
                      >
                        Contact us
                      </li>
                    </ul>
                  </div>
                  <div className="number black">0161 345 3464</div>
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
                    <div className="back" onClick={handleBackClick}>
                      <img
                        className="trigger"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png"
                        alt="Arrow"
                        // onClick={handleButtonClick}
                      />
                    </div>
                    <div className="logoMain">
                      <img
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/slogowhite.png"
                        alt="Logo White"
                      />
                    </div>
                    <div className="nav">
                      <ul>
                        <li
                          className="active trigger"
                          onClick={() => moveBetweenPages(0)}
                        >
                          Our work
                        </li>
                        <li
                          className="trigger"
                          onClick={() => moveBetweenPages(1)}
                        >
                          Our services
                        </li>
                        <li
                          className="trigger"
                          onClick={() => moveBetweenPages(2)}
                        >
                          About us
                        </li>
                        <li
                          className="trigger"
                          onClick={() => moveBetweenPages(3)}
                        >
                          Contact us
                        </li>
                      </ul>
                    </div>
                    <div className="number white">0161 345 3464</div>
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
                      My Protein
                    </div>
                    <div className="image parent_0">
                      <img
                        draggable="false"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/fud.png"
                        alt="My Protein"
                      />
                      <div className="overlay"></div>
                      <div className="cats">ADVERTISING DESIGN DIGITAL</div>
                      <div className="title">
                        My protein rebrand and digital campaign
                      </div>
                    </div>
                  </div>
                  <div className="slideClone">
                    <div className="title f">
                      .02
                      <br />
                      Nike Air Max
                    </div>
                    <div className="image parent_1">
                      <img
                        draggable="false"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/nike.png"
                        alt="Nike Air Max"
                      />
                      <div className="overlay"></div>
                      <div className="cats">
                        ADVERTISING DESIGN DIGITAL STRATEGY
                      </div>
                      <div className="title">
                        Nike Air max video campaign 2017
                      </div>
                    </div>
                  </div>
                  <div className="slideClone">
                    <div className="title f">
                      .03
                      <br />
                      Apple Watch
                    </div>
                    <div className="image parent_2">
                      <img
                        draggable="false"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/rpo.jpg"
                        alt="Apple Watch"
                      />
                      <div className="overlay"></div>
                      <div className="cats">ADVERTISING DIGITAL STRATEGY</div>
                      <div className="title">
                        The new Apple Watch digital campaign 2019
                      </div>
                    </div>
                  </div>
                  <div className="slideClone">
                    <div className="title f">
                      .04
                      <br />
                      Jade Teriyaki
                    </div>
                    <div className="image parent_3">
                      <img
                        draggable="false"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/orangetyhing.png"
                        alt="Jade Teriyaki"
                      />
                      <div className="overlay"></div>
                      <div className="cats">
                        ADVERTISING DESIGN DIGITAL STRATEGY
                      </div>
                      <div className="title">
                        Another agency did this campaign, not us
                      </div>
                    </div>
                  </div>
                  <img
                    className="scroll"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png"
                    alt="Scroll"
                  />
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
                        My Protein
                      </div>
                      <div className="image parent_0">
                        <img
                          draggable="false"
                          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/fud.png"
                          alt="My Protein"
                        />
                        <div className="overlay overlay_0"></div>
                        <div className="cats cats_0">
                          ADVERTISING DESIGN DIGITAL
                        </div>
                        <div className="title title_0">
                          My protein rebrand and digital campaign
                        </div>
                        <div
                          className="button button_0"
                          onClick={handleButtonClick}
                        >
                          View case study
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
                        Nike Air Max
                      </div>
                      <div className="image parent_1">
                        <img
                          draggable="false"
                          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/nike.png"
                          alt="Nike Air Max"
                        />
                        <div className="overlay overlay_1"></div>
                        <div className="cats cats_1">
                          ADVERTISING DESIGN DIGITAL STRATEGY
                        </div>
                        <div className="title title_1">
                          Nike Air max video campaign 2017
                        </div>
                        <div
                          className="button button_1"
                          onClick={handleButtonClick}
                        >
                          View case study
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
                        Apple Watch
                      </div>
                      <div className="image parent_2">
                        <img
                          draggable="false"
                          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/rpo.jpg"
                          alt="Apple Watch"
                        />
                        <div className="overlay overlay_2"></div>
                        <div className="cats cats_2">
                          ADVERTISING DIGITAL STRATEGY
                        </div>
                        <div className="title title_2">
                          The new Apple Watch digital campaign 2019
                        </div>
                        <div
                          className="button button_2"
                          onClick={handleButtonClick}
                        >
                          View case study
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
                        Jade Teriyaki
                      </div>
                      <div className="image parent_3">
                        <img
                          draggable="false"
                          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/orangetyhing.png"
                          alt="Jade Teriyaki"
                        />
                        <div className="overlay overlay_3"></div>
                        <div className="cats cats_3">
                          ADVERTISING DESIGN DIGITAL STRATEGY
                        </div>
                        <div className="title title_3">
                          Another agency did this campaign, not us
                        </div>
                        <div
                          className="button button_3"
                          onClick={handleButtonClick}
                        >
                          View case study
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
            <h1>
              We are an Independent
              <span>Creative Advertising</span>
              &amp;
              <span>Branding Agency</span>
            </h1>
            <img
              className="trigger"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png"
              alt="Arrow"
              onClick={handleTriggerClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
