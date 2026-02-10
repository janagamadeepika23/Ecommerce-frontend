import React from "react";
import { useCart } from "../Components/CartContext";
import "./Cart.css";

const CartItems = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
  } = useCart();

  if (cartItems.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Your cart is empty 🛒</h2>;
  }

  return (
    <div className="cart-container">
      {cartItems.map((item) => (
        <div className="cart-row" key={item._id}>
          <img src={`${url}/images/${item.image}`} alt={item.product} />

          <p>{item.product}</p>
          <p>₹{item.price}</p>

          <div>
            <button onClick={() => removeFromCart(item._id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => addToCart(item)}>+</button>
          </div>

          <p>₹{item.price * item.quantity}</p>
        </div>
      ))}

      <h3>Total: ₹{getTotalCartAmount()}</h3>
    </div>
  );
};

export default CartItems;
