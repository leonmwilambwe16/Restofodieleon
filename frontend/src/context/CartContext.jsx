import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

 const url= "https://restofodieleon-backend.onrender.com";
 
  const api = axios.create({
  baseURL: url,
  withCredentials: true, 
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { accessToken } = useAuth();

const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched cart:", response.data);
      setCart(response.data); 
    } catch (error) {
      console.error("Failed to fetch cart:", error.message);
    }
  };

   const addToCart = async (product) => {
    const token = localStorage.getItem("accessToken");
    try {
      console.log("Adding item to cart:", product._id);
      await api.post("/api/cart", { productId: product._id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart(); 
    } catch (error) {
      console.error("Failed to add to cart:", error.message);
    }
  };

  const updateQuantity = async (productId, newQty) => {
    if (!accessToken || newQty < 1) return;
    try {
      await api.post("/api/cart", {
        productId,
        quantity: newQty,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      await fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

  const incrementQty = async (id) => {
    const item = cart.find((i) => i._id === id || i.id === id);
    if (item) {
      await updateQuantity(id, item.quantity + 1);
    }
  };

  const decrementQty = async (id) => {
    const item = cart.find((i) => i._id === id || i.id === id);
    if (item && item.quantity > 1) {
      await updateQuantity(id, item.quantity - 1);
    }
  };
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, incrementQty, decrementQty, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};