import React, { useMemo } from "react";
import { useCart } from "../../Components/CartContext";
import star_icon from "../../assets/star_icon.png";
import "./store.css";

const Wallet = () => {
  const { allProduct = [], addToCart, url } = useCart();

  const walletProducts = useMemo(() => {
    return allProduct.filter(
      (item) =>
        item?.category &&
        item.category.replace(/\s+/g, "").toLowerCase() === "wallet"
    );
  }, [allProduct]);

  if (walletProducts.length === 0) {
    return <p className="store-no-products">No wallets found.</p>;
  }

  return (
    <div className="store-container">
      {walletProducts.map((item) => (
        <div key={item._id} className="productCard">

          {/* Image */}
          <div className="productImageBox">
            <img
              src={
                item.image
                  ? `${url}/images/${encodeURIComponent(item.image)}`
                  : "/placeholder.png"
              }
              alt={item.model || "Wallet"}
              onError={(e) => (e.target.src = "/placeholder.png")}
            />
          </div>

          {/* Company */}
          <div className="store-company">
            <strong>Company:</strong> {item.company}
          </div>

          {/* Rating */}
          <div className="store-rating">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={star_icon} alt="star" />
            ))}
          </div>

          {/* Price */}
          <div className="store-price">
            <strong>Price:</strong> ₹{item.price}
          </div>

          {/* Model */}
          <div className="store-model">
            <strong>Model:</strong> {item.model}
          </div>

          {/* Description */}
          <div className="bag-description">
            <strong>Description:</strong> {item.description}
          </div>

          {/* Add to cart */}
          <button
            className="addToCartBtn"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>

        </div>
      ))}
    </div>
  );
};

export default Wallet;
