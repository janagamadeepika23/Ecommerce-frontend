import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import "./mobilepage.css";
import mensbanner from "../assets/mensbanner.png";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";

const Menpage = () => {
  const { allProduct = [], addToCart, url } = useCart();
  const [selectedModel, setSelectedModel] = useState([]);

  const menProducts = useMemo(() => {
    return allProduct.filter((item) => {
      const cat = (item?.category || "").toLowerCase();
      return cat.includes("men");
    });
  }, [allProduct]);

  
  const filteredMen = useMemo(() => {
    const data =
      selectedModel.length === 0
        ? menProducts
        : menProducts.filter((item) =>
            selectedModel.includes(item.model)
          );

    return data.slice(0, 12); 
  }, [selectedModel, menProducts]);

  
  const models = useMemo(() => {
    return [
      ...new Set(
        filteredMen
          .map((item) => item.model)
          .filter(Boolean)
      ),
    ];
  }, [filteredMen]);

  // Toggle model filter
  const toggleModel = (model) => {
    setSelectedModel((prev) =>
      prev.includes(model)
        ? prev.filter((m) => m !== model)
        : [...prev, model]
    );
  };

  return (
    <>
      {/* Banner */}
      <img className="bannerimage" src={mensbanner} alt="Men Banner" />

      <div className="mobilepage-container">
        {/* Sidebar */}
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
            <button
              className="clearBtn"
              onClick={() => setSelectedModel([])}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Products */}
        <div className="pageSection">
          {filteredMen.length === 0 && <p>No men products found.</p>}

          {filteredMen.map((item) => (
            <div key={item._id} className="mobileCard">
              <Link to={`/men/${item._id}`}>
                <div className="itemImageBox">
                  <img
                    loading="lazy"
                    src={
                      item.image
                        ? `${url}/images/${item.image}`
                        : "/placeholder.png"
                    }
                    alt={item.model || "Men Product"}
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </div>
              </Link>
               <div className="itemModel">
                <strong>Model:</strong> {item.model || "Filler"}
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
                <strong>Price:</strong> ₹
                {item.price !== undefined
                  ? item.price.toLocaleString("en-IN")
                  : "N/A"}
              </div>

              <div className="itemDescription">
                <strong>Description:</strong>{" "}
                {item.description || "No description"}
              </div>

              <button
                className="addToCartBtn"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menpage;
