/**
 * Dashboard component serves as the main layout for the POS system dashboard, displaying the current transaction, customer information, and quick actions.
 * 
 * Structure:
 * - Wrapped in `DiscountProvider` to enable shared access to discount data across child components.
 * - `CurrentTransaction`: Displays items in the current sale, with quantity adjustments and pricing details.
 * - `CustomerInformation`: Allows customer search, selection, and application of loyalty discounts.
 * - `QuickActions`: Provides quick access to additional POS functionalities (e.g., checkout, cancel).
 * 
 * Layout:
 * - Flex layout with a responsive design, positioning `CurrentTransaction` alongside `CustomerInformation` and `QuickActions`.
 * 
 * This component serves as the central interface for POS operations, integrating key modules and managing discounts.
 */

"use client";

import React from 'react';
import CurrentTransaction from './CurrentTransaction';
import CustomerInformation from './CustomerInformation';
import QuickActions from './QuickActions'; 
import { DiscountProvider } from './DiscountContext';

const Dashboard = () => {
    return (
        <DiscountProvider>
            <div className="flex justify-center min-h-screen p-4 bg-gray-100">
                <div className="flex flex-col md:flex-row gap-8 max-w-7xl w-full"> 
                    <CurrentTransaction />
                    <div className="flex flex-col w-full md:w-[600px] space-y-4"> 
                        <CustomerInformation />
                        <QuickActions />
                    </div>
                </div>
            </div>
        </DiscountProvider>
    );
};

export default Dashboard;
