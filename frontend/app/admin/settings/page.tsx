/**
 * Settings component provides a configuration interface for store settings in the application.
 * 
 * Features:
 * - Displays a form (`SettingsForm`) to update settings such as store name, currency, tax rate, stock threshold, and feature toggles for WhatsApp receipts and loyalty points.
 * - Includes a `BackupSection` to manage data backup functionalities.
 * 
 * State Management:
 * - Uses React state to manage settings values, which are passed down to `SettingsForm` for real-time updates.
 * 
 * Animations:
 * - Framer Motion is used to apply a fade-in effect to the settings container for a smooth user experience.
 * 
 * This component provides an organized interface for managing store-level configurations in POSitiveFlow.
 */

// Settings.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import SettingsForm from "./settingsForm";
import BackupSection from "./backupSection";
import SettingsSkeletonLoading from "./SettingsSkeletonLoading";

const Settings = () => {
  const [storeName, setStoreName] = useState("Ajjad Bakery");
  const [currency, setCurrency] = useState("SAR");
  const [defaultTaxRate, setDefaultTaxRate] = useState(15);
  const [stockThreshold, setStockThreshold] = useState(25);
  const [whatsappReceipts, setWhatsappReceipts] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.0, duration: 0.3 } }
  };

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      // Assume data is fetched and set here
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="container mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isLoading ? (
        <SettingsSkeletonLoading />
      ) : (
        <>
          {/* Settings Form */}
          <SettingsForm
            storeName={storeName}
            setStoreName={setStoreName}
            currency={currency}
            setCurrency={setCurrency}
            defaultTaxRate={defaultTaxRate}
            setDefaultTaxRate={setDefaultTaxRate}
            stockThreshold={stockThreshold}
            setStockThreshold={setStockThreshold}
            whatsappReceipts={whatsappReceipts}
            setWhatsappReceipts={setWhatsappReceipts}
            loyaltyPoints={loyaltyPoints}
            setLoyaltyPoints={setLoyaltyPoints}
          />

          {/* Backup Section */}
          <BackupSection />
        </>
      )}
    </motion.div>
  );
};

export default Settings;
