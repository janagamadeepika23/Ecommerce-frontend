import React, { useState } from "react";
import "./Login.css";
import cross_icon from "../../assets/cross_icon.png";
import { useCart } from "../CartContext.jsx";
import axios from "axios";

const SigninPopup = ({ setShowlogin }) => {
  const { url, setToken } = useCart();

  const [currState, setCurrstate] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };


  const onLogin = async (e) => {
    e.preventDefault();

    const apiUrl =
      currState === "Login"
        ? `${url}/api/user/login`
        : `${url}/api/user/register`;

    try {
      const res = await axios.post(apiUrl, data);

      

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token); 

        alert(res.data.message);
        setShowlogin(false);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="loginpopup">
    
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            className="crossicon"
            src={cross_icon}
            alt="close"
            onClick={() => setShowlogin(false)}
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />

          <button type="submit">
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>

          {currState === "Login" ? (
            <p>
              Create a new account?
              <span onClick={() => setCurrstate("Sign Up")}> Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setCurrstate("Login")}> Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SigninPopup;
