import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import acbanner from "../assets/acbanner.png";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";
import { useCart } from "../Components/CartContext";
import "./mobilepage.css";
const AcPage = () => {
  const { allProduct = [], addToCart, url } = useCart();
  const [selectedCompany, setSelectedCompany] = useState([]);

  const acProducts = useMemo(() => {
    return allProduct.filter((item) => item.category === "AC");
  }, [allProduct]);

  const companies = useMemo(() => {
    return [
      ...new Set(acProducts.map((item) => item.company || "Unknown")),
    ];
  }, [acProducts]);

  const toggleCompany = (company) => {
    setSelectedCompany((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company]
    );
  };

  const filteredProducts =
    selectedCompany.length === 0
      ? acProducts
      : acProducts.filter((item) =>
          selectedCompany.includes(item.company)
        );

  return (
    <div>
      <img src={acbanner} alt="AC Banner" className="bannerimage" />

      <div className="mobilepage-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Company</h3>
          {companies.map((company) => (
            <label key={company} className="checkboxLabel">
              <input
                type="checkbox"
                checked={selectedCompany.includes(company)}
                onChange={() => toggleCompany(company)}
              />
              {company}
            </label>
          ))}
        </div>

       
        <div className="pageSection">
          {filteredProducts.length === 0 && <p>No products found.</p>}

          {filteredProducts.map((item) => (
            <div className="mobileCard" key={item._id}>
              <Link to={`/ac/${item._id}`}>
                <div className="itemImageBox">
                  <img
                    src={
                      item.image
                        ? `${url}/images/${item.image}`
                        : "/placeholder.png"
                    }
                    alt={item.product}
                  />
                </div>
              </Link>

              <div className="itemCompany">
                <strong>Company:</strong> {item.company || "Unknown"}
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

              
              <div className="itemModel">
                <strong>Model:</strong> {item.model || item.product}
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
    </div>
  );
};

export default AcPage;
