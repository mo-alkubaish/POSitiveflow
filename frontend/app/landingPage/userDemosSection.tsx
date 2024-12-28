/**
 * UserDemosSection component provides an interactive display of key features for different user roles in POSitiveFlow.
 * 
 * Features:
 * - Title and description introduce the section with animations.
 * - Role selection buttons allow users to toggle between different roles (e.g., Store Owner, Cashier).
 * - Each role displays a unique description and feature list relevant to that user type, rendered as an animated list.
 * - "Go to Demo" button navigates to the relevant page for the selected role.
 * 
 * Animations:
 * - Framer Motion animations add smooth transitions to the title, description, role buttons, feature list, and navigation button.
 * 
 * Props:
 * - `toggleTheme` (function): Callback to switch between light and dark themes.
 * - `toggleLanguage` (function): Callback to change the language.
 *
 * State:
 * - `selectedRole` (string): Tracks the currently selected user role to display the corresponding features.
 *
 * This section is designed to offer users a preview of role-specific features, enhancing understanding of the platform's versatility.
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const demoContent = {
  storeOwner: {
    title: "Store Owner/Manager",
    description: "Manage users, configure settings, and access comprehensive sales and inventory reports.",
    features: ["User Management", "Reports", "Settings"],
    link: "/admin/dashboard"
  },
  cashier: {
    title: "Cashier",
    description: "Quick access to sales forms, payment processing, and receipt generation via WhatsApp.",
    features: ["Sales Processing", "Digital Receipts", "Draft Orders"],
    link: "/cashier/items"
  },
  inventoryManager: {
    title: "Inventory Manager",
    description: "Manage products, suppliers, and receive notifications on low stock.",
    features: ["Inventory Management", "Supplier Tracking", "Barcode Generation"],
    link: "/inventory"
  },
  customer: {
    title: "Customer",
    description: "Access receipts, view purchase history, and participate in loyalty programs.",
    features: ["Receipts", "Loyalty Program", "Purchase History"],
    link: "/customer/store"
  },
};

const UserDemosSection = () => {
  const [selectedRole, setSelectedRole] = useState("storeOwner");
  const router = useRouter();

  const renderDemoFeatures = (features) => (
    <ul className="list-disc pl-4 text-left">
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
      <div className="container mx-auto px-4 sm:px-6 text-center">
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
          className="flex justify-center flex-wrap mb-8 gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {Object.keys(demoContent).map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`btn ${selectedRole === role ? 'btn-success' : 'btn-outline'} px-2 py-1 text-sm sm:text-base`}
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
