"use client";
import React, { useEffect, useState } from "react";
import styles from "./Slider.module.css";
import { HomepageDocument } from "../../../../../prismicio-types";

export default function Slider({
  banners,
}: {
  banners: HomepageDocument["data"]["banners"];
}) {
  const imageUrls: string[] = banners
    .map((item) => item.image?.url)
    .filter((url): url is string => Boolean(url));

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (imageUrls.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [imageUrls.length]);

  if (imageUrls.length === 0) return null;

  return (
    <div className={styles.sliderContainer}>
      {imageUrls.map((src, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === currentIndex ? styles.active : ""}`}
          style={{ backgroundImage: `url(${src})` }}
        >
          <div className={styles.overlay}></div>
        </div>
      ))}
    </div>
  );
}
