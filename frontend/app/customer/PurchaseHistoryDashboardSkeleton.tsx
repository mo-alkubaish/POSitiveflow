import React from 'react';
import { motion } from 'framer-motion';

const PurchaseHistoryDashboardSkeleton = () => {
  const skeletonVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="relative bg-gray-100" style={{ paddingTop: '4rem' }}>
      {/* Header Section Skeleton */}
      <div className="px-4 sm:px-6 py-2 flex items-center fixed top-0 left-0 right-0 z-50 bg-gray-100">
        <motion.div className="h-8 w-8 bg-gray-300 rounded-full" variants={skeletonVariants} initial="initial" animate="animate" />
        <motion.div className="ml-2 h-6 bg-gray-300 w-24 rounded" variants={skeletonVariants} initial="initial" animate="animate" />
        <motion.div className="ml-auto h-8 w-8 bg-gray-300 rounded-full" variants={skeletonVariants} initial="initial" animate="animate" />
      </div>

      {/* Main Dashboard Content Skeleton */}
      <div className="px-4 sm:px-6 py-8 mt-16">
        <motion.h1 className="h-6 bg-gray-300 w-48 rounded mb-6" variants={skeletonVariants} initial="initial" animate="animate" />

        {/* Order Summary Section Skeleton */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <motion.div className="h-4 bg-gray-300 w-32 rounded mb-4" variants={skeletonVariants} initial="initial" animate="animate" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div key={index} className="p-4 bg-gray-50 rounded-lg text-center shadow"
                          variants={skeletonVariants} initial="initial" animate="animate"
                          transition={{ duration: 0.3, delay: 0.1 * index }}>
                <div className="h-4 bg-gray-300 w-3/4 mx-auto rounded mb-2"></div>
                <div className="h-6 bg-gray-300 w-1/2 mx-auto rounded"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Orders Section Skeleton */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <motion.div className="h-4 bg-gray-300 w-32 rounded mb-4" variants={skeletonVariants} initial="initial" animate="animate" />
          {Array.from({ length: 2 }).map((_, index) => (
            <motion.div key={index} className="flex flex-col sm:flex-row justify-between items-center p-4 mb-4 bg-gray-50 rounded-lg shadow"
                        variants={skeletonVariants} initial="initial" animate="animate"
                        transition={{ duration: 0.3, delay: 0.1 * index }}>
              <div className="w-1/2 h-4 bg-gray-300 rounded mb-2 sm:mb-0"></div>
              <div className="w-1/4 h-4 bg-gray-300 rounded mb-2 sm:mb-0"></div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <div className="h-8 w-32 bg-gray-300 rounded"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryDashboardSkeleton;
