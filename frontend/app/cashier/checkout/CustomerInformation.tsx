/**
 * CustomerInformation component enables the selection of a customer, displays their loyalty points, and allows for applying loyalty points as a discount.
 * 
 * Features:
 * - Search: Allows users to search for customers by name or other attributes, filtering the displayed customer list in real time.
 * - Customer List: Displays the top 3 customers by default, sorted by loyalty points. Updates based on search input.
 * - Loyalty Discount: Allows users to select a customer and apply their loyalty points as a discount.
 * - Discount Calculation: Calculates discount value based on the entered loyalty points (1 point = $0.01).
 * 
 * State Management:
 * - `allCustomers`: Holds the full list of customers, sorted by loyalty points.
 * - `displayedCustomers`: Manages the subset of customers displayed based on search criteria.
 * - `selectedCustomerId`: Tracks the ID of the currently selected customer.
 * - `pointsToUse`: Input field for the number of loyalty points the user wants to apply.
 * - `setDiscount`: Provided by `useDiscount` context to apply the calculated discount to the transaction.
 * 
 * Side Effects:
 * - Initializes with top 3 customers sorted by loyalty points.
 * - Updates displayed customers based on search term.
 * 
 * This component enhances the POS system by providing quick access to customer information and a way to apply loyalty discounts.
 */

"use client";

import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useDiscount } from './DiscountContext';
import searchCustomers from '../../admin/customer-management/searchCustomers';
import customersData from '../../data/customers.json'; 

const CustomerInformation = () => {
    const [allCustomers, setAllCustomers] = useState([]);
    const [displayedCustomers, setDisplayedCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [pointsToUse, setPointsToUse] = useState('');
    const { setDiscount } = useDiscount();

    useEffect(() => {
        const sortedCustomers = [...customersData].sort((a, b) => b.loyaltyPoints - a.loyaltyPoints);
        setAllCustomers(sortedCustomers);
        setDisplayedCustomers(sortedCustomers.slice(0, 3));
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filteredCustomers = searchCustomers(allCustomers, searchTerm);
            setDisplayedCustomers(filteredCustomers);
        } else {
            setDisplayedCustomers(allCustomers.slice(0, 3));
        }
    }, [searchTerm, allCustomers]);

    const selectCustomer = (id) => {
        setSelectedCustomerId(id);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const applyLoyaltyDiscount = () => {
        if (!selectedCustomerId) {
            alert("Please select a customer first.");
            return;
        }
        const customer = allCustomers.find(c => c.id === selectedCustomerId);
        if (!customer) {
            alert("Customer not found.");
            return;
        }
        const pointsToUseAmount = Math.max(0, Math.min(customer.loyaltyPoints, pointsToUse)); 
        const discountValue = pointsToUseAmount * 0.01;
        setDiscount(discountValue);
        const updatedCustomers = allCustomers.map(c => c.id === selectedCustomerId ? {...c, loyaltyPoints: c.loyaltyPoints - pointsToUseAmount} : c);
        setAllCustomers(updatedCustomers);
        setPointsToUse(''); 
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-4 text-black w-full text-xs">
            <h2 className="text-lg font-bold mb-4">Customer Information</h2>
            <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                    type="search"
                    placeholder="Search Customers..."
                    className="input input-bordered w-full pl-10"
                    onChange={handleSearchChange}
                />
            </div>
            <div className="space-y-2 overflow-y-auto">
                {displayedCustomers.map((customer) => (
                    <div key={customer.id}
                         className={`bg-gray-100 rounded-lg p-2 flex justify-between items-center cursor-pointer ${selectedCustomerId === customer.id ? 'bg-green-200' : ''}`}
                         onClick={() => selectCustomer(customer.id)}>
                        <span>{customer.name}</span>
                        <span>Loyalty Points: {customer.loyaltyPoints}</span>
                    </div>
                ))}
            </div>
            {selectedCustomerId && (
                <div className="mt-4">
                    <label htmlFor="pointsToUse" className="block text-sm font-medium text-gray-700">Points to use:</label>
                    <input
                        type="number"
                        id="pointsToUse"
                        value={pointsToUse}
                        onChange={(e) => setPointsToUse(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Enter points to use"
                    />
                    <button className="btn bg-black text-white w-full mt-4" onClick={applyLoyaltyDiscount}>
                        Apply Loyalty Discount
                    </button>
                </div>
            )}
        </div>
    );
};

export default CustomerInformation;
