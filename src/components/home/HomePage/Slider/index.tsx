"use client";
import React, { useEffect, useState } from "react";
import styles from "./Slider.module.css";

const images = [
  "/images/backgroundImage1.jpg",
  "/images/backgroundImage2.jpg",
  "/images/backgroundImage3.jpg",
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      {images.map((src, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === currentIndex ? styles.active : ""
          }`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  );
}
