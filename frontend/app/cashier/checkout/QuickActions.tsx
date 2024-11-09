/**
 * QuickActions component provides quick-access buttons for POS operations, including applying discounts and ending the cashier shift.
 * 
 * Features:
 * - Apply Discount Button: Opens a modal to select an active discount to apply to the current transaction.
 * - End Shift Button: Navigates to the shift-ending page for the cashier.
 * - Discount Selection Modal:
 *   - Displays a list of active discounts filtered by date and status.
 *   - Allows the user to select a discount, applying it via `applyDiscount` from `DiscountContext`.
 * 
 * State Management:
 * - `isDiscountModalOpen`: Controls the visibility of the discount selection modal.
 * - `availableDiscounts`: Stores discounts that are active and within the current date range.
 * 
 * Hooks:
 * - `useEffect`: Loads active discounts from the discounts data on component mount, filtering based on dates.
 * - `useDiscount`: Accesses the `applyDiscount` function to apply selected discounts to the current transaction.
 * 
 * This component streamlines access to commonly used actions within the POS system, enhancing cashier efficiency.
 */


import React, { useState, useEffect } from 'react';
import Link from 'next/link';  
import { useDiscount } from './DiscountContext';
import discountsData from '../../data/discounts.json';

const QuickActions = () => {
    const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
    const [availableDiscounts, setAvailableDiscounts] = useState([]);
    const { applyDiscount } = useDiscount();

    useEffect(() => {
        const today = new Date();
        const activeDiscounts = discountsData.filter(discount => {
            const startDate = new Date(discount.startDate);
            const endDate = new Date(discount.endDate);
            return discount.status === "Active" && today >= startDate && today <= endDate;
        });
        setAvailableDiscounts(activeDiscounts);
    }, []);

    const handleApplyDiscountClick = () => setIsDiscountModalOpen(true);

    const handleDiscountSelect = (discount) => {
        applyDiscount({
            value: parseFloat(discount.value),
            type: discount.type
        });
        setIsDiscountModalOpen(false);
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-4 text-black w-full text-xs">
            <h2 className="text-lg font-bold mb-2">Quick Actions</h2>
            <div className="flex justify-between space-x-2">
                <button className="btn bg-black text-white flex-grow" onClick={handleApplyDiscountClick}>
                    Apply Discount
                </button>
                <Link href="/cashier/shift" passHref>
                    <button className="btn bg-black text-white flex-grow">
                        End Shift
                    </button>
                </Link>
            </div>
            {isDiscountModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h3 className="text-lg font-bold mb-4">Select a Discount</h3>
                        <ul className="space-y-2">
                            {availableDiscounts.map(discount => (
                                <li key={discount.id} className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleDiscountSelect(discount)}>
                                    {discount.name} ({discount.type === "Percentage" ? `${discount.value}%` : `$${discount.value}`})
                                </li>
                            ))}
                        </ul>
                        <button className="btn bg-gray-300 mt-4 w-full" onClick={() => setIsDiscountModalOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuickActions;
