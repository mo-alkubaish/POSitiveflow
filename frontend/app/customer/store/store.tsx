"use client";

import React, { useState, useEffect, useRef } from 'react';
import Tesseract from 'tesseract.js'; // <-- OCR library
import productsData from '../../data/products.json';
import { motion, AnimatePresence } from 'framer-motion';
import './animations.css';
import { useRouter } from 'next/navigation';
import ProductListSkeleton from './ProductListSkeleton';
import CartSkeleton from './CartSkeleton';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Store = ({ selectedDraft }) => {
  const router = useRouter();

  /**************************************
   *        CART & PRODUCT LOGIC
   **************************************/
  const [carts, setCarts] = useState<Record<number, any[]>>(() => ({
    [selectedDraft]: [],
  }));
  const [currentCart, setCurrentCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for the products
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

  const calculateSubtotal = () =>
    currentCart.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTax = (subtotal) => subtotal * 0.1;

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + calculateTax(subtotal);
  };

  const handleCategoryFilter = (category) => setSelectedCategory(category);
  const clearCategoryFilter = () => setSelectedCategory('');
  const handleSearchChange = (event) => setSearchTerm(event.target.value.toLowerCase());

  // Filter products by category & search term
  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      (!searchTerm ||
        product.name.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm))
  );

  // Simple framer-motion variants for cart items
  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  /********************************************
   *   IMAGE UPLOAD & OCR + OpenAI REFINE
   ********************************************/
  const [image, setImage] = useState<string | null>(null);
  const [textFromImage, setTextFromImage] = useState('');
  const [refinedText, setRefinedText] = useState('');
  const [matchedProducts, setMatchedProducts] = useState([]);

  // Ref for the OCR Analysis section to scroll into view
  const ocrAnalysisRef = useRef<HTMLDivElement>(null);

  // Scroll smoothly to the OCR Analysis section
  const scrollToAnalysis = () => {
    if (ocrAnalysisRef.current) {
      ocrAnalysisRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Call your /api/refineText endpoint with raw OCR text to get refined text
  const refineText = async (rawText: string): Promise<string> => {
    try {
      const response = await fetch('/api/refineText', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ocrText: rawText }),
      });
      const data = await response.json();
      if (data.refinedText) {
        return data.refinedText;
      }
      return rawText;
    } catch (err) {
      console.error('Refine text error:', err);
      return rawText;
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    // Scroll immediately when "Upload Image" is clicked
    scrollToAnalysis();

    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result as string;
      setImage(dataURL);
      recognizeText(dataURL);
    };
    reader.readAsDataURL(file);
  };

  // Perform OCR using Tesseract.js, then refine the text with OpenAI
// Example modification in recognizeText to handle segmentation
const recognizeText = async (img: string) => {
    try {
        const result = await Tesseract.recognize(img, 'eng', {
            logger: m => console.log('Tesseract log:', m)
        });
        const ocrText = result.data.text.trim();
        setTextFromImage(ocrText);

        // Refine OCR text with OpenAI (or fallback)
        const refined = await refineText(ocrText);
        setRefinedText(refined);

        // Assume segmentation by commas for demonstration
        const segments = refined.split(',').map(s => s.trim()).filter(s => s.length);
        
        // Use the segmented texts for searching products
        searchProducts(segments);
    } catch (err) {
        console.error("OCR error:", err);
    }
};

