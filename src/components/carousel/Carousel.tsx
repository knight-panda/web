import React, { useEffect, useState } from "react";
import "./Carousel.css";
import banner_mobile_1 from "../../assets/banner.png";

const desktopImages = [
  banner_mobile_1,
]

const mobileImages = [
  banner_mobile_1,
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const currentImages = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentImages.length]);

  return (
    <div className="slider">
      {currentImages.map((img, index) => (
        <img
          key={index}
          src={img}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          alt={`Slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Carousel;