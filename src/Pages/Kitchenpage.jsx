import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import "./mobilepage.css";
import kitchenbanner from "../assets/kitchenbanner.png";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";

const Kitchenpage = () => {
  const { allProduct = [], addToCart, url } = useCart();
  const [selectedModel, setSelectedModel] = useState([]);

 
  const kitchenProducts = useMemo(() => {
    return allProduct.filter(
      (item) =>
        item?.category &&
        item.category.toLowerCase() === "kitchen"
    );
  }, [allProduct]);

  const models = useMemo(() => {
    return [
      ...new Set(
        kitchenProducts
          .map((item) => item.model)
          .filter(Boolean)
      ),
    ];
  }, [kitchenProducts]);

  const toggleModel = (model) => {
    setSelectedModel((prev) =>
      prev.includes(model)
        ? prev.filter((m) => m !== model)
        : [...prev, model]
    );
  };

  const filteredKitchen =
    selectedModel.length === 0
      ? kitchenProducts
      : kitchenProducts.filter((item) =>
          selectedModel.includes(item.model)
        );

  return (
    <>
      <img
        className="bannerimage"
        src={kitchenbanner}
        alt="Kitchen Banner"
      />

      <div className="mobilepage-container">
      
        <div className="sidebar">
          <h3>Model</h3>

          {models.length === 0 && <p>No models found</p>}

          {models.map((model) => (
            <label key={model} className="checkboxLabel">
              <input
                type="checkbox"
                checked={selectedModel.includes(model)}
                onChange={() => toggleModel(model)}
              />
              {model}
            </label>
          ))}
        </div>

        <div className="pageSection">
          {filteredKitchen.length === 0 && (
            <p>No kitchen products found.</p>
          )}

          {filteredKitchen.map((item) => (
            <div key={item._id} className="mobileCard">
              <Link to={`/kitchen/${item._id}`}>
                <div className="itemImageBox">
                  <img
                    src={
                      item.image
                        ? `${url}/images/${item.image}`
                        : "/placeholder.png"
                    }
                    alt={item.model}
                  />
                </div>
              </Link>
                 <div className="itemModel">
                <strong>Model:</strong> {item.model}
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

           
              <div className="itembrand">
                <strong>Brand:</strong> {item.brand}
              </div>

              <div className="itemPrice">
                <strong>Price:</strong> ₹{item.price}
              </div>

              <div className="itemDescription">
                <strong>Description:</strong> {item.description}
              </div>

             <button className="addToCartBtn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Kitchenpage;
