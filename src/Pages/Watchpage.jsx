import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import "./mobilepage.css";
import watchbanner from "../assets/watchbanner.png";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";

const WatchPage = () => {
  const { allProduct = [], addToCart, url } = useCart();
  const [selectedModel, setSelectedModel] = useState([]);

  const watchData = useMemo(() => {
    return allProduct.filter((item) => {
      const cat = item.category?.toLowerCase().trim() || "";
      return ["watch", "watches"].includes(cat);
    });
  }, [allProduct]);

  const models = useMemo(() => {
    return [...new Set(watchData.map((item) => item.model?.trim()).filter(Boolean))];
  }, [watchData]);

  const toggleModel = (model) => {
    setSelectedModel((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const filteredWatch = useMemo(() => {
    const data =
      selectedModel.length === 0
        ? watchData
        : watchData.filter((item) => selectedModel.includes(item.model));

    return data.slice(0, 14);
  }, [watchData, selectedModel]);

  return (
    <>
      <img className="bannerimage" src={watchbanner} alt="Watch Banner" />

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

          {selectedModel.length > 0 && (
            <button className="clearBtn" onClick={() => setSelectedModel([])}>
              Clear All
            </button>
          )}
        </div>

 
        <div className="pageSection">
          {filteredWatch.length === 0 ? (
            <p>No watch products found</p>
          ) : (
            filteredWatch.map((item) => (
              <div key={item._id} className="mobileCard">
                <Link to={`/watch/${item._id}`}>
                  <div className="itemImageBox">
                    <img
                      src={item.image ? `${url}/images/${item.image}` : "/placeholder.png"}
                      alt={item.model || "Watch"}
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

export default WatchPage;
