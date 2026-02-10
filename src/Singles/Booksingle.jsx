import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";
import { useCart } from "../Components/CartContext.jsx";

const Booksingle = () => {
  const { id } = useParams();
  const { allProduct, addToCart, url } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState("");

 
  useEffect(() => {
    if (allProduct.length > 0) {
      const foundBook = allProduct.find(
        (item) => item._id === id
      );

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
    return <h2 style={{ padding: "40px" }}>Loading book...</h2>;
  }

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Product Not Found</h2>;
  }

  
  const images = product.images?.length
    ? product.images.map(
        (img) => `${url}/images/${encodeURIComponent(img)}`
      )
    : [mainImg, mainImg, mainImg, mainImg];

  return (
    <div className="productdisplay">
   
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {images.slice(0, 4).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.title}
              className={`thumbnail-img ${
                mainImg === img ? "active" : ""
              }`}
              onClick={() => setMainImg(img)}
            />
          ))}
        </div>

        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={mainImg}
            alt={product.title}
          />
        </div>
      </div>

    
      <div className="productdisplay-right">
      
     <div className="productdisplay-short-description">{product.description}</div>
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
          ₹{product.price}
        </div>

        {/* <div className="productdisplay-right-model">
          <strong>Author:</strong> {product.author}
        </div> */}

        <div className="productdisplay-right-model">
          <strong>title:</strong> {product.title}
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
  );
};

export default Booksingle;
