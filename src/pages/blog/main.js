import React, { useEffect, useState } from "react";
import "./Main.css";

const images = [
  require("../../images/nails_1.jpeg"),
  require("../../images/nails_2.jpeg"),
];

const imageSets = [
  [
    require("../../images/brows.jpg"),
    require("../../images/logoWall.jpg"),
    require("../../images/lamp.jpg"),
  ],
  [
    require("../../images/cactus.jpg"),
    require("../../images/outside.jpg"),
    require("../../images/table.jpg"),
  ],
  [
    require("../../images/logoBar.jpg"),
    require("../../images/browsTable.jpg"),
    require("../../images/outside.jpg"),
  ],
];

function Main() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageSetIndex, setCurrentImageSetIndex] = useState(0);

  // Track the scroll position
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const headerInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    const imageSetInterval = setInterval(() => {
      setCurrentImageSetIndex((prevIndex) =>
        prevIndex === imageSets.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000); // Change image set every 5 seconds

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(headerInterval);
      clearInterval(imageSetInterval);
      window.removeEventListener("scroll", handleScroll);
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
        <div className="picturesSectionContent">
          <div className="picturesSectionText">
            <p className="textBig">Комфорт. качество. сервис.</p>
            <p className="textSmall">такого город еще не видел</p>
          </div>
        </div>
        <div className="picturesSectionImagies">
          {imageSets[currentImageSetIndex].map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Image ${index + 1}`}
              style={{
                transform: `translateY(${
                  index === 1 ? scrollY * 0.3 : -scrollY * 0.3
                }px)`, // Adjust the factor for the desired effect
              }}
            />
          ))}
        </div>
      </div>

      <div className="another">{/* Content below the pictures section */}</div>
    </div>
  );
}

export default Main;
