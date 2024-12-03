import React from 'react';

const CartSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
      {Array.from({ length:1 }).map((_, index) => (
        <div key={index} className="flex items-center p-2 shadow-md rounded mb-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="flex items-center mx-4">
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-6 mx-2"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6 ml-auto"></div>
        </div>
      ))} */}
      <div className="mt-4 shadow-md p-4 rounded">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

export default CartSkeleton;
