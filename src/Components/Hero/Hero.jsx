import React, { useState } from "react";
// import offbanner1 from "../../assets/offbanner1.png";
import bag_banner from "../../assets/bag_banner.png";
import toys_banner from "../../assets/toys_banner.png";
import saree_banner from "../../assets/saree_banner.png";
import wallet_banner from "../../assets/wallet_banner.png";
import ExploreMore from "../ExploreMore/ExploreMore";
import "./Hero.css";
import AppDownload from "../AppDownload/AppDownload";
import Bag from "../Store/bag";
import Saree from "../Store/Sarees";
import Toys from "../Store/toy";
import Wallet from "../Store/Wallet";
import Carousel from "../Carousel/Carousel";
// import Carousel from "../Carousel/Carousel";



const Hero = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="hero-container">
      
      {/* <img className="banner" src={offbanner1} alt="" /> */}
<Carousel/>
     
      <ExploreMore category={category} setCategory={setCategory} />

   <img className="banner" src={bag_banner} alt="" />
    <Bag/>
  <img className="banner" src={saree_banner} alt="" />
   <Saree/>
     <img className="banner" src={toys_banner} alt="" />
      <Toys/>
        <img className="banner" src={wallet_banner} alt="" />
      <Wallet/>
      <AppDownload/>
    </div>
  );
};

export default Hero;
