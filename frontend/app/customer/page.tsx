/**
 * PurchaseHistoryDashboard Component
 *
 * This component serves as the dashboard for displaying a user's purchase history.
 * It shows key information such as order summary and recent orders along with the option 
 * to manage feedback and view invoices.
 *
 * Functionalities:
 * 1. **Order Summary**: Displays the user's total orders, total spent, and loyalty points.
 * 2. **Recent Orders**: Shows the list of recent orders with details such as total price, items, and order date.
 *    - Each order can be interacted with: users can submit or edit feedback, and view invoices.
 * 3. **Dropdown Menu**: A dropdown appears on mouse hover that offers a "Sign Out" option.
 *
 * Features:
 * - Uses `framer-motion` for smooth animations on entry and exit of various sections.
 * - Includes interactivity for actions like submitting feedback and viewing invoices.
 * 
 * Dependencies:
 * - **framer-motion**: For animations (motion divs and transitions).
 * - **Link (Next.js)**: For navigating to other pages (like feedback or invoice).
 * 
 * Usage:
 * - This component is useful for users who want to review their past purchases and manage feedback.
 *
 * Note: The component uses `useState`, `useEffect`, and `useRef` hooks for state management and handling mouse interactions.
 */


"use client";

// PurchaseHistoryDashboard.tsx
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PurchaseHistoryDashboardSkeleton from './PurchaseHistoryDashboardSkeleton';

const PurchaseHistoryDashboard = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Control loading state
    const closeTimeout = useRef(null);

    // Toggle dropdown on click instead of mouse hover
    const handleToggleDropdown = () => {
        if (isDropdownOpen) {
            clearTimeout(closeTimeout.current);
            setIsDropdownOpen(false);
        } else {
            setIsDropdownOpen(true);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Assume data is loaded after some delay
        }, 2000);

        return () => {
            clearTimeout(timer);
            clearTimeout(closeTimeout.current);
        };
    }, []);

    if (isLoading) {
        return <PurchaseHistoryDashboardSkeleton />;
    }

    const orderSummary = {
        totalOrders: 42,
        totalSpent: 1234.56,
        loyaltyPoints: 2500,
    };

    const recentOrders = [
        { id: 1234, total: 99.99, items: 3, date: "Jan 15, 2025", rated: true },
        { id: 1235, total: 149.99, items: 2, date: "Feb 1, 2025", rated: false },
    ];

    return (
        <div className="relative bg-gray-100" style={{ paddingTop: '4rem' }}>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
            
            {/* Header Section */}
            <div className="px-4 sm:px-6 py-2 flex items-center fixed top-0 left-0 right-0 z-50 bg-gray-100">
                <div className="flex items-center space-x-2 text-lg font-bold">
                    <img src="/logo.png" alt="PositiveFlow Logo" className="w-8 h-auto" />
                    <span className="text-black">
                        <span className="text-green-700">POS</span>itiveFlow
                    </span>
                </div>
                <div
                    className="ml-auto"
                    onClick={handleToggleDropdown}
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
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ul className="text-gray-700">
                                    <Link href="/" passHref>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sign Out</li>
                                    </Link>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="px-4 sm:px-6 py-8 mt-16">
                <h1 className="text-2xl font-semibold mb-6">Purchase History Dashboard</h1>

                {/* Order Summary Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {Object.entries(orderSummary).map(([key, value]) => (
                            <motion.div
                                key={key}
                                className="p-4 bg-gray-50 rounded-lg text-center shadow"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * (Object.keys(orderSummary).indexOf(key) + 1) }}
                            >
                                <h3 className="text-sm font-semibold text-gray-500">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </h3>
                                <p className="text-2xl font-bold">
                                    {key === "totalSpent" ? `$${value.toFixed(2)}` : value}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Recent Orders Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
                    {recentOrders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            className="flex flex-col sm:flex-row justify-between items-center p-4 mb-4 bg-gray-50 rounded-lg shadow"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                        >
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-800">Order #{order.id}</span>
                                <span className="text-gray-600">${order.total.toFixed(2)} • {order.items} items</span>
                            </div>
                            <div className="text-gray-400 text-sm text-center mt-2 sm:mt-0">
                                Ordered on <br /> {order.date}
                            </div>
                            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                {order.rated ? (
                                    <Link href="/customer/feedback" passHref>
                                        <button className="bg-gray-800 text-white px-4 py-1 rounded-md hover:scale-105 transition-transform">
                                            Edit Feedback
                                        </button>
                                    </Link>
                                ) : (
                                    <Link href="/customer/feedback" passHref>
                                        <button className="bg-gray-800 text-white px-4 py-1 rounded-md hover:scale-105 transition-transform">
                                            Submit Feedback
                                        </button>
                                    </Link>
                                )}
                                <Link href="/customer/Invoice" passHref>
                                    <button className="bg-gray-800 text-white px-4 py-1 rounded-md hover:scale-105 transition-transform">
                                        View
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistoryDashboard;
