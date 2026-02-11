import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Components/CartContext.jsx";

import star_icon from "../assets/star_icon.png";
 import star_dull_icon from "../assets/star_dull_icon.png";

const ACsingle = () => {
  const { id } = useParams();
  const { allProduct, addToCart, url } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allProduct.length > 0) {
      const found = allProduct.find(
        (item) => item._id === id && item.category?.toLowerCase().includes("ac")
      );

      if (found) {
        setProduct(found);
        setMainImg(found.images?.[0] || `${url}/images/${found.image}`);
      }
      setLoading(false);
    }
  }, [id, allProduct, url]);

  if (loading) return <h2 style={{ padding: "40px" }}>Loading AC...</h2>;
  if (!product) return <h2 style={{ padding: "40px" }}>Product Not Found</h2>;

  const images =
    product.images?.length > 0
      ? product.images.map((img) => `${url}/images/${img}`)
      : [mainImg, mainImg, mainImg, mainImg];

  return (
    <>
     
      <div className="productdisplay">
       
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            {images.slice(0, 4).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={product.model}
                className={`thumbnail-img ${mainImg === img ? "active" : ""}`}
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>

          <div className="productdisplay-img">
            <img
              className="productdisplay-main-img"
              src={mainImg}
              alt={product.model}
            />
          </div>
        </div>

     
        <div className="productdisplay-right">
        
<div className="productdisplay-short-description">{product.description}</div>
         <div className="productdisplay-right-star">
  {[...Array(5)].map((_, i) => (
    <img
      key={i}
      src={i < (product.rating || 4) ? star_icon : star_dull_icon}
      alt="star"
    />
  ))}
  <span>({product.reviews || 120})</span>
</div>

          <div className="productdisplay-right-price">
            <strong>₹{product.price}</strong>
          </div>

          <div className="productdisplay-right-model">
            <strong>Company:</strong> {product.company}
          </div>

          <div className="productdisplay-right-model">
            <strong>Model:</strong> {product.model}
          </div>

          <div className="productdisplay-right-description">
            <strong>Description:</strong> {product.description}
          </div>

          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </>
  );
};

export default ACsingle;
