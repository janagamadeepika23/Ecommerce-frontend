import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";

import "./mobilepage.css";
import mobliebanner from "../assets/mobliebanner.png";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";

const MobilePage = () => {
  const { allProduct = [], addToCart, url } = useCart();
  const [selectedModel, setSelectedModel] = useState([]);

 
  const mobileData = useMemo(() => {
    return allProduct.filter((item) => {
      const cat = item.category?.toLowerCase().trim() || "";
      return ["mobile", "mobiles", "phone", "phones", "smartphone"].includes(cat);
    });
  }, [allProduct]);

  
  const uniqueModels = useMemo(() => {
    return [...new Set(mobileData.map((item) => item.model?.trim()).filter(Boolean))];
  }, [mobileData]);

  const modelHandler = (model) => {
    setSelectedModel((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  
  const filteredMobiles = useMemo(() => {
    const data =
      selectedModel.length === 0
        ? mobileData
        : mobileData.filter((item) => selectedModel.includes(item.model));

    return data.slice(0, 12);
  }, [mobileData, selectedModel]);

  return (
    <>
      <img className="bannerimage" src={mobliebanner} alt="Mobile Banner" />

      <div className="mobilepage-container">
      
        <div className="sidebar">
          <h3 className="filter-title">Model</h3>
          {uniqueModels.length === 0 ? (
            <p>No models found</p>
          ) : (
            uniqueModels.map((model) => (
              <label key={model} className="filter-item">
                <input
                  type="checkbox"
                  checked={selectedModel.includes(model)}
                  onChange={() => modelHandler(model)}
                />
                {model}
              </label>
            ))
          )}
        </div>

       
        <div className="pageSection">
          {filteredMobiles.length === 0 ? (
            <p className="no-products">No mobiles found</p>
          ) : (
            filteredMobiles.map((item) => (
              <div key={item._id} className="mobileCard">
                <Link to={`/mobiles/${item._id}`}>
                  <div className="itemImageBox">
                    <img
                      src={item.image ? `${url}/images/${item.image}` : "/placeholder.png"}
                      alt={item.model || "Mobile"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.png";
                      }}
                    />
                  </div>
                </Link>
              <div className="itemCompany">
                  <strong>Company:</strong> {item.company || "N/A"}
                </div>
              
                <div className="itemRating">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={i < (item.rating || 0) ? star : star_icon}
                      alt="star"
                    />
                  ))}
                </div>

                

                <div className="itemModel">
                  <strong>Model:</strong> {item.model || "N/A"}
                </div>

                <div className="itemPrice">
                  <strong>Price:</strong> ₹{item.price || "N/A"}
                </div>
 <div className="itemDescription">
                <strong>Description:</strong> {item.description}
              </div>
                <button className="addToCartBtn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MobilePage;
