import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import "./mobilepage.css";
import tvbanner from "../assets/tvbanner.png";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";

const Tvpage = () => {
  const { allProduct = [], addToCart, url } = useCart();
  const [selectedBrand, setSelectedBrand] = useState([]);

 
  const tvProducts = useMemo(() => {
    return allProduct.filter((item) =>
      item?.category?.toLowerCase().includes("tv")
    );
  }, [allProduct]);


  const brands = useMemo(() => {
    return [...new Set(tvProducts.map((item) => item.brand).filter(Boolean))];
  }, [tvProducts]);

 
  const toggleBrand = (brand) => {
    setSelectedBrand((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

 
  const filteredTVs = useMemo(() => {
    if (selectedBrand.length === 0) return tvProducts;
    return tvProducts.filter((item) =>
      selectedBrand.includes(item.brand)
    );
  }, [selectedBrand, tvProducts]);

  return (
    <>
     
      <img className="bannerimage" src={tvbanner} alt="TV Banner" />

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
            <button
              className="clearBtn"
              onClick={() => setSelectedBrand([])}
            >
              Clear All
            </button>
          )}
        </div>

      
        <div className="pageSection">
          {filteredTVs.length === 0 && <p>No TVs found.</p>}

          {filteredTVs.map((item) => (
            <div key={item._id} className="mobileCard">
              <Link to={`/tv/${item._id}`}>
                <div className="itemImageBox">
                  <img
                    loading="lazy"
                    src={
                      item.image
                        ? `${url}/images/${item.image}`
                        : "/placeholder.png"
                    }
                    alt={item.model || "TV"}
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
                <strong>Price:</strong>{" "}
                ₹
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

export default Tvpage;
