import React from 'react';

const OrderSummarySkeleton = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg text-center shadow animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
            ))}
        </div>
    );
};

export default OrderSummarySkeleton;
