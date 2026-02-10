import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Components/CartContext";
import "./all.css";
import star_icon from "../../assets/star_icon.png";
// import star_dull_icon from "../../assets/star_dull_icon.png";

const normalize = (str) => str?.replace(/\s+/g, "").toLowerCase();

const Kidswear = () => {
  const { allProduct = [], addToCart, url } = useCart();

  // Filter Kidswear products
  const kidswearProducts = useMemo(() => {
    return allProduct
      .filter((item) => normalize(item.category) === "kidswear")
      .slice(0, 12);
  }, [allProduct]);

  return (
    <div className="Container">
      {kidswearProducts.length === 0 && (
        <p className="noProducts">No kidswear products found.</p>
      )}

      <div className="productsGrid">
        {kidswearProducts.map((item) => (
          <div key={item._id || item.id} className="productCard">
            <Link to={`/kidswear/${item._id || item.id}`}>
              <div className="productImageBox">
                <img
                  loading="lazy"
                  src={
                    item.image
                      ? `${url}/images/${encodeURIComponent(item.image)}`
                      : "/placeholder.png"
                  }
                  alt={item.model || item.product || "Kids Wear"}
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
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
                  src={i < (Number(item.rating) || 0) ? star : star_icon}
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
              aria-label={`Add ${item.model || item.product} to cart`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kidswear;
