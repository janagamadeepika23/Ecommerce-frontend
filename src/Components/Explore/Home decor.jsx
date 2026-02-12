import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Components/CartContext";
import "./all.css";
import star_icon from "../../assets/star_icon.png";
// import star_dull_icon from "../../assets/star_dull_icon.png";

const HomeDecor = () => {
  const { allProduct = [], addToCart, url } = useCart();

  const homeDecorProducts = useMemo(() => {
    return allProduct.filter(
      (item) =>
        item?.category &&
        item.category
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes("homedecor")
    );
  }, [allProduct]);

  return (
    <div className="Container">

      {homeDecorProducts.length === 0 && (
        <p className="noProducts">No products found.</p>
      )}

      <div className="productsGrid">
        {homeDecorProducts.map((item) => (
          <div className="productCard" key={item._id}>

            <Link to={`/homedecor`}>
              <div className="productImageBox">
                <img
                  src={
                    item.image
                      ? item.image.startsWith("http")
                        ? item.image
                        : `${url}/images/${item.image}`
                      : "/placeholder.png"
                  }
                  alt={item.model || "Home Decor"}
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
                  src={i < (item.rating || 0) ? star :star_icon}
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

export default HomeDecor;
