import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import "./mobilepage.css";
import bookbanner from "../assets/bookbanner.png";
import star_icon from "../assets/star_icon.png";
// import star_dull_icon from "../assets/star_dull_icon.png";

const Bookpage = () => {
  const { allProduct = [], addToCart, url } = useCart();
  const [selectedTitle, setSelectedTitle] = useState([]);


  const bookProducts = useMemo(() => {
    return allProduct.filter(
      (item) =>
        item?.category &&
        item.category.toLowerCase().includes("book")
    );
  }, [allProduct]);

 
  const titles = useMemo(() => {
    return [
      ...new Set(
        bookProducts
          .map((item) => item.title)
          .filter(Boolean)
      ),
    ];
  }, [bookProducts]);

  const toggleTitle = (title) => {
    setSelectedTitle((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

 
  const filteredBooks =
    selectedTitle.length === 0
      ? bookProducts
      : bookProducts.filter((item) =>
          selectedTitle.includes(item.title)
        );

  return (
    <>
     
      <img
        className="bannerimage"
        src={bookbanner}
        alt="Books Banner"
      />

      <div className="mobilepage-container">
     
        <div className="sidebar">
          <h3>Title</h3>

          {titles.length === 0 && <p>No titles found</p>}

          {titles.map((title) => (
            <label key={title} className="checkboxLabel">
              <input
                type="checkbox"
                checked={selectedTitle.includes(title)}
                onChange={() => toggleTitle(title)}
              />
              {title}
            </label>
          ))}
        </div>

        <div className="pageSection">
          {filteredBooks.length === 0 && (
            <p>No books found.</p>
          )}

          {filteredBooks.map((item) => (
            <div key={item._id} className="mobileCard">
              <Link to={`/books/${item._id}`}>
                <div className="itemImageBox">
                  <img
                    src={
                      item.image
                        ? `${url}/images/${encodeURIComponent(
                            item.image
                          )}`
                        : "/placeholder.png"
                    }
                    alt={item.title || "Book"}
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </div>
              </Link>

              <div className="itemCompany">
                <strong>Title:</strong>{" "}
                {item.title || "Unknown Book"}
              </div>

              <div className="itemRating">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < (item.rating || 0)
                        ? star
                        : star_icon
                    }
                    alt="star"
                  />
                ))}
              </div>

              <div className="itemPrice">
                <strong>Price:</strong> ₹{item.price}
              </div>

              <div className="itemModel">
                <strong>Author:</strong>{" "}
                {item.author || "Unknown"}
              </div>

              <div className="itemDescription">
                <strong>Description:</strong>{" "}
                {item.description ||
                  "No description available"}
              </div>

              <button className="addToCartBtn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bookpage;

     