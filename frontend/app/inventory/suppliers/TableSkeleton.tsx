import React from 'react';

const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="flex items-center space-x-4">
          <div className="h-10 bg-gray-200 rounded w-64"></div>
          <div className="h-10 bg-gray-200 rounded w-12"></div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 rounded-l-lg">.....</th>
              <th className="py-2 px-4">.....</th>
              <th className="py-2 px-4">....</th>
              <th className="py-2 px-4 rounded-r-lg text-right">.....</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, index) => (
              <tr key={index} className="bg-white hover:bg-gray-50 shadow-sm rounded-lg">
                <td className="py-3 px-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <div className="h-8 bg-gray-200 rounded w-16 inline-block"></div>
                  <div className="h-8 bg-gray-200 rounded w-16 inline-block"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="flex items-center space-x-2">
          <div className="h-8 bg-gray-200 rounded w-8"></div>
          <div className="h-8 bg-gray-200 rounded w-8"></div>
          <div className="h-8 bg-gray-200 rounded w-8"></div>
          <div className="h-8 bg-gray-200 rounded w-8"></div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
