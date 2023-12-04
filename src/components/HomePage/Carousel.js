import React, { useEffect, useState } from "react";
import './Carousel.scss';
import img1 from '../../assets/image/img1.png';
import img2 from '../../assets/image/img2.png';
import img3 from '../../assets/image/img3.png';
import img4 from '../../assets/image/img4.png';

const Carousel = () => {
  const images = [img1, img2, img3, img4];
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeImage = () => {
    const carousel = document.querySelector(".carousel");
    carousel.style.backgroundImage = `url(${images[currentIndex]})`;
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(changeImage, 2500);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div className="carousel"></div>
  );
};

export default Carousel;
