/**
 * CurrentTransaction component displays the current transaction details in a POS system,
 * including item details, quantity adjustments, and calculated totals with discount and VAT.
 * 
 * Features:
 * - Item List: Displays each item with its name, quantity, price, and total per item.
 * - Quantity Adjustment: Buttons to increment or decrement item quantities, updating the total dynamically.
 * - Calculations:
 *   - Subtotal: Sum of all items' total prices.
 *   - VAT: Calculated at 10% of the subtotal.
 *   - Discount: Retrieved from `useDiscount` context, allowing real-time discount adjustments.
 *   - Final Total: Calculated as `Subtotal + VAT - Discount`.
 * 
 * State Management:
 * - `items`: Manages the list of items and their quantities, initialized with product data.
 * 
 * Context:
 * - `discount`: Accessed via `useDiscount` to apply a user-defined discount to the transaction.
 * 
 * Layout:
 * - Displays totals and enables adjustments with responsive styling for an easy POS experience.
 * 
 * This component offers a clear and interactive summary of the current transaction, supporting essential POS functionality.
 */
"use client";

import React, { useState } from 'react';
import { useDiscount } from './DiscountContext';
import products from '../../data/cashierProducts.json';

const CurrentTransaction = ({items, setItems}) => {
    // const [items, setItems] = [products, setProducts];
    const { discount } = useDiscount();

    const updateQuantity = (id, increment) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + increment } : item
        ));
    };

    const calculateTotal = () => items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const calculateVAT = (total) => total * 0.15;
    const calculateDiscount = (total) => {
        return parseFloat(discount); 
    };

    const subtotal = calculateTotal();
    const VAT = calculateVAT(subtotal);
    const discountAmount = calculateDiscount(subtotal); 
    const total = subtotal + VAT - discountAmount;

    return (
        <div className="card bg-white shadow-xl p-4 text-black w-full sm:w-[600px] md:w-[795px] h-[395px] invoice">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <h2 className="card-title text-lg font-bold">Current Transaction</h2>
            <div className="overflow-x-auto">
                <table className="table w-full text-black">
                    <thead>
                        <tr>
                            <th>Item</th><th>Quantity</th><th>Price</th><th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td className="flex items-center justify-center space-x-2">
                                    <button className="btn btn-xs" onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                                    <span>{item.quantity}</span>
                                    <button className="btn btn-xs" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </td>
                                <td>${item.price}</td>
                                <td>${(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="card-body">
                <div className="flex justify-between">
                    <span>Subtotal:</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>VAT (15%):</span><span>${VAT.toFixed(2)}</span>
                </div>
                {discount > 0? (<div className="flex justify-between">
                    <span>Discount:</span><span>-${discountAmount.toFixed(2)}</span>
                </div>) : null}

                <div className="flex justify-between font-bold">
                    <span>Total:</span><span>${total.toFixed(2)}</span>
                </div>
            </div>
            <div className="flex justify-end mt-4">
            </div>
        </div>
    );
};

export default CurrentTransaction;
