import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Link from 'next/link';
import { motion } from 'framer-motion';

const salesData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales with POSitiveFlow',
      data: [120, 190, 170, 250, 220, 300],
      backgroundColor: 'rgba(34, 139, 34, 0.7)'  // Greenish
    },
    {
      label: 'Sales without POSitiveFlow',
      data: [80, 130, 100, 150, 120, 170],
      backgroundColor: 'rgba(0, 0, 0, 0.7)'  // Blackish
    }
  ]
};

const HeroSection = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Sales Chart with Fade-In Animation from Bottom */}
        <motion.div 
          className="flex-1 flex justify-center items-center p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div style={{ width: '600px', height: '400px' }}>
            <Bar data={salesData} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }} />
          </div>
        </motion.div>

        {/* Text and Call to Action with Fade-In Animation from Bottom */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold text-black mb-5">
            Welcome to <span className="text-success">POS</span>itiveFlow
          </h1>
          <p className="mb-6 text-lg">
            A streamlined solution for managing your retail business with ease and efficiency.
          </p>
          <Link href="/signup" className="btn btn-success">Get Started</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
