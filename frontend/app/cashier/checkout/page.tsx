/**
 * Dashboard Component
 *
 * The Dashboard serves as the main interface for a POS system, integrating multiple child components
 * such as CurrentTransaction, CustomerInformation, QuickActions, and Payment. It also provides a global
 * DiscountContext to allow discount-related data to be shared across components.
 *
 * Components:
 * - **CurrentTransaction**: Displays details of the ongoing transaction.
 * - **CustomerInformation**: Manages and displays customer details.
 * - **QuickActions**: Contains quick-action shortcuts for frequently used features.
 * - **Payment**: Handles the payment processing and options available.
 *
 * Context:
 * - Wrapped in a **DiscountProvider** to make discount-related information accessible across child components.
 *
 * State:
 * - `isDropdownOpen`: Tracks the visibility of the user profile dropdown menu.
 * - `closeTimeout`: A reference used to delay the closing of the dropdown for smooth UX.
 *
 * Event Handlers:
 * - **handleMouseEnter**: Opens the dropdown when the user hovers over the profile icon.
 * - **handleMouseLeave**: Delays closing the dropdown when the user moves the cursor away.
 *
 * Styling:
 * - **Fixed Navbar**: Includes the POSitiveFlow logo and profile icon, fixed at the top for constant visibility.
 * - **Responsive Layout**: Uses flex and responsive classes to adapt the layout based on screen size.
 *
 * Usage:
 * - The Dashboard component is designed to serve as the primary screen, combining several subcomponents into a coherent POS interface.
 */


"use client";
import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import CurrentTransaction from './CurrentTransaction';
import CustomerInformation from './CustomerInformation';
import QuickActions from './QuickActions'; 
import { DiscountProvider } from './DiscountContext';
import Payment from './payment';
import { useSearchParams } from 'next/navigation';

const DashboardContent = () => {
    const searchParams = useSearchParams();
    const cartData = JSON.parse(decodeURIComponent(searchParams.get('cart') || '[]'));
    const [cart, setCart] = useState(cartData);
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
    return (            <DiscountProvider>
        <div className="relative bg-gray-100" style={{ paddingTop: '4rem' }}>
            <div className="p-2 flex items-center" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                <div className="flex items-center space-x-2 text-lg font-bold pl-4">
                    <img src="/logo.png" alt="PositiveFlow Logo" className="w-8 h-auto" />
                    <span className='text-black'><span className="text-green-700">POS</span>itiveFlow</span>
                </div>
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                    <div className="p-2 rounded-full bg-white hover:bg-gray-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A10.97 10.97 0 0012 21c2.59 0 4.984-.876 6.879-2.324M15 11a4 4 0 10-8 0 4 4 0 008 0z" />
                        </svg>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-50">
                            <ul className="text-gray-700">
                                <Link href="/cashier/shift" passHref>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sign Out</li>
                                </Link>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center p-4">
                <div className="max-w-7xl w-full"> 
                    <div className="flex flex-col md:flex-row gap-8"> 
                        <div className="flex flex-col w-full space-y-4">
                            <CurrentTransaction items={cart} setItems={setCart} />
                            <Payment items={cart} />
                        </div>
                        <div className="flex flex-col w-full md:w-[600px] space-y-4"> 
                            <CustomerInformation />
                            <QuickActions items={cart} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DiscountProvider>);
}
const Dashboard = () => {

    return (      
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
};

export default Dashboard;
