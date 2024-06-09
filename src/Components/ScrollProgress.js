import React, { useEffect, useState } from "react";
import "./styles/scrollProgress.css";

function ScrollProgress({ text, hideWhileDownScroll, barColor, textColor, bgColor }) {
  const [scrollProgress, setScrollProgress] = useState(0); // Normalized variable
  const [userScroll, setUserScroll] = useState(
    Math.ceil(window.scrollY + window.innerHeight)
  );
  const [barFlag, setBarFlag] = useState(false);
  const [defaultFlag, setDefaultFlag] = useState(true);
  useEffect(() => {
    function handleScroll() {
      setUserScroll((prev) => {
        if (userScroll < prev) {
          setBarFlag(false);
        } else if (userScroll > prev) {
          setBarFlag(true);
          setDefaultFlag(true);
        }
        if (window.scrollY === 0) {
          setBarFlag(false);
          setDefaultFlag(false);
          return (prev = 0);
        }
        return (prev = Math.ceil(window.scrollY + window.innerHeight));
      });
      setScrollProgress((prev) => {
        return (prev = Math.ceil(
          (userScroll / document.body.scrollHeight) * 100
        )); // Normalization
      });
    }
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.body.removeEventListener("scroll", handleScroll);
    };
  });
  return hideWhileDownScroll
    ? barFlag && (
        <div className="scroll_indicator animate" style={{backgroundColor: bgColor}}>
          <div className="scroll_indicator__text">
            <p style={{color: textColor}}>{text}</p>
          </div>
          <div
            className="scroll_indicator__bar"
            style={{ width: `${scrollProgress}%`, backgroundColor: barColor }}
          ></div>
        </div>
      )
    : defaultFlag && (
        <div className="scroll_indicator animate">
          <div className="scroll_indicator__text">
            <p>{text}</p>
          </div>
          <div
            className="scroll_indicator__bar"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      );
}

export default ScrollProgress;
