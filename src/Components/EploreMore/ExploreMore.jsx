import React from "react";
import { Link } from "react-router-dom";
import proData from "../../assets/data/proData";
import "./ExploreMore.css";

const ExploreMore = () => {
  const categoryRoutes = {
    "Body Lotion": "/bodylotion",
    "Woman Wear": "/womenwear", 
    "Home decor": "/homedecor",
    "MenWear": "/menswear",
     "Study Table": "/studytable",
    "Jewellery": "/jewellery",
      "footwear": "/footwear",
      "makeup": "/makeup",
      "Kids Wear":"/kidswear",
  };

  return (
    <div className="explore-more">
      <h1>Explore More</h1>
      <p className="paraExplore-more">
        Explore our product categories and choose what suits you best.
      </p>

      <div className="explore-more-list">
        {proData.map((item, index) => (
          <Link
            key={item._id || index}
            to={categoryRoutes[item.product] || "/"}
            className="explore-more-list-item"
          >
            <img src={item.image} alt={item.product} />
            <p>{item.product}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;