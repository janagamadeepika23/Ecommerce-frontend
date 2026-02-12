import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Components/CartContext";
import "./all.css";

import star_icon from "../../assets/star_icon.png";
// import star_dull_icon from "../../assets/star_dull_icon.png";

const Womenwear = () => {
  const { allProduct = [], addToCart, url } = useCart();

 
  const normalizeCategory = (category = "") =>
    category.toLowerCase().replace(/\s+/g, "");

  const womenwearData = useMemo(() => {
    return allProduct
      .filter(
        (item) =>
          normalizeCategory(item.category) === "women" ||
          normalizeCategory(item.category) === "women"
      )
      .slice(0, 12);
  }, [allProduct]);

  if (!allProduct.length) {
    return <p className="loadingText">Loading products...</p>;
  }

  return (
    <div className="Container">
      {womenwearData.length === 0 && (
        <p className="noProducts">No womenwear products found.</p>
      )}

      <div className="productsGrid">
        {womenwearData.map((item) => (
          <div className="productCard" key={item._id || item.id}>
         
            <Link to={`/womenwear}`}>
              <div className="productImageBox">
                <img
                  src={
                    item.image
                      ? `${url}/images/${item.image}`
                      : "/placeholder.png"
                  }
                  alt={item.model || item.product}
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />
              </div>
            </Link>
            <div className="itemModel">
                <strong>Model:</strong> {item.model}
              </div>
           
            <div className="productRating">
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
  );
};

export default Womenwear;
