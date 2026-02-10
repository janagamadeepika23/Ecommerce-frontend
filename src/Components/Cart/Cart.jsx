import React from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, getTotalCartAmount, url } = useCart();

  const shippingFee = 0;
  const discountPercent = 30;

  const subtotal = getTotalCartAmount();
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount + shippingFee;

  return (
    <div className="cartitems">
     
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />

    
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty 🛒</p>
      ) : (
        cartItems.map((item) => (
          <div className="cartitems-format" key={item._id}>
            <img
              src={`${url}/images/${item.image}`}
              alt={item.product}
              className="carticon-product-icon"
            />

            <p>{item.product}</p>
            <p>₹{item.price}</p>
            <p className="cartitems-quantity">{item.quantity}</p>
            <p>₹{item.price * item.quantity}</p>
            <p className="cross" onClick={() => removeFromCart(item._id)}>
              ×
            </p>
          </div>
        ))
      )}

    
      {cartItems.length > 0 && (
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>

            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>

            <hr />

            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</p>
            </div>

            <hr />

            <div className="cartitems-total-item">
              <p>Discount ({discountPercent}%)</p>
              <p>-₹{discountAmount}</p>
            </div>

            <hr />

            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{total}</h3>
            </div>

            <hr />

            <div className="item">
              <p>All issues easy returns</p>
            </div>

            <div className="discount-banner">
              <span className="icon">💸</span>
              <span>Yay! You saved ₹{discountAmount}</span>
            </div>

            <Link to="/orders">
              <button className="checkout-button">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
