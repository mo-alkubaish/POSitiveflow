/**
 * ContactSection component provides a section for users to get in touch.
 * 
 * Features:
 * - Animated title and description using Framer Motion for smooth entrance effects.
 * - Simple email input field with a "Subscribe" button for users to contact or subscribe.
 * 
 * Layout:
 * - Title and description are centered with a short animation on scroll.
 * - Input field and button are styled for focus and hover effects.
 * 
 * This section serves as the final call-to-action, inviting user engagement.
 */


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ show: false, message: '' });
  const [progress, setProgress] = useState(100);
  const [animate, setAnimate] = useState(''); 

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
      console.log('Email submitted:', email);
      showSnackbar('Email submitted successfully!');
      setEmail('');
    }
  };

  const showSnackbar = (message) => {
    setSnackbar({ show: true, message });
    setProgress(100); 
    setAnimate('animate-fade-in'); 

    setTimeout(() => {
      setAnimate('animate-fade-out');
      setTimeout(() => {
        setSnackbar({ show: false, message: '' });
        setAnimate(''); 
      }, 500);
    }, 3000);
  };

  useEffect(() => {
    if (snackbar.show) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 1, 0)); 
      }, 30); 

      return () => clearInterval(interval);
    }
  }, [snackbar.show]);

  return (
    <section id="contact" className="py-20 bg-base-200">
      <div className="container mx-auto text-center ">
        {/* Title with animation */}
        <motion.h2
          className="text-4xl font-bold text-success"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>

        {/* Description with animation */}
        <motion.p
          className="text-lg text-base-content mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have questions? We’d love to help.
        </motion.p>

        {/* Form with animation */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered mb-2 w-64 md:w-80 lg:w-96 focus:outline-none focus:ring-2 focus:ring-success"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button className="btn btn-success hover:scale-105 transition-transform duration-200" type="submit">Subscribe</button>
          </form>
        </motion.div>

        {/* Snackbar with animation */}
        {snackbar.show && (
          <div
            className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 px-6 py-3 bg-black text-white rounded w-80 ${animate}`}
          >
            {snackbar.message}
            <div
              className="h-1 bg-green-500 mt-2"
              style={{ width: `${progress}%`, transition: "width 0.03s linear" }}
            ></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
