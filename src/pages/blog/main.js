import React, { useEffect, useState } from "react";
import "./Main.css";

function Main() {
  const [moveLogo, setMoveLogo] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setMoveLogo(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <div className={moveLogo ? "welcome-text visible" : "welcome-text"}>
            Welcome to
          </div>
      <div  className={moveLogo ? "move animation" : "animation"}>
        <div className={moveLogo ? "move word left" : "word left"}>Bon</div>
        <div className={moveLogo ? "move word right" : "word right"}>ny</div>
      </div>
    </div>
  );
}

export default Main;
