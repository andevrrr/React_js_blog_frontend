import React, { useEffect, useState, useRef, useContext } from "react";
import bonnyVideo from "../../images/bonny_video.mp4";
import "./Main.css";
import { MenuContext } from './MenuContext';

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
  const [currentImageSetIndex, setCurrentImageSetIndex] = useState(0);
  const { menuClicked } = useContext(MenuContext);
  // Track the scroll position
  const [scrollY, setScrollY] = useState(0);

  const picturesSectionTextRef = useRef(null);

  useEffect(() => {
    const imageSetInterval = setInterval(() => {
      setCurrentImageSetIndex((prevIndex) =>
        prevIndex === imageSets.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000); // Change image set every 5 seconds

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the 'appear' class to the text when it's in the viewport
            picturesSectionTextRef.current.classList.add("appear");
          } else {
            // Remove the 'appear' class when it's out of the viewport
            picturesSectionTextRef.current.classList.remove("appear");
          }
        });
      },
      { threshold: 0.5 } // You can adjust the threshold as needed
    );

    observer.observe(picturesSectionTextRef.current);

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      clearInterval(imageSetInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <div className="header_body">
        <video autoPlay loop muted playsInline>
          <source src={bonnyVideo} type="video/mp4" />
        </video>
        <div className={`centered-text ${menuClicked ? 'special-styling' : ''}`}>
          <p>Bonny Studio</p>
          <p>Твоя зона комфорта</p>
        </div>
      </div>

      <div className="picturesSection">
        <div className="picturesSectionContent">
          <div ref={picturesSectionTextRef} className="picturesSectionText">
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
