import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import "./mobilepage.css";
import compbanner from "../assets/compbanner.png";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";

const Computerpage = () => {
  const { allProduct = [], addToCart, url } = useCart();
  const [selectedCompany, setSelectedCompany] = useState([]);

  
  const computerProducts = useMemo(() => {
    return allProduct.filter(
      (item) =>
        item?.category &&
        item.category.toLowerCase().includes("computer")
    );
  }, [allProduct]);

  
  const companies = useMemo(() => {
    return [
      ...new Set(
        computerProducts
          .map((item) => item.company)
          .filter(Boolean)
      ),
    ];
  }, [computerProducts]);

  const toggleCompany = (company) => {
    setSelectedCompany((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company]
    );
  };


  const filteredComputers =
    selectedCompany.length === 0
      ? computerProducts
      : computerProducts.filter((item) =>
          selectedCompany.includes(item.company)
        );

  return (
    <>
      <img
        className="bannerimage"
        src={compbanner}
        alt="Computer Banner"
      />

      <div className="mobilepage-container">
       
        <div className="sidebar">
          <h3>Company</h3>

          {companies.length === 0 && <p>No companies found</p>}

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
          {filteredComputers.length === 0 && (
            <p>No computers found.</p>
          )}

          {filteredComputers.map((item) => (
            <div key={item._id} className="mobileCard">
              <Link to={`/computers/${item._id}`}>
                <div className="itemImageBox">
                  <img
                    src={
                      item.image
                        ? `${url}/images/${item.image}`
                        : "/placeholder.png"
                    }
                    alt={item.company}
                  />
                </div>
              </Link>

              <div className="itemCompany">
                <strong>Company:</strong> {item.company}
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
                <strong>Model:</strong> {item.model}
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

export default Computerpage;
