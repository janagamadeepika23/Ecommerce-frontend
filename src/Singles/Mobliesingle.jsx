import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Components/CartContext";

import star from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";

import "./Mobilesingle.css";

const Mobilesingle = () => {
  const { id } = useParams();
  const { allProduct = [], addToCart, url } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");

  useEffect(() => {
    if (allProduct.length > 0) {
      const found = allProduct.find((item) => item._id === id);
      if (found) {
        setProduct(found);

        // first image default
        if (found.images?.length > 0) {
          setMainImg(`${url}/images/${found.images[0]}`);
        } else {
          setMainImg(`${url}/images/${found.image}`);
        }
      }
    }
  }, [id, allProduct, url]);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product Not Found</h2>;
  }

  const images =
    product.images?.length > 0
      ? product.images.slice(0, 4).map((img) => `${url}/images/${img}`)
      : [
          `${url}/images/${product.image}`,
          `${url}/images/${product.image}?1`,
          `${url}/images/${product.image}?2`,
          `${url}/images/${product.image}?3`,
        ];

  return (
    <div className="mobile-single">
      {/* LEFT SMALL IMAGES */}
      <div className="mobile-thumbs">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className={mainImg === img ? "active" : ""}
            onClick={() => setMainImg(img)}
          />
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="mobile-main-img">
        <img src={mainImg} alt={product.name} />
      </div>

      {/* RIGHT DETAILS */}
      <div className="mobile-details">
        <h1>{product.name}</h1>
<div className="productdisplay-short-description">{product.description}</div>
        <div className="rating">
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star_dull_icon} alt="" />
          <span>({product.reviews || 122})</span>
        </div>

        <h2 className="price">₹{product.price}</h2>

        <p><b>Model:</b> {product.model}</p>
        <p><b>Brand:</b> {product.company}</p>

        {product.description && (
          <div className="productdisplay-right-description">
            <strong>Description:</strong> {product.description}
          </div>
        )}
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default Mobilesingle;
