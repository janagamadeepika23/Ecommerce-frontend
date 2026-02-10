import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import offbanner from "../../assets/offbanner.png";
import offbanner1 from "../../assets/offbanner1.png";
import offbanner2 from "../../assets/offbanner2.png";
import offbanner3 from "../../assets/offbanner3.png";
import offbanner4 from "../../assets/offbanner4.png";
import offbanner5 from "../../assets/offbanner5.png";
import offbanner6 from "../../assets/offbanner6.png";
import offbanner7 from "../../assets/offbanner7.png";
import offbanner8 from "../../assets/offbanner8.png";
const SlickSlider = Slider.default || Slider;

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  };

  return (
    <div className="slider-container">
      <SlickSlider {...settings}>
        <div>
           <img className="banner" src={offbanner1} alt="" /> 
      </div>
      <div>
                <img className="banner" src={offbanner} alt="" /> 
      </div>
      <div>
          <img className="banner" src={offbanner2} alt="" /> 
      </div>
      <div>
       <img className="banner" src={offbanner3} alt="" /> 
      </div>
      <div>
        <img className="banner" src={offbanner4} alt="" /> 
      </div>
      <div>
         <img className="banner" src={offbanner5} alt="" /> 
      </div>
      <div>
         <img className="banner" src={offbanner6} alt="" /> 
      </div>
      <div>
         <img className="banner" src={offbanner7} alt="" /> 
      </div>
       <div>
         <img className="banner" src={offbanner8} alt="" /> 
      </div>
      </SlickSlider>
    </div>
  );
};

export default Carousel;
