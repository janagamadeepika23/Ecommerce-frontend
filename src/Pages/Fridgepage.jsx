import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import "./mobilepage.css";
import fridgebanner from "../assets/fridgebanner.png";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";

const Fridgepage = () => {
  const { allProduct = [], addToCart, url } = useCart();
  const [selectedBrand, setSelectedBrand] = useState([]);

  const fridgeProducts = useMemo(() => {
    return allProduct.filter(
      (item) =>
        item?.category &&
        item.category.toLowerCase().includes("fridge")
    );
  }, [allProduct]);

 
  const brands = useMemo(() => {
    return [
      ...new Set(
        fridgeProducts
          .map((item) => item.brand)
          .filter(Boolean)
      ),
    ];
  }, [fridgeProducts]);

  const toggleBrand = (brand) => {
    setSelectedBrand((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const filteredFridges =
    selectedBrand.length === 0
      ? fridgeProducts
      : fridgeProducts.filter((item) =>
          selectedBrand.includes(item.brand)
        );

  return (
    <>
      <img
        className="bannerimage"
        src={fridgebanner}
        alt="Fridge Banner"
      />

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
        </div>

      
        <div className="pageSection">
          {filteredFridges.length === 0 && (
            <p>No fridge products found.</p>
          )}

          {filteredFridges.map((item) => (
            <div key={item._id} className="mobileCard">
              <Link to={`/fridge/${item._id}`}>
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

              <div className="itemCompany">
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

              <div className="itembrand">
                <strong>Brand:</strong> {item.brand}
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

export default Fridgepage;
