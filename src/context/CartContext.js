import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch cart items from the JSON server
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cart');
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, []);

  // Add or update quantity of product in the cart
  const addToCart = async (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // Update quantity if the item already exists in the cart
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCart(updatedCart);

      // Update the cart on the JSON server
      await axios.put(`http://localhost:3000/cart/${product.id}`, {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      });
    } else {
      // Add new item with quantity 1
      const newItem = { ...product, quantity: 1 };
      setCart([...cart, newItem]);

      // Add the new item to the JSON server
      await axios.post('http://localhost:3000/cart', newItem);
    }
  };

  // Remove item from cart
  const removeFromCart = async (index) => {
    const itemToRemove = cart[index];
    try {
      await axios.delete(`http://localhost:3000/cart/${itemToRemove.id}`);
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Increment quantity
  const incrementQuantity = async (index) => {
    const item = cart[index];
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);

    await axios.put(`http://localhost:3000/cart/${item.id}`, {
      ...item,
      quantity: item.quantity + 1,
    });
  };

  // Decrement quantity
  const decrementQuantity = async (index) => {
    const item = cart[index];

    if (item.quantity > 1) {
      const updatedCart = cart.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);

      await axios.put(`http://localhost:3000/cart/${item.id}`, {
        ...item,
        quantity: item.quantity - 1,
      });
    } else {
      // Remove item if quantity becomes 0
      removeFromCart(index);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
