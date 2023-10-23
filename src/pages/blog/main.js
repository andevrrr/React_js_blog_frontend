import React, { useEffect, useState } from "react";
import "./Main.css";

const images = [
  require("../../images/nails_1.jpeg"),
  require("../../images/nails_2.jpeg"),
];

function Main() {
  const [moveLogo, setMoveLogo] = useState(false);

  // const handleScroll = () => {
  //   if (window.scrollY > 1) {
  //     setMoveLogo(true);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the index to switch to the next image
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds (5000 milliseconds)

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <div className="App">
      <div className="header_body">
        <div className="slideshow-container">
          <div className="slideshow-text">
            <h2>Bonny Studio</h2>
            <p>записаться</p>
          </div>
          <div className="slideshow">
            <img
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
            />
          </div>
        </div>
      </div>

      <div className="picturesSection">

      </div>
    </div>
  );
}

export default Main;
