import React, { useMemo } from "react";
import { useCart } from "../../Components/CartContext";
import star_icon from "../../assets/star_icon.png";
// import star_dull_icon from "../../assets/star_dull_icon.png";
import "./store.css";

const Saree = () => {
  const { allProduct = [], addToCart, url } = useCart();

  const sareeProducts = useMemo(() => {
    return allProduct.filter(
      (item) =>
        item?.category &&
        item.category.replace(/\s+/g, "").toLowerCase() === "sarees"
    );
  }, [allProduct]);

  if (sareeProducts.length === 0) {
    return <p className="store-no-products">No sarees found.</p>;
  }

  return (
    <div className="store-container">
      {sareeProducts.map((item) => (
        <div key={item._id || item.id} className="productCard">
        
          <div className="productImageBox">
            <img
              src={item.image ? `${url}/images/${encodeURIComponent(item.image)}` : "/placeholder.png"}
              alt={item.model || "Saree"}
              onError={(e) => (e.target.src = "/placeholder.png")}
            />
          </div>

         
          <div className="store-company">
            <strong>Company:</strong> {item.company}
          </div>

       
          <div className="store-rating">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < (item.rating || 0) ? star : star_icon}
                alt="star"
              />
            ))}
          </div>

    
          <div className="store-price">
            <strong>Price:</strong> ₹{item.price}
          </div>

          <div className="store-model">
            <strong>Type:</strong> {item.type}
          </div>


          <div className="store-description">
            <strong>Description:</strong> {item.description}
          </div>

          <button className="addToCartBtn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
        </div>
      ))}
    </div>
  );
};

export default Saree;
