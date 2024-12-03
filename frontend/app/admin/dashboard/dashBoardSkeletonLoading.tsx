// dashBoardSkeletonLoading.tsx
import React from 'react';

const DashBoardSkeletonLoading = () => {
  return (
    <div className="p-4 space-y-4 text-black m-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Sales Trend Chart Skeleton */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded w-full"></div>
        </div>

        {/* Top Selling Products Table Skeleton */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory and Activities Skeleton */}
      <div className="grid gap-4 md:grid-cols-1">
        {/* Inventory Summary Table Skeleton */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities and Customer Feedback Skeleton */}
        <div className="space-y-4">
          {/* Recent Activities Skeleton */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Feedback Skeleton */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSkeletonLoading;
