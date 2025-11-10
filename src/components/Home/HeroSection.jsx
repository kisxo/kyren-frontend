import React, { useEffect, useRef, useState } from "react";
import IMAGES from "../../img/image";
import "./HeroSection.css";
import Slider from "react-slick";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const HeroSection = () => {
  const arrowRef = useRef();

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 3000,
    cssEase: "ease",
    nextArrow: false,
    prevArrow: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="hero-container">
        <Slider ref={arrowRef} {...settings}>
          <div>
            <img src={IMAGES?.banner1} className="d-block w-100" alt="..." />
          </div>
          <div>
            <img src={IMAGES?.banner2} className="d-block w-100" alt="..." />
          </div>
          <div>
            <img src={IMAGES?.banner3} className="d-block w-100" alt="..." />
          </div>
           <div>
            <img src={IMAGES?.banner4} className="d-block w-100" alt="..." />
          </div>
           {/* <div>
            <img src={IMAGES?.banner5} className="d-block w-100" alt="..." />
          </div> */}
        </Slider>
      </div>
    </>
  );
};

export default HeroSection;
