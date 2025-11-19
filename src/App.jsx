import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthChange } from './firebase';

import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import CategoryPage from './components/CategoryPage.jsx';
import ProductPage from './components/ProductPage.jsx';
import CartPage from './components/CartPage.jsx';
import Checkout from './components/Checkout.jsx';
import SellerDashboard from './components/SellerDashboard.jsx';
import Footer from './components/Footer.jsx';

export const CartContext = createContext();

export default function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const unsub = onAuthChange(u => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem('famfresh_cart');
    if (raw) setCart(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem('famfresh_cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product, qty) {
    setCart(prev => {
      const found = prev.find(p => p.product.id === product.id);
      if (found) {
        return prev.map(p =>
          p.product.id === product.id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { product, qty }];
    });
  }

  function updateQty(id, qty) {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev =>
      prev.map(p => (p.product.id === id ? { ...p, qty } : p))
    );
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(p => p.product.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, clearCart }}
    >
      <Router>
        <Header
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          user={user}
        />
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </CartContext.Provider>
  );
}
