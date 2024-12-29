"use client";

import React, { useState, useEffect, useRef } from 'react';
import Tesseract from 'tesseract.js';           // <-- OCR library
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

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  /********************************************
   *    CAMERA & OCR (Tesseract.js) LOGIC
   ********************************************/
  // State and Refs for camera and OCR
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [textFromImage, setTextFromImage] = useState('');
  const [matchedProducts, setMatchedProducts] = useState([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Open the camera modal
  const openCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Close the camera and stop any streams
  const closeCamera = () => {
    setShowCamera(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  // Capture a photo and run OCR
  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const width = 640;
    const height = 480;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw the current video frame onto the canvas
    ctx.drawImage(video, 0, 0, width, height);

    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL('image/png');
    setImage(dataURL);

    // Close the camera stream after capture
    closeCamera();

    // Run OCR on the captured image
    recognizeText(dataURL);
  };

  // Perform OCR using Tesseract.js
  const recognizeText = async (img) => {
    try {
      const result = await Tesseract.recognize(img, 'eng', {
        logger: m => console.log('Tesseract log:', m)
      });
      const recognizedText = result.data.text;
      setTextFromImage(recognizedText);
      searchProducts(recognizedText);
    } catch (err) {
      console.error("OCR error:", err);
    }
  };

  // Attempt to find matching products based on recognized text
  const searchProducts = (recognizedText) => {
    const query = recognizedText.toLowerCase();
    const matched = products.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
    setMatchedProducts(matched);
  };

  return (
    <div className="p-4 md:p-8 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 bg-gray-100 min-h-screen">
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
                  className="flex flex-col sm:flex-row justify-between items-center p-2 shadow-md rounded space-y-2 sm:space-y-0"
                >
                  <div className="w-full sm:w-auto">{item.name}</div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="px-2"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2">
                      +
                    </button>
                  </div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="mt-4 shadow-md p-4 rounded">
              <div>Subtotal: ${calculateSubtotal().toFixed(2)}</div>
              <div>Tax: ${calculateTax(calculateSubtotal()).toFixed(2)}</div>
              <div>Total: ${calculateTotal().toFixed(2)}</div>

              <Link
                href={{
                  pathname: '/customer/store/pay',
                  query: { total: calculateTotal().toFixed(2) },
                }}
                passHref
              >
                <button className="mt-4 px-6 py-2 bg-black text-white rounded-full btn w-full">
                  Pay
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* -------------------------------------
                PRODUCTS SECTION
      -------------------------------------- */}
      <div className="w-full md:w-3/4 bg-white p-4 rounded-lg shadow-md">
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

            <div className="flex justify-between items-center mb-4">
              <input
                type="search"
                placeholder="Search for items..."
                className="input input-bordered w-full mr-4"
                onChange={handleSearchChange}
              />
              {/* "Scan to Cart" button that opens camera */}
              <button className="btn bg-gray-800 text-white" onClick={openCamera}>
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Scan to Cart
              </button>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="p-4 border rounded shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 * product.id } }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 w-full object-cover"
                  />
                  <div className="mt-2">
                    <div className="font-bold">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.category}</div>
                    <div className="text-lg font-semibold">${product.price}</div>
                    <div className="text-sm">Stock: {product.stock}</div>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-2 btn bg-black text-white w-full"
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

      {/* ------------------------------------
              CAMERA MODAL OVERLAY
      ------------------------------------- */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md">
            {/* Video Preview */}
            <video ref={videoRef} width="640" height="480" className="mb-4" />
            <div className="flex justify-between">
              <button className="btn btn-error" onClick={closeCamera}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={takePhoto}>
                Take Photo
              </button>
            </div>
            {/* Canvas for capturing the frame (hidden by default) */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}

      {/* --------------------------------
          DISPLAY CAPTURED IMAGE & OCR TEXT
      --------------------------------- */}
      {image && (
        <div className="mt-4 w-full">
          <h2 className="text-xl font-bold mb-2">Captured Image</h2>
          <img src={image} alt="Captured" className="border max-w-sm" />
        </div>
      )}

      {textFromImage && (
        <div className="mt-4 w-full">
          <h2 className="text-xl font-bold mb-2">Recognized Text</h2>
          <p className="p-2 bg-gray-100 border">{textFromImage}</p>
        </div>
      )}

      {/* --------------------------------
          DISPLAY MATCHED PRODUCTS (Optional)
      --------------------------------- */}
      {matchedProducts.length > 0 && (
        <div className="mt-4 w-full">
          <h2 className="text-xl font-bold mb-2">Matched Products from OCR</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {matchedProducts.map((product) => (
              <div key={product.id} className="p-4 border rounded shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 w-full object-cover"
                />
                <div className="mt-2">
                  <div className="font-bold">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.category}</div>
                  <div className="text-lg font-semibold">${product.price}</div>
                  <div className="text-sm">Stock: {product.stock}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 btn bg-black text-white w-full"
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
  );
};

export default Store;
