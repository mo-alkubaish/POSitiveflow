import React from 'react';

const DiscountFormSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-10 bg-gray-200 rounded w-full"></div>
        ))}
        <div className="col-span-2 h-12 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="flex justify-end">
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
};

export default DiscountFormSkeleton;
