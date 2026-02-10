import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import "./mobilepage.css";
import furniturebanner from "../assets/furniturebanner.png";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";

const Furniturepage = () => {
  const { allProduct = [], addToCart, url } = useCart();
  const [selectedModel, setSelectedModel] = useState([]);


  const furnitureProducts = useMemo(() => {
    return allProduct.filter(
      (item) =>
        item?.category &&
        item.category.toLowerCase() === "furniture"
    );
  }, [allProduct]);

  const models = useMemo(() => {
    return [
      ...new Set(
        furnitureProducts.map((item) => item.model).filter(Boolean)
      ),
    ];
  }, [furnitureProducts]);

  const toggleModel = (model) => {
    setSelectedModel((prev) =>
      prev.includes(model)
        ? prev.filter((m) => m !== model)
        : [...prev, model]
    );
  };

 
  const filteredFurniture =
    selectedModel.length === 0
      ? furnitureProducts
      : furnitureProducts.filter((item) =>
          selectedModel.includes(item.model)
        );

  return (
    <>
      <img
        className="bannerimage"
        src={furniturebanner}
        alt="Furniture Banner"
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
          {filteredFurniture.length === 0 && (
            <p>No furniture found.</p>
          )}

          {filteredFurniture.map((item) => (
            <div key={item._id} className="mobileCard">
              <Link to={`/furniture/${item._id}`}>
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

export default Furniturepage;
