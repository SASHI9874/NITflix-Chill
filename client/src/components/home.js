import React, { useRef, useEffect } from "react";
// import gsap from "gsap";
import { TweenMax, Power3 } from "gsap";
import "./home.css";
import img1 from "../IMG/ballons.png";

export default function HomePage() {
  let logoItem = useRef(null);
  let title = useRef(null);
  let btn = useRef(null);

  console.log("Home page is render");
  useEffect(() => {
    TweenMax.to(title, 2, {
      opacity: 1,
      delay: 1,
      y: 180,
      ease: Power3.easeInOut,
    });
    TweenMax.to(btn, 1, {
      // position:relative,
      opacity: 1,
      delay: 1,
      y: 200,
      // x:10,
      ease: Power3.easeOut,
    });
    TweenMax.to(logoItem, 2, {
      opacity: 1,
      delay: 1.4,
      y: 250,
      // x:250,
      ease: Power3.easeInOut,
    });
  });
  return (
    <div className="homePAGE">
      <div className="img">
        <img
          ref={(el) => {
            logoItem = el;
          }}
          src={img1}
          alt=""
        />
      </div>
      <div
        ref={(el) => {
          title = el;
        }}
        className="title"
      >
        <p> MATCHMAKER</p>
        <span>NITflix&Chill</span>
      </div>
      <button
        className="btn"
        ref={(el) => {
          btn = el;
        }}
      >
        <a href="/login">Let's begin</a>
      </button>
    </div>
  );
}
