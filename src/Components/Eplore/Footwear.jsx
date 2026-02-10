// Footwear.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Components/CartContext";
import "./all.css";
import star_icon from "../../assets/star_icon.png";
// import star_dull_icon from "../../assets/star_dull_icon.png";

const normalize = (str) => str?.replace(/\s+/g, "").toLowerCase();

const Footwear = () => {
  const { allProduct = [], addToCart, url } = useCart();

  const footwearProducts = useMemo(() => {
    return allProduct
      .filter((item) => normalize(item.category) === "footwear") 
      .slice(0, 12);
  }, [allProduct]);

  return (
    <div className="Container">
      {footwearProducts.length === 0 && (
        <p className="noProducts">No footwear products found.</p>
      )}

      <div className="productsGrid">
        {footwearProducts.map((item) => {
          const productId = item._id || item.id;
          const rating = Number(item.rating) || 0;

          return (
            <div key={productId} className="productCard">
              <Link to={`/${productId}`}>
                <div className="productImageBox">
                  <img
                    loading="lazy"
                    src={
                      item.image
                        ? `${url}/images/${encodeURIComponent(item.image)}`
                        : "/placeholder.png"
                    }
                    alt={item.type || "Footwear"}
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </div>
              </Link>

            
              <div className="producttype">
               
                <strong>type:</strong> {item.type}
              </div>

              <div className="productRating">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < rating ? star : star_icon}
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

              <button
                className="addToCartBtn"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footwear;
