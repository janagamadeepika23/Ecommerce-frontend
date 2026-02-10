import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";
import { useCart } from "../Components/CartContext.jsx";

const Fridgesingle = () => {
  const { id } = useParams();
  const { allProduct, addToCart, url } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState("");

  useEffect(() => {
    if (allProduct.length > 0) {
      const foundBook = allProduct.find((item) => item._id === id);

      setProduct(foundBook);

      setMainImg(
        foundBook?.image
          ? `${url}/images/${encodeURIComponent(foundBook.image)}`
          : "/placeholder.png"
      );

      setLoading(false);
    }
  }, [allProduct, id, url]);

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading fridge...</h2>;
  }

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Product Not Found</h2>;
  }

  const images = product.images?.length
    ? product.images.map((img) => `${url}/images/${encodeURIComponent(img)}`)
    : [mainImg, mainImg, mainImg, mainImg];

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.name}
              className={`thumbnail-img ${mainImg === img ? "active" : ""}`}
              onClick={() => setMainImg(img)}
            />
          ))}
        </div>

        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={mainImg}
            alt={product.name}
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-short-description">
          {product.description}
        </div>
    <div className="productdisplay-right-star">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={i < (product.rating || 4) ? star : star_icon}
              alt="star"
            />
          ))}
          <span>({product.reviews || 122})</span>
        </div>


        <div className="productdisplay-right-price">
          <strong>${product.price}</strong>
        </div>

        <div className="productdisplay-right-model">
          <strong>Model:</strong> {product.model}
        </div>

        <div className="productdisplay-right-brand">
          <strong>Brand:</strong> {product.brand}
        </div>

        <div className="productdisplay-right-description">
          <strong>Description:</strong> {product.description}
        </div>

        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default Fridgesingle;
