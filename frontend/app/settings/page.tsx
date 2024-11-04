"use client";

import React, { useState } from "react";
import { motion } from 'framer-motion';
import Navbar from "../components/Navbar";
import SettingsForm from "./settingsForm";
import BackupSection from "./BackupSection";

const Settings = () => {
  const [storeName, setStoreName] = useState("Ajjad Bakery");
  const [currency, setCurrency] = useState("SAR");
  const [defaultTaxRate, setDefaultTaxRate] = useState(15);
  const [stockThreshold, setStockThreshold] = useState(25);
  const [whatsappReceipts, setWhatsappReceipts] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.0, duration: 0.5 } }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <motion.div
        className="container mx-auto p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
      </motion.div>
    </div>
  );
};

export default Settings;
