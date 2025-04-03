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

  // const handleButtonClick = (e) => {
  //   e.target.parentNode.classList.add("clicked");
  //   e.target.parentNode.parentNode.parentNode.classList.add("clicked");
  //   document.querySelector(".portfolio_home__work").classList.add("expand");
  // };

  const handleButtonClick = (e) => {
    const parent = e.target.parentNode;
    const grandParent = parent.parentNode.parentNode;
    const portfolioWork = document.querySelector(".portfolio_home__work");

    parent.classList.toggle("clicked");
    grandParent.classList.toggle("clicked");
    portfolioWork.classList.toggle("expand");
  };

  const handleSliderClick = () => {
    document.querySelectorAll(".slider_inner__slide").forEach((slide) => {
      slide.style.animation = "none";
      slide.style.transform = "rotateY(0deg) scale(1)";
    });
  };

  const handleSliderMouseDown = (e) => {
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
                      <li className="active trigger">Our work</li>
                      <li className="trigger">Our services</li>
                      <li className="trigger">About us</li>
                      <li className="trigger">Contact us</li>
                    </ul>
                  </div>
                  <div className="number black">0161 345 3464</div>
                  <div className="hamburger black trigger">
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
                        <li className="active trigger">Our work</li>
                        <li className="trigger">Our services</li>
                        <li className="trigger">About us</li>
                        <li className="trigger">Contact us</li>
                      </ul>
                    </div>
                    <div className="number white">0161 345 3464</div>
                    <div className="hamburger white trigger">
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
                    <div className="image">
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
                    <div className="image">
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
                    <div className="image">
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
                    <div className="image">
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
                  >
                    <div className="slider_inner__slide">
                      <div className="title">
                        .01
                        <br />
                        My Protein
                      </div>
                      <div className="image">
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
                        <div className="button" onClick={handleButtonClick}>
                          View case study
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="slider_inner__slide">
                      <div className="title">
                        .02
                        <br />
                        Nike Air Max
                      </div>
                      <div className="image">
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
                        <div className="button" onClick={handleButtonClick}>
                          View case study
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="slider_inner__slide">
                      <div className="title">
                        .03
                        <br />
                        Apple Watch
                      </div>
                      <div className="image">
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
                        <div className="button" onClick={handleButtonClick}>
                          View case study
                          <img
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="slider_inner__slide">
                      <div className="title">
                        .04
                        <br />
                        Jade Teriyaki
                      </div>
                      <div className="image">
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
                        <div className="button" onClick={handleButtonClick}>
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
