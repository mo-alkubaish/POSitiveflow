/**
 * Payment component provides an interface for processing different payment methods and optionally splitting payments for a transaction.
 * 
 * Features:
 * - Order Summary: Displays the subtotal, tax, and total amount due for the transaction.
 * - Payment Methods: Allows selection among multiple payment options (Cash, Credit Card, Debit Card, Mobile Payment).
 * - Split Payment:
 *   - Enables toggling between single and split payment modes.
 *   - Allows adjusting the number of splits and modifying each split’s amount, with real-time validation to ensure split amounts don’t exceed the total.
 * - Print Receipt: A button to trigger the print dialog for the receipt.
 * 
 * State Management:
 * - `paymentMethod`: Tracks the selected payment method (default is "cash").
 * - `showSplitDetails`: Controls visibility of split payment details.
 * - `numSplits`: Manages the number of splits for split payment.
 * - `splits`: Stores an array of split amounts, initialized with default values that add up to the total.
 * 
 * Helper Functions:
 * - `handlePrintReceipt`: Opens the print dialog for the receipt.
 * - `handleToggleSplitDetails`: Toggles the visibility of the split payment section.
 * - `handleSplitChange`: Updates the value of a split and ensures the total of all splits doesn’t exceed the transaction total.
 * - `handleNumSplitsChange`: Adjusts the number of splits and recalculates split values as needed.
 * 
 * Layout:
 * - Flex layout with responsive styling, offering a clear and intuitive payment interface.
 * 
 * This component simplifies the checkout process by supporting various payment methods and split payments, enhancing flexibility for the cashier.
 */


"use client";

import React, { useState } from 'react';

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [showSplitDetails, setShowSplitDetails] = useState(false);
    const [numSplits, setNumSplits] = useState(2);
    const [splits, setSplits] = useState([{ value: 55.00 }, { value: 55.00 }]);
    const totalAmount = 110.00; 

    const handlePrintReceipt = () => {
        window.print();
    };

    const handleToggleSplitDetails = () => {
        setShowSplitDetails(!showSplitDetails);
    };

    const handleSplitChange = (index, value) => {
        let parsedValue = parseFloat(value);
        const newSplits = splits.map((split, idx) => idx === index ? { ...split, value: parsedValue } : split);
        const totalSplits = newSplits.reduce((acc, curr) => acc + parseFloat(curr.value), 0);

        if (totalSplits <= totalAmount) {
            setSplits(newSplits);
        } else {
            alert("Total of splits exceeds the total amount!");
        }
    };

    const handleNumSplitsChange = (increment) => {
        let newNumSplits = Math.max(1, numSplits + increment);
        const newSplits = new Array(newNumSplits).fill().map((_, idx) => ({
            value: splits[idx] ? splits[idx].value : totalAmount / newNumSplits
        }));
        setSplits(newSplits);
        setNumSplits(newNumSplits);
    };

    return (
<div className="card !bg-white shadow-xl p-4 text-black w-full sm:w-[600px] md:w-[795px]" style={{ maxHeight: '600px', overflowY: 'auto' }}>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <div className="flex justify-between gap-10">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-6">Payment</h2>
                        <div className="mb-4">
                            <h3 className="font-semibold">Order Summary</h3>
                            <div className="text-gray-700 mt-2 space-y-2">
                                <p>Subtotal: <span className="font-bold">$100.00</span></p>
                                <p>Tax: <span className="font-bold">$10.00</span></p>
                                <p>Total: <span className="font-bold">$110.00</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold mb-4">Payment Method</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <button onClick={() => setPaymentMethod('cash')} className={`w-full py-3 rounded-lg ${paymentMethod === 'cash' ? 'bg-gray-300' : 'bg-white shadow-md'}`}>Cash</button>
                            <button onClick={() => setPaymentMethod('creditCard')} className={`w-full py-3 rounded-lg ${paymentMethod === 'creditCard' ? 'bg-gray-300' : 'bg-white shadow-md'}`}>Credit Card</button>
                            <button onClick={() => setPaymentMethod('debitCard')} className={`w-full py-3 rounded-lg ${paymentMethod === 'debitCard' ? 'bg-gray-300' : 'bg-white shadow-md'}`}>Debit Card</button>
                            <button onClick={() => setPaymentMethod('mobilePayment')} className={`w-full py-3 rounded-lg ${paymentMethod === 'mobilePayment' ? 'bg-gray-300' : 'bg-white shadow-md'}`}>Mobile Payment</button>
                        </div>
                    </div>
                </div>

                {showSplitDetails && (
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Split Details</h3>
                        <div className="mb-2 flex items-center space-x-2">
                            <button onClick={() => handleNumSplitsChange(-1)} className="btn">-</button>
                            <span>{numSplits}</span>
                            <button onClick={() => handleNumSplitsChange(1)} className="btn">+</button>
                        </div>
                        {splits.map((split, idx) => (
                            <div key={idx} className="flex items-center space-x-2 mb-2">
                                <label>{`Split ${idx + 1}:`}</label>
                                <input
                                    type="number"
                                    value={split.value}
                                    onChange={(e) => handleSplitChange(idx, e.target.value)}
                                    className="input input-bordered w-1/2"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-between mt-4">
                <a href="/cashier/items" className="bg-black text-white flex justify-center items-center py-3 px-6 rounded-lg hover:bg-gray-800 flex-1 mr-2">Pay</a>
                <button className={`bg-black ${showSplitDetails ? 'bg-green-800' : 'bg-black'} text-white py-3 px-6 rounded-lg hover:bg-gray-800 flex-1 mr-2`} onClick={handleToggleSplitDetails}>Split Payment</button>
                <button className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 flex-1" onClick={handlePrintReceipt}>Print Receipt</button>
                </div>
            </div>
    );
};

export default Payment;
