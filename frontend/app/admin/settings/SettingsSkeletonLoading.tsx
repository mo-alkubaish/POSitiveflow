// SettingsSkeletonLoading.tsx
import React from 'react';

const SettingsSkeletonLoading = () => {
  return (
    <div className="container mx-auto p-6 animate-pulse">
      {/* Skeleton for SettingsForm */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>

            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
          </div>

          {/* Right Column */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>

            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center justify-between mt-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
      </div>

      {/* Skeleton for BackupSection */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        {/* Backup Status Heading */}
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>

        {/* Backup Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg text-center">
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* BackupDetailsTable Skeleton */}
        <div className="overflow-x-auto">
          {/* Table Skeleton for Desktop */}
          <div className="hidden md:block">
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 rounded w-full mb-2"></div>
            ))}
          </div>

          {/* Mobile Cards Skeleton */}
          <div className="md:hidden space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4">
                {Array.from({ length: 5 }).map((__, idx) => (
                  <div key={idx} className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* BackupSettings Skeleton */}
        <div className="mt-6">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>
          <div className="mt-4">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSkeletonLoading;
