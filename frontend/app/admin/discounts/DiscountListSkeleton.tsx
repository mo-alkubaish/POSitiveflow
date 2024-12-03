import React from 'react';

const DiscountListSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {['Name', 'Type', 'Value', 'Start Date', 'End Date', 'Status', 'Actions'].map((header, index) => (
                <th key={index}>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index}>
                {Array.from({ length: 7 }).map((_, idx) => (
                  <td key={idx}>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscountListSkeleton;
