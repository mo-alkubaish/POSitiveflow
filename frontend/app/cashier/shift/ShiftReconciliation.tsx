/**
 * ShiftReconciliation component provides an interface for reviewing and submitting shift data, focusing on cashier reconciliation.
 * 
 * Features:
 * - Shift Date and Hours: Allows the user to select the shift date and specify start and end hours.
 * - Cashier Details: Displays the cashier's name, which is currently set to a default and non-editable value.
 * - Cash Drawer Summary: Shows opening balance, total sales, and closing balance for the shift.
 * - Transaction Summary: Presents a summary of transactions by payment method, displaying count and total amount for each method.
 * - Action Buttons:
 *   - "Cancel" button to reset or discard changes.
 *   - "Submit Reconciliation" button (linked to home) to finalize and submit shift reconciliation data.
 * 
 * State Management:
 * - `shiftDate`: Tracks the selected date for the shift.
 * - `startHour` and `endHour`: Manage selected start and end times, allowing users to pick hours within a 24-hour range.
 * 
 * Layout:
 * - Organized in sections (Shift Date, Cash Drawer Summary, Transaction Summary) to provide a structured view of shift data.
 * - Flex layout with centered alignment for optimal readability and use within a POS system.
 * 
 * This component supports end-of-shift operations, providing a clear summary of financials and transaction counts to ensure accuracy in daily cash reconciliation.
 */


"use client";

import React, { useState } from 'react';
import Link from 'next/link';  

const ShiftReconciliation = () => {
    const [shiftDate, setShiftDate] = useState('2025-10-03');
    const [startHour, setStartHour] = useState('09'); 
    const [endHour, setEndHour] = useState('17'); 

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
                <h1 className="text-2xl font-bold mb-4">Shift Reconciliation Module</h1>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shift Date</label>
                        <div className="mt-1">
                            <input type="date" className="input input-bordered w-full" value={shiftDate} onChange={(e) => setShiftDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Time (Hour)</label>
                            <select
                                className="select select-bordered w-full"
                                value={startHour}
                                onChange={(e) => setStartHour(e.target.value)}
                            >
                                {[...Array(24)].map((_, index) => (
                                    <option key={index} value={index.toString().padStart(2, '0')}>{index.toString().padStart(2, '0')}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Time (Hour)</label>
                            <select
                                className="select select-bordered w-full"
                                value={endHour}
                                onChange={(e) => setEndHour(e.target.value)}
                            >
                                {[...Array(24)].map((_, index) => (
                                    <option key={index} value={index.toString().padStart(2, '0')}>{index.toString().padStart(2, '0')}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Cashier</label>
                    <div className="mt-1">
                        <input type="text" className="input input-bordered w-full" defaultValue="Abdullah Abbas" disabled />
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-2">Cash Drawer Summary</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Opening Balance</label>
                        <div className="text-lg">$500.00</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Sales</label>
                        <div className="text-lg">$750.75</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Closing Balance</label>
                        <div className="text-lg">$1,250.75</div>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-2">Transaction Summary</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Payment Method</th>
                            <th>Count</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cash</td>
                            <td>15</td>
                            <td>$450.25</td>
                        </tr>
                        <tr>
                            <td>Credit Card</td>
                            <td>27</td>
                            <td>$300.50</td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-end space-x-2 mt-6">
                <Link href="/cashier/items" passHref>
                    <button className="btn">Cancel</button>
                    </Link>

                    <a href="/" className="btn bg-black text-white">Submit Reconciliation</a>
                </div>
            </div>
        </div>
    );
};

export default ShiftReconciliation;