// Adjusted searchProducts to handle an array of segments
const searchProducts = (segments) => {
    const matched = segments.flatMap(segment => {
        return products.filter((product) =>
            product.name.toLowerCase().includes(segment.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(segment.toLowerCase()))
        );
    });
    setMatchedProducts(matched);
};

  return (
    <div className="p-4 md:p-8 flex flex-col md:flex-row gap-4 bg-gray-100 min-h-screen">
      {/* -------------------------------------
                  CART SECTION
      -------------------------------------- */}
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
                  className="flex flex-col sm:flex-row justify-between items-center p-2 shadow-md rounded mb-2"
                >
                  <div className="w-full sm:w-auto font-medium">{item.name}</div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="px-2 border border-gray-300 rounded-l"
                    >
                      -
                    </button>
                    <span className="px-2 border-t border-b border-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 border border-gray-300 rounded-r"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 underline ml-2"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="mt-4 bg-gray-50 p-4 rounded">
              <div className="mb-1">Subtotal: ${calculateSubtotal().toFixed(2)}</div>
              <div className="mb-1">Tax: ${calculateTax(calculateSubtotal()).toFixed(2)}</div>
              <div className="font-bold">
                Total: ${calculateTotal().toFixed(2)}
              </div>
              <Link
                href={{
                  pathname: '/customer/store/pay',
                  query: { total: calculateTotal().toFixed(2) },
                }}
                passHref
              >
                <button className="mt-4 w-full btn bg-black text-white">
                  Pay
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* -------------------------------------
                MAIN CONTENT (Products + OCR)
      -------------------------------------- */}
      <div className="w-full md:w-3/4 flex flex-col gap-4">
        {/* -------- Products Section -------- */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          {isLoading ? (
            <ProductListSkeleton />
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Available Items</h2>
              <div className="mb-4 flex flex-wrap">
                <button
                  onClick={clearCategoryFilter}
                  className={`m-1 btn ${!selectedCategory ? 'btn-active' : 'btn-outline'}`}
                >
                  All Items
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`m-1 btn ${category === selectedCategory ? 'btn-active' : 'btn-outline'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <input
                  type="search"
                  placeholder="Search for items..."
                  className="input input-bordered w-full"
                  onChange={handleSearchChange}
                />

                {/* "Upload Image" button - scrolls to OCR Analysis immediately */}
                <label
                  className="btn bg-gray-800 text-white cursor-pointer"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.05 * product.id } }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-32 w-full object-cover rounded"
                    />
                    <div className="mt-2">
                      <div className="font-bold">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.category}</div>
                      <div className="text-lg font-semibold">${product.price}</div>
                      <div className="text-sm mb-2">Stock: {product.stock}</div>
                      <button
                        onClick={() => addToCart(product)}
                        className="btn bg-black text-white w-full"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* -------- OCR Analysis Section (always rendered) -------- */}
        <div
          ref={ocrAnalysisRef}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold mb-2">OCR Analysis</h2>
          <p className="text-sm text-gray-500 mb-4">
            Below is your uploaded image and the extracted text. The AI-refined text
            helps match with our product catalog more accurately.
          </p>

          {/* If nothing is uploaded, show a placeholder */}
          {!image && !textFromImage && !refinedText && (
            <p className="text-gray-400 italic">
              No image uploaded yet. Click "Upload Image" above to get started.
            </p>
          )}

          {(image || textFromImage || refinedText) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Uploaded Image */}
              {image && (
                <div>
                  <h3 className="font-semibold mb-2">Uploaded Image</h3>
                  <img
                    src={image}
                    alt="Uploaded"
                    className="border max-w-full rounded"
                  />
                </div>
              )}

              {/* Raw OCR Text */}
              {textFromImage && (
                <div className="md:col-span-1">
                  <h3 className="font-semibold mb-2">Raw OCR Text</h3>
                  <p className="p-2 bg-gray-50 border rounded">
                    {textFromImage}
                  </p>
                </div>
              )}

              {/* Refined Text */}
              {refinedText && (
                <div className="md:col-span-1">
                  <h3 className="font-semibold mb-2">Refined Text</h3>
                  <p className="p-2 bg-gray-50 border rounded">
                    {refinedText}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Matched Products */}
          {matchedProducts.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Matched Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {matchedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-32 w-full object-cover rounded"
                    />
                    <div className="mt-2">
                      <div className="font-bold">{product.name}</div>
                      <div className="text-sm text-gray-600">
                        {product.category}
                      </div>
                      <div className="text-lg font-semibold">
                        ${product.price}
                      </div>
                      <div className="text-sm mb-2">Stock: {product.stock}</div>
                      <button
                        onClick={() => addToCart(product)}
                        className="btn bg-black text-white w-full"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
