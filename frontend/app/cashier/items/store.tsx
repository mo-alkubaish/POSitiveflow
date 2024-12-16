"use client";

import React, { useState, useEffect } from 'react';
import productsData from '../../data/products.json';
import { motion, AnimatePresence } from 'framer-motion';
import './animations.css'; 
import { useRouter } from 'next/navigation';
import ProductListSkeleton from './ProductListSkeleton';
import CartSkeleton from './CartSkeleton';

const Store = ({ selectedDraft }) => {
  const router = useRouter();

  const [carts, setCarts] = useState<Record<number, any[]>>(() => ({
    [selectedDraft]: []
  }));
  const [currentCart, setCurrentCart] = useState([]);

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productsData);
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const uniqueCategories = new Set(products.map(product => product.category));
    setCategories([...uniqueCategories]);
  }, [products]);

  useEffect(() => {
    setCurrentCart(carts[selectedDraft] ?? []);
  }, [selectedDraft, carts]);

  useEffect(() => {
    setCarts(prevCarts => ({
      ...prevCarts,
      [selectedDraft]: prevCarts[selectedDraft] || []
    }));
  }, [selectedDraft]);

  const addToCart = (product) => {
    const existingProduct = currentCart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      setCarts(prevCarts => ({
        ...prevCarts,
        [selectedDraft]: [...(prevCarts[selectedDraft] || [])]
      }));
    } else {
      setCarts(prevCarts => ({
        ...prevCarts,
        [selectedDraft]: [...(prevCarts[selectedDraft] || []), { ...product, quantity: 1 }]
      }));
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = currentCart.filter(item => item.id !== productId);
    setCarts(prevCarts => ({
      ...prevCarts,
      [selectedDraft]: [...updatedCart]
    }));
  };

  const handleCheckout = () => {
    if (currentCart.length === 0) {
      return;
    }

    const cartData = encodeURIComponent(JSON.stringify(currentCart));
    router.push(`/cashier/checkout?cart=${cartData}`); 
  };
// we make it’s data into a URL-encoded string so  we pass it  as a query parameter.
  const updateQuantity = (productId, increment) => {
    const productIndex = currentCart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
      const newQuantity = currentCart[productIndex].quantity + increment;
      if (newQuantity > 0) {
        currentCart[productIndex].quantity = newQuantity;
        setCarts(prevCarts => ({
          ...prevCarts,
          [selectedDraft]: [...(prevCarts[selectedDraft] || [])]
        }));
      } else if (newQuantity === 0) {
        removeFromCart(productId);
      }
    }
  };

  const calculateSubtotal = () => currentCart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const calculateTax = (subtotal) => subtotal * 0.1;

  const handleCategoryFilter = (category) => setSelectedCategory(category);
  const clearCategoryFilter = () => setSelectedCategory('');
  const handleSearchChange = (event) => setSearchTerm(event.target.value.toLowerCase());

  const filteredProducts = products.filter(product => (
    (!selectedCategory || product.category === selectedCategory) &&
    (!searchTerm || product.name.toLowerCase().includes(searchTerm) || !searchTerm || product.sku.toLowerCase().includes(searchTerm))
  ));

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="p-4 md:p-8 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 bg-gray-100 min-h-screen">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Cart Section */}
      <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
        {isLoading ? (
          <CartSkeleton />
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Selected Items</h2>
            <AnimatePresence>
              {currentCart.map((item) => (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row justify-between items-center p-2 shadow-md rounded space-y-2 sm:space-y-0"
                >
                  <div className="w-full sm:w-auto">{item.name}</div>
                  <div className="flex items-center">
                    <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1} className="px-2">-</button>
                    <span className="px-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2">+</button>
                  </div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="mt-4 shadow-md p-4 rounded">
              <div>Subtotal: ${calculateSubtotal().toFixed(2)}</div>
              <div>Tax: ${calculateTax(calculateSubtotal()).toFixed(2)}</div>
              <div>Total: ${(calculateSubtotal() + calculateTax(calculateSubtotal())).toFixed(2)}</div>
              <button onClick={handleCheckout} className="mt-4 px-6 py-2 bg-black text-white rounded-full btn w-full">Checkout</button>
            </div>
          </>
        )}
      </div>

      {/* Products Section */}
      <div className="w-full md:w-3/4 bg-white p-4 rounded-lg shadow-md">
        {isLoading ? (
          <ProductListSkeleton />
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Available Items</h2>
            <input
              type="search"
              placeholder="Search for items..."
              className="input input-bordered w-full mb-4"
              onChange={handleSearchChange}
            />
            <div className="mb-4 flex flex-wrap">
              <button onClick={clearCategoryFilter}
               className={`m-1 btn ${!selectedCategory ? 'btn-active' : 'btn-outline'}`}>All Items</button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`m-1 btn ${category === selectedCategory ? 'btn-active' : 'btn-outline'}`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  className="p-4 border rounded shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 * product.id } }}
                >
                  <img src={product.image} alt={product.name} className="h-32 w-full object-cover" />
                  <div className="mt-2">
                    <div className="font-bold">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.category}</div>
                    <div className="text-lg font-semibold">${product.price}</div>
                    <div className="text-sm">Stock: {product.stock}</div>
                    <button onClick={() => addToCart(product)} className="mt-2 btn bg-black text-white w-full">Add to Cart</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Store;
