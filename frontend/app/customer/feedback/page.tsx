/**
 * Feedback Component
 * 
 * This component provides a feedback form where users can rate their experience with a service.
 * It includes:
 * - Overall satisfaction rating with star-based inputs.
 * - Cashier satisfaction rating with a similar star-based input.
 * - An optional textarea for additional comments.
 * 
 * The component features smooth animations for the rating inputs, dynamic dropdown menu for user settings (like "Sign Out"), and a submit button.
 * 
 * Functionalities:
 * - Rating inputs with hover effects.
 * - A textarea for additional feedback.
 * - A submit button that redirects to the customer page after submitting feedback.
 * - Dropdown menu for user actions such as signing out.
 */

"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./styles.module.css";

const Feedback = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const closeTimeout = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(closeTimeout.current);
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => setIsDropdownOpen(false), 200);
    };

    useEffect(() => {
        return () => clearTimeout(closeTimeout.current);
    }, []);

    return (
        <>
            {/* Fixed Header Section */}
            <div className="p-2 flex items-center fixed top-0 left-0 right-0 z-1000 bg-gray-100" style={{ height: '4rem' }}>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <div className="flex items-center space-x-2 text-lg font-bold pl-4">
                    <img src="/logo.png" alt="PositiveFlow Logo" className="w-8 h-auto" />
                    <span className="text-black">
                        <span className="text-green-700">POS</span>itiveFlow
                    </span>
                </div>
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                >
                    <div className="p-2 rounded-full bg-white hover:bg-gray-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A10.97 10.97 0 0012 21c2.59 0 4.984-.876 6.879-2.324M15 11a4 4 0 10-8 0 4 4 0 008 0z" />
                        </svg>
                    </div>
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-50"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ul className="text-gray-700">
                                    <Link href="/cashier/shift" passHref>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sign Out</li>
                                    </Link>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Main Feedback Content with Top Padding */}
            <motion.div
                className={styles.feedbackWidget}
                style={{ paddingTop: '5rem' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="card lg:card-side bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">How was your experience?</h2>
                        <p className={styles.p}>We value your feedback. Please take a moment to rate your recent transaction and share your thoughts.</p>

                        {/* Overall Satisfaction */}
                        <p className={styles.p}>Overall satisfaction</p>
                        <div className="rating rating-lg gap-10">
                            {[...Array(5)].map((_, index) => (
                                <motion.input
                                    key={index}
                                    type="radio"
                                    name="rating-9"
                                    className="mask mask-star-2"
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                />
                            ))}
                        </div>

                        {/* Cashier Satisfaction */}
                        <p className={styles.p}>Cashier satisfaction</p>
                        <div className="rating rating-lg gap-10">
                            {[...Array(5)].map((_, index) => (
                                <motion.input
                                    key={index}
                                    type="radio"
                                    name="rating-8"
                                    className="mask mask-star-2"
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    style={{ fill: 'black' }} // Set star color to black
                                />
                            ))}
                        </div>

                        {/* Additional Comments */}
                        <p className={styles.p}>Additional comments</p>
                        <textarea
                            placeholder="Share your thoughts..."
                            className="textarea textarea-bordered textarea-md w-full"
                        ></textarea>

                        {/* Submit Button */}
                        <div className="card-actions justify-end">
                        <Link href="/customer" passHref>
                            <motion.button
                                className="btn btn-neutral btn-wide"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    borderColor: 'black',
                                }}
                            >

                                Submit Feedback
                            </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className={styles.div1}></div>
        </>
    );
};

export default Feedback;
