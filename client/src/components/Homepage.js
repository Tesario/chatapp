import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";

import devices from "../assets/img/devices.png";
import realTimeChatting from "../assets/img/real-time-chatting.png";
import createChatroom from "../assets/img/create-chatroom.png";
import js from "../assets/img/js.png";
import react from "../assets/img/react.png";
import node from "../assets/img/node.png";
import sass from "../assets/img/sass.png";
import "./Homepage.scss";

const Homepage = (props) => {
  const { changeIsHomepage } = props;
  const menuRef = useRef("");
  const darkOverlayRef = useRef("");
  const hamburgerRef = useRef("");

  const sr = ScrollReveal({
    origin: "bottom",
    distance: "15px",
    duration: 1000,
  });

  useEffect(() => {
    changeIsHomepage(true);

    if (window.innerWidth > 992) {
      sr.reveal("#navbar .menu li", {
        origin: "top",
        interval: 75,
        scale: 0.5,
        delay: 200,
      });
    }
    sr.reveal("#hero .main-title", { origin: "left", distance: "5rem" });
    sr.reveal("#hero .green-rect", {
      origin: "right",
      distance: "520px",
    });
    sr.reveal("#hero .content p, #hero .content a", {
      origin: "top",
      interval: 200,
      delay: 200,
      scale: 0.5,
    });
    sr.reveal("#hero .image", {
      origin: "right",
      distance: "500px",
      delay: 500,
      scale: 0.5,
    });
    sr.reveal("#features .subtitle, #features p, #features a", {
      interval: 100,
    });
    sr.reveal("#features .image-group", { scale: 0.5 });
    sr.reveal("#features .second-frame", { delay: 600 });
    sr.reveal("#features .third-frame", { delay: 300 });
    sr.reveal("#features .icon", { scale: 0.5, interval: 200 });
    sr.reveal("#development .item", { interval: 200, delay: 300, scale: 0.2 });
    sr.reveal("#technology .card:first-child", {
      origin: "left",
      delay: 300,
      distance: "100px",
      scale: 0.5,
    });
    sr.reveal("#technology .middle", {
      origin: "bottom",
      delay: 600,
      distance: "50px",
      scale: 0.5,
    });
    sr.reveal("#technology .card:last-child", {
      origin: "right",
      delay: 300,
      distance: "100px",
      scale: 0.2,
    });

    const navbar = document.querySelector("#navbar");
    const counterLines = document.querySelector(".number.lines");
    const counteFiles = document.querySelector(".number.files");
    const counterTime = document.querySelector(".number.time");
    let counterLinesRunning = false;
    let counterFilesRunning = false;
    let counterTimeRunning = false;

    window.addEventListener("scroll", () => {
      let y = document.querySelector("html").scrollTop;

      if (checkViewPositon(counterLines) && !counterLinesRunning) {
        counterLinesRunning = true;
        counter(counterLines.dataset.max, counterLines, 50, 3000, 500);
      }

      if (checkViewPositon(counteFiles) && !counterFilesRunning) {
        counterFilesRunning = true;
        counter(counteFiles.dataset.max, counteFiles, 1, 3000, 800);
      }

      if (checkViewPositon(counterTime) && !counterTimeRunning) {
        counterTimeRunning = true;
        counter(
          counterTime.dataset.max,
          counterTime,
          1,
          4000,
          1100,
          "Too much"
        );
      }

      if (y > 1) {
        navbar.classList.add("scrolling");
      } else {
        navbar.classList.remove("scrolling");
      }
    });
    // eslint-disable-next-line
  }, []);

  const toggleMenu = (e) => {
    e.preventDefault();
    if (window.innerWidth < 992) {
      menuRef.current.classList.toggle("show");
      hamburgerRef.current.classList.toggle("active");
      darkOverlayRef.current.classList.toggle("show");
      document.body.classList.toggle("scroll-lock");
    }
  };

  const scrollToSection = (selector, e) => {
    e.preventDefault();
    const y =
      document.querySelector(selector).getBoundingClientRect().top +
      window.pageYOffset -
      75;

    window.scrollTo(0, y);
  };

  const counter = (
    number,
    counter,
    increase,
    duration = 1000,
    delay = 0,
    finalMessage = null
  ) => {
    const defaulIncrease = increase;

    setTimeout(() => {
      let i = setInterval(() => {
        increase += defaulIncrease;
        counter.innerText = increase;

        if (increase >= number) {
          counter.innerText = number;
          clearInterval(i);

          if (finalMessage) {
            counter.innerText = finalMessage;
          }
        }
      }, duration / (number / increase));
    }, delay);
  };

  const checkViewPositon = (counter) => {
    var rect = counter.getBoundingClientRect();
    return (
      rect.top >= 100 &&
      rect.bottom + 30 <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  return (
    <main id="homepage">
      <nav id="navbar">
        <div className="container">
          <span
            id="dark-overlay"
            ref={darkOverlayRef}
            onClick={(e) => toggleMenu(e)}
          ></span>
          <div className="menu-wrapper" ref={menuRef}>
            <ul className="menu">
              <li>
                <a
                  href="/#"
                  onClick={(e) => {
                    scrollToSection("#hero", e);
                    toggleMenu(e);
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  onClick={(e) => {
                    scrollToSection("#features", e);
                    toggleMenu(e);
                  }}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  onClick={(e) => {
                    scrollToSection("#development", e);
                    toggleMenu(e);
                  }}
                >
                  Development
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  onClick={(e) => {
                    scrollToSection("#technology", e);
                    toggleMenu(e);
                  }}
                >
                  Technology
                </a>
              </li>
              <li className="btn-item">
                <Link className="btn btn-primary" to="/login">
                  Login
                </Link>
              </li>
              <li className="btn-item">
                <Link className="btn btn-primary" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div className="hamburger">
            <svg
              onClick={(e) => {
                toggleMenu(e);
              }}
              ref={hamburgerRef}
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
              viewBox="0 0 200 200"
            >
              <g strokeWidth="6.5" strokeLinecap="round">
                <path
                  d="M72 82.286h28.75"
                  fill="#009100"
                  fillRule="evenodd"
                  stroke="#fff"
                />
                <path
                  d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
                  fill="none"
                  stroke="#fff"
                />
                <path
                  d="M72 125.143h28.75"
                  fill="#009100"
                  fillRule="evenodd"
                  stroke="#fff"
                />
                <path
                  d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
                  fill="none"
                  stroke="#fff"
                />
                <path
                  d="M100.75 82.286h28.75"
                  fill="#009100"
                  fillRule="evenodd"
                  stroke="#fff"
                />
                <path
                  d="M100.75 125.143h28.75"
                  fill="#009100"
                  fillRule="evenodd"
                  stroke="#fff"
                />
              </g>
            </svg>
          </div>
        </div>
      </nav>
      <section id="hero">
        <div className="container">
          <span className="green-rect"></span>
          <div className="flex-group">
            <div className="content">
              <h1 className="main-title">Chat app</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                corporis ea illo nesciunt, accusamus molestiae vel soluta,
                voluptate impedit ad asperiores magnam vero autem, odio atque!
                Ratione nesciunt ullam non. De asperiores magnam vero autem,
                odio atque! Ratione nesciunt ullam non.
              </p>
              <a
                href="/#"
                onClick={(e) => {
                  scrollToSection("#features", e);
                  toggleMenu(e);
                }}
              >
                Read more
              </a>
              <div className="btn-box">
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            </div>
            <div className="image">
              <img src={devices} alt="Devices" />
            </div>
          </div>
        </div>
      </section>
      <section id="features">
        <div className="container">
          <h2 className="title">Features</h2>
          <div className="flex-group">
            <div className="text-group">
              <div className="subtitle">Real time chatting</div>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Quisque porta. Curabitur sagittis hendrerit ante. Nam sed tellus
                id magna elementum tincidunt. Nulla non arcu lacinia neque
                faucibus fringilla. Maecenas fermentum, sem in pharetra
                pellentesque, velit turpis volutpat ante, in pharetra metus odio
                a lectus.
              </p>
              <Link to="/register" className="subtitle link">
                Let’s chat!
              </Link>
            </div>
            <div className="image-group with-frames">
              <div className="frame">
                <img src={realTimeChatting} alt="Real time chatting" />
                <span className="third-frame"></span>
                <span className="second-frame"></span>
              </div>
            </div>
          </div>
          <div className="flex-group">
            <div className="image-group">
              <img src={createChatroom} alt="Real time chatting" />
              <div className="icon chat">
                <i className="fas fa-comments"></i>
              </div>
              <div className="icon user">
                <i className="fas fa-user-plus"></i>
              </div>
              <div className="icon plus">
                <i className="fas fa-plus"></i>
              </div>
              <div className="icon contact">
                <i className="fas fa-id-card"></i>
              </div>
            </div>
            <div className="text-group">
              <div className="subtitle">Chatroom creating</div>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Quisque porta. Curabitur sagittis hendrerit ante. Nam sed tellus
                id magna elementum tincidunt. Nulla non arcu lacinia neque
                faucibus fringilla. Maecenas fermentum, sem in pharetra
                pellentesque, velit turpis volutpat ante, in pharetra metus odio
                a lectus.
              </p>
              <Link to="/register" className="subtitle link">
                Create chatroom!
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="development">
        <div className="container">
          <h2 className="title">Development</h2>
          <div className="grid-items">
            <div className="item">
              <div className="icon">
                <i className="fas fa-code fa-fw"></i>
              </div>
              <div className="text">Lines of code</div>
              <div className="number-wrapper">
                <div className="number lines" data-max="5000">
                  0
                </div>
                <div>+</div>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <i className="fas fa-folder fa-fw"></i>
              </div>
              <div className="text">Files</div>
              <div className="number-wrapper">
                <div className="number files" data-max="55">
                  0
                </div>
                <div>+</div>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <i className="fas fa-laptop-code fa-fw"></i>
              </div>
              <div className="text">Developer</div>
              <div className="number-wrapper">
                <div className="number">1</div>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <i className="far fa-clock fa-fw"></i>
              </div>
              <div className="text">Hours spent</div>
              <div className="number-wrapper">
                <div className="number time" data-max="1000">
                  0
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="technology">
        <div className="container">
          <h2 className="title">Technology</h2>
          <div className="card-group">
            <div className="card">
              <div className="card-title">Backend</div>
              <div className="image">
                <img src={node} alt="Node.js" />
              </div>
              <div className="plus">+</div>
              <div className="technology-group">
                <div className="text">Express</div>
                <div className="image">
                  <img src={js} alt="Express" />
                </div>
              </div>
            </div>
            <div className="middle">
              <div className="arrow">
                <i className="fas fa-long-arrow-alt-left"></i>
              </div>
              <div className="text">Rest API</div>
              <div className="arrow">
                <i className="fas fa-long-arrow-alt-right"></i>
              </div>
            </div>
            <div className="card">
              <div className="card-title">Frontend</div>
              <div className="image">
                <img src={react} alt="Node.js" />
              </div>
              <div className="plus">+</div>
              <div className="image">
                <img src={sass} alt="Express" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer id="footer">
        <div className="text">
          Code & design by{" "}
          <a href="https://tesario.4fan.cz/" target="_blank" rel="noreferrer">
            Vojtěch Tesař
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Homepage;
