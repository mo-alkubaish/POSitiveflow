/**
 * Store Component
 * 
 * This component represents the store page where users can browse products, filter them by category,
 * search for specific items, and add them to their shopping cart.
 * 
 * Functionalities:
 * 1. **Product Filtering**: 
 *    - Users can filter products based on categories (e.g., electronics, clothing).
 *    - A search bar is available to filter products by name.
 * 
 * 2. **Cart Management**: 
 *    - Users can add products to the cart.
 *    - Items in the cart can be updated in quantity or removed.
 *    - The cart shows the subtotal, tax (calculated at 10%), and the total amount.
 * 
 * 3. **Animations**: 
 *    - Animated transitions are used when products are added/removed from the cart or when products appear in the store section.
 *    - Framer Motion is utilized for smooth animations on product entries and cart updates.
 * 
 * Key Features:
 * - **Search Functionality**: Users can type in the search bar to search for specific products by name.
 * - **Category Filters**: The store displays available categories for users to filter products by category.
 * - **Add/Remove Cart Items**: Users can add products to the cart and modify their quantities, with a clear option to remove them.
 * - **Cart Summary**: The cart dynamically updates to show the subtotal, tax, and total, with an option to proceed to checkout.
 * 
 * The Store component leverages the `useState` and `useEffect` hooks to manage the state for the products, cart, categories, and search term.
 * 
 * Usage:
 * - This component can be used as part of an e-commerce site where users can interact with the product listings and manage a shopping cart.
 * 
 * Dependencies:
 * - **framer-motion**: For handling smooth animations when products are added or removed from the cart and when they appear in the grid.
 * - **products.json**: A local JSON file that contains product data (such as name, price, category, stock, etc.).
 */


"use client";

import React, { useState, useEffect } from 'react';
import productsData from '../../data/products.json';
import { motion, AnimatePresence } from 'framer-motion';
import './animations.css'; 
import { useRouter } from 'next/navigation';


const Store = ({selectedDraft}) => {
    const router = useRouter();

    const [carts, setCarts] = useState<Record<number, any[]>>(() => ({
        [selectedDraft]: []
      }));
    const [currentCart, setCurrentCart] = useState([]);

    
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Effect for products initialization
    useEffect(() => {
        setProducts(productsData);
    }, [productsData]);

    // Effect for categories calculation
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
    }
    , [selectedDraft]);

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
        setCarts(currentCart.filter(item => item.id !== productId));
    };
    const handleCheckout = () => {
        if (currentCart.length === 0) {
            // Optional: Show error/warning if cart is empty
            return;
        }
    
        // Option 1: Using URL params or search params
        const cartData = encodeURIComponent(JSON.stringify(currentCart));
        router.push(`/cashier/checkout?cart=${cartData}`);

    };
    

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
        (!searchTerm || product.name.toLowerCase().includes(searchTerm))
    ));

    const itemVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="p-8 flex justify-between space-x-4 bg-gray-100 min-h-screen">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Selected Items</h2>
                <AnimatePresence>
                    {currentCart.map((item) => (
                        <motion.div
                            key={item.id}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={itemVariants}
                            className="flex justify-between items-center p-2 shadow-md rounded"
                        >
                            <div>{item.name}</div>
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
                    <button onClick={handleCheckout} className="mt-4 px-6 py-2 bg-black text-white rounded-full btn">Checkout</button>
                </div>
            </div>
            <div className="w-3/4 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Available Items</h2>
                <input type="search" placeholder="Search for items..." className="input input-bordered w-full mb-4" onChange={handleSearchChange} />
                <div className="mb-4">
                    <button onClick={clearCategoryFilter} className={`m-1 btn ${!selectedCategory ? 'btn-active' : 'btn-outline'}`}>All Items</button>
                    {categories.map(category => (
                        <button key={category} onClick={() => handleCategoryFilter(category)}
                                className={`m-1 btn ${category === selectedCategory ? 'btn-active' : 'btn-outline'}`}>
                            {category}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {filteredProducts.map(product => (
                        <motion.div
                            key={product.id}
                            className="p-4 border rounded shadow-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.1 * product.id } }}
                        >
                            <img src={product.image} alt={product.name} className="h-32 w-full object-cover" />
                            <div className="mt-2">
                                <div>{product.name}</div>
                                <div>{product.category}</div>
                                <div>${product.price}</div>
                                <div>Stock: {product.stock}</div>
                                <button onClick={() => addToCart(product)} className="mt-2 btn bg-black text-white">Add to Cart</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Store;
