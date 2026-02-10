import React, { useState } from "react";
import { useCart } from "../CartContext";
import axios from "axios";
import "./Order.css";

const Orders = () => {
  const { getTotalCartAmount } = useCart();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const PaymentFunction = async (e) => {
    e.preventDefault();
    console.log("payment function called!");

   
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/orders/place",
        { address: data }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={PaymentFunction} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input name="firstName" placeholder="First Name" onChange={onChangeHandler} />
          <input name="lastName" placeholder="Last Name" onChange={onChangeHandler} />
        </div>

        <input name="email" placeholder="Email address" onChange={onChangeHandler} />
        <input name="street" placeholder="Street" onChange={onChangeHandler} />

        <div className="multi-fields">
          <input name="city" placeholder="City" onChange={onChangeHandler} />
          <input name="state" placeholder="State" onChange={onChangeHandler} />
        </div>

        <div className="multi-fields">
          <input name="zipcode" placeholder="Zip Code" onChange={onChangeHandler} />
          <input name="country" placeholder="Country" onChange={onChangeHandler} />
        </div>

        <input name="phone" placeholder="Phone" onChange={onChangeHandler} />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Sub total</p>
            <p>{getTotalCartAmount()}</p>
          </div>

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>2</p>
          </div>

          <div className="cart-total-details">
            <p><b>Total</b></p>
            <b>{getTotalCartAmount() + 2}</b>
          </div>

          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default Orders;
