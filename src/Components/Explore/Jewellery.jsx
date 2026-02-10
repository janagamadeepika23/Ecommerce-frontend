import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Components/CartContext";
import "./all.css";
import star_icon from "../../assets/star_icon.png";
// import star_dull_icon from "../../assets/star_dull_icon.png";

const normalize = (str) => str?.replace(/\s+/g, "").toLowerCase();

const Jewellery = () => {
  const { allProduct = [], addToCart, url } = useCart();


  const jewelleryProducts = useMemo(() => {
    return allProduct
      .filter((item) => normalize(item.category) === "jewellery")
      .slice(0, 12);
  }, [allProduct]);

  return (
    <div className="Container">
      {jewelleryProducts.length === 0 && (
        <p className="noProducts">No jewellery products found.</p>
      )}

      <div className="productsGrid">
        {jewelleryProducts.map((item) => (
          <div key={item._id || item.id} className="productCard">
            <Link to={`/jewellery/${item._id || item.id}`}>
              <div className="productImageBox">
                <img
                  loading="lazy"
                  src={
                    item.image
                      ? `${url}/images/${encodeURIComponent(item.image)}`
                      : "/placeholder.png"
                  }
                  alt={item.model || item.product || "Jewellery"}
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

export default Jewellery;
