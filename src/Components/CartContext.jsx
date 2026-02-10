import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const url = "http://localhost:4000";

  const [allProduct, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

 
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${url}/api/product/list`);
        if (res.data.success) {
          setAllProduct(res.data.data);
        }
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };

    fetchProducts();
  }, []);

 
  useEffect(() => {
    if (!token || allProduct.length === 0) return;

    const loadCart = async () => {
      try {
        const res = await axios.get(`${url}/api/cart/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success && res.data.cartData) {
          const backendCart = res.data.cartData; 

          const formattedCart = Object.keys(backendCart)
            .map((id) => {
              const product = allProduct.find((p) => p._id === id);
              return product
                ? { ...product, quantity: backendCart[id] }
                : null;
            })
            .filter(Boolean);

          setCartItems(formattedCart);
        }
      } catch (err) {
        console.error("Cart load error:", err);
      }
    };

    loadCart();
  }, [token, allProduct]);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  
  const addToCart = async (product) => {
    if (!product || !product._id) return;

    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId: product._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Add to cart error:", err);
      }
    }
  };

 
  const removeFromCart = async (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Remove cart error:", err);
      }
    }
  };

 
  const getTotalCartAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        url,
        allProduct,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
