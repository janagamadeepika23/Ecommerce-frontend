import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Components/CartContext";
import "./all.css";
 import star_icon from "../../assets/star_icon.png";
// import star_dull_icon from "../../assets/star_dull_icon.png";

const BodyLotion = () => {
  const { allProduct = [], addToCart, url } = useCart();

 
  const bodyLotionProducts = useMemo(() => {
    return allProduct.filter(
      (item) =>
        item?.category &&
        item.category.replace(/\s+/g, "").toLowerCase() === "bodylotion"
    );
  }, [allProduct]);

  return (
    <div className="Container">

     
      {bodyLotionProducts.length === 0 && (
        <p className="noProducts">No body lotions found.</p>
      )}

      <div className="productsGrid">
        {bodyLotionProducts.map((item) => (
          <div key={item._id} className="productCard">

            <Link to={`/bodylotion`}>
              <div className="productImageBox">
                <img
                  src={
                    item.image
                      ? `${url}/images/${encodeURIComponent(item.image)}`
                      : "/placeholder.png"
                  }
                  alt={item.model || "Body Lotion"}
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
            >
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyLotion;
