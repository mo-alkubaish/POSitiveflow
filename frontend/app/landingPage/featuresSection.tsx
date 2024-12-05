/**
 * FeaturesSection component showcases the main features of the platform.
 * 
 * Structure:
 * - Title and description introduce the section with smooth entrance animations.
 * - Displays three feature cards: Inventory Management, Sales Analytics, and Customer Loyalty.
 * 
 * Features:
 * - Each feature card has an icon, title, and description, animated to appear when scrolled into view.
 * - Uses Framer Motion for entrance animations with staggered delays to enhance visual flow.
 * 
 * This section aims to highlight the platform's key capabilities, providing users with a clear overview of its tools.
 */


import React from 'react';
import { ClipboardIcon, ChartBarIcon, StarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        {/* Title with Animation */}
        <motion.h2
          className="text-4xl font-bold text-success"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Features
        </motion.h2>

        {/* Description with Animation */}
        <motion.p
          className="text-lg text-base-content mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Our platform offers a comprehensive set of tools for retail management.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2 sm:px-0">
          {/* Individual feature cards with animations triggered on view */}
          <motion.div
            className="card bg-base-100 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="card-body">
              <ClipboardIcon className="h-10 w-10 text-success mx-auto mb-3" />
              <h3 className="text-2xl font-bold">Inventory Management</h3>
              <p>Keep track of your stock levels in real-time.</p>
            </div>
          </motion.div>

          <motion.div
            className="card bg-base-100 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="card-body">
              <ChartBarIcon className="h-10 w-10 text-success mx-auto mb-3" />
              <h3 className="text-2xl font-bold">Sales Analytics</h3>
              <p>Analyze sales data to make informed decisions.</p>
            </div>
          </motion.div>

          <motion.div
            className="card bg-base-100 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="card-body">
              <StarIcon className="h-10 w-10 text-success mx-auto mb-3" />
              <h3 className="text-2xl font-bold">Customer Loyalty</h3>
              <p>Reward loyal customers to encourage repeat business.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
