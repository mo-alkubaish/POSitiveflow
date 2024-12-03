import React from 'react';

const RecentOrdersSkeleton = () => {
    return (
        <>
            {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex justify-between items-center p-4 mb-4 bg-gray-50 rounded-lg shadow animate-pulse">
                    <div className="flex flex-col w-1/3">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="flex items-center space-x-2">
                        <div className="h-8 bg-gray-200 rounded w-20"></div>
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default RecentOrdersSkeleton;
