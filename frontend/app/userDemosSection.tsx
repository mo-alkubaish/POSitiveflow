"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const demoContent = {
  storeOwner: {
    title: "Store Owner/Manager",
    description: "Manage users, configure settings, and access comprehensive sales and inventory reports.",
    features: ["User Management", "Reports", "Settings"],
    link: "/user-management"
  },
  cashier: {
    title: "Cashier",
    description: "Quick access to sales forms, payment processing, and receipt generation via WhatsApp.",
    features: ["Sales Processing", "Digital Receipts", "Draft Orders"],
    link: "/cashier-dashboard"
  },
  inventoryManager: {
    title: "Inventory Manager",
    description: "Manage products, suppliers, and receive notifications on low stock.",
    features: ["Inventory Management", "Supplier Tracking", "Barcode Generation"],
    link: "/inventory-dashboard"
  },
  customer: {
    title: "Customer",
    description: "Access receipts, view purchase history, and participate in loyalty programs.",
    features: ["Receipts", "Loyalty Program", "Purchase History"],
    link: "/customer-dashboard"
  },
};

const UserDemosSection = () => {
  const [selectedRole, setSelectedRole] = useState("storeOwner");
  const router = useRouter();

  const renderDemoFeatures = (features) => (
    <ul className="list-disc ml-4 text-left">
      {features.map((feature, index) => (
        <motion.li
          key={index}
          className="text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * index }}
        >
          {feature}
        </motion.li>
      ))}
    </ul>
  );

  const handleNavigation = () => {
    router.push(demoContent[selectedRole].link);
  };

  return (
    <section id="user-demos" className="py-20 bg-base-100">
      <div className="container mx-auto text-center">
        {/* Animated Title */}
        <motion.h2
          className="text-4xl font-bold text-success mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          User Demos
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore the main features available for each user type in POSitiveFlow.
        </motion.p>
        
        {/* Animated Role Selection Buttons */}
        <motion.div
          className="flex justify-center mb-8 space-x-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {Object.keys(demoContent).map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`btn ${selectedRole === role ? 'btn-success' : 'btn-outline'}`}
            >
              {demoContent[role].title}
            </button>
          ))}
        </motion.div>

        {/* Animated Feature Card */}
        <motion.div
          className="bg-base-100 shadow-md rounded-lg p-6 mx-auto w-full max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {demoContent[selectedRole].title}
          </h3>
          <p className="text-gray-700 mb-4">{demoContent[selectedRole].description}</p>
          <h4 className="font-semibold text-gray-800">Features:</h4>
          {renderDemoFeatures(demoContent[selectedRole].features)}
          
          {/* Animated Button */}
          <motion.button 
            onClick={handleNavigation} 
            className="btn btn-success mt-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Go to {demoContent[selectedRole].title} Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default UserDemosSection;
