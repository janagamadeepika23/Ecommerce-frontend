import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import "./mobilepage.css";
import banner1 from "../assets/banner1.jpg";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";

const SpeakerPage = () => {
  const { allProduct = [], addToCart, url } = useCart();
  const [selectedBrand, setSelectedBrand] = useState([]);

  
  const speakerProducts = useMemo(() => {
    return allProduct.filter(
      (item) =>
        item.category?.toLowerCase().trim() === "speaker" ||
        item.category?.toLowerCase().trim() === "speakers"
    );
  }, [allProduct]);

  
  const brands = useMemo(() => {
    return [...new Set(speakerProducts.map((item) => item.brand?.trim()).filter(Boolean))];
  }, [speakerProducts]);

 
  const toggleBrand = (brand) => {
    setSelectedBrand((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

 
  const filteredSpeakers = useMemo(() => {
    const data =
      selectedBrand.length === 0
        ? speakerProducts
        : speakerProducts.filter((item) => selectedBrand.includes(item.brand));

    return data.slice(0, 12);
  }, [selectedBrand, speakerProducts]);

  return (
    <>
   
      <img className="bannerimage" src={banner1} alt="Speaker Banner" />

      <div className="mobilepage-container">
      
        <div className="sidebar">
          <h3>Brand</h3>

          {brands.length === 0 && <p>No brands found</p>}

          {brands.map((brand) => (
            <label key={brand} className="checkboxLabel">
              <input
                type="checkbox"
                checked={selectedBrand.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              {brand}
            </label>
          ))}

          {selectedBrand.length > 0 && (
            <button className="clearBtn" onClick={() => setSelectedBrand([])}>
              Clear All
            </button>
          )}
        </div>

        <div className="pageSection">
          {filteredSpeakers.length === 0 && <p>No speakers found.</p>}

          {filteredSpeakers.map((item) => (
            <div key={item._id} className="mobileCard">
              <Link to={`/speaker/${item._id}`}>
                <div className="itemImageBox">
                  <img
                    loading="lazy"
                    src={item.image ? `${url}/images/${item.image}` : "/placeholder.png"}
                    alt={item.model || "Speaker"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </div>
              </Link>
              
              <div className="itemBrand">
                <strong>Brand:</strong> {item.brand || "N/A"}
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
                <strong>Price:</strong> ₹{item.price !== undefined ? item.price.toLocaleString("en-IN") : "N/A"}
              </div>

              <div className="itemDescription">
                <strong>Description:</strong> {item.description || "No description"}
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

export default SpeakerPage;


