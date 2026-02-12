import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Components/CartContext";
import "./all.css";
import star_icon from "../../assets/star_icon.png";
// import star_dull_icon from "../../assets/star_dull_icon.png";

const StudyTable = () => {
  const { allProduct = [], addToCart, url } = useCart();

  
  const studyTableProducts = useMemo(() => {
    return allProduct
      .filter(
        (item) =>
          item?.category &&
          item.category.replace(/\s+/g, "").toLowerCase() === "studytable"
      )
      .slice(0, 12); 
  }, [allProduct]);

  return (
    <div className="Container">

      
      {studyTableProducts.length === 0 && (
        <p className="noProducts">No study table products found.</p>
      )}

    
      <div className="productsGrid">
        {studyTableProducts.map((item) => (
          <div key={item._id || item.id} className="productCard">

            <Link to={`/studytable`}>
              <div className="productImageBox">
                <img
                  src={
                    item.image
                      ? `${url}/images/${encodeURIComponent(item.image)}`
                      : "/placeholder.png"
                  }
                  alt={item.model || item.product || "Study Table"}
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

export default StudyTable;
