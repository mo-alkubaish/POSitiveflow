"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SettingsForm from "./settingsForm";
import BackupSection from "./backupSection";

const Settings = () => {
  const [storeName, setStoreName] = useState("Ajjad Bakery");
  const [currency, setCurrency] = useState("SAR");
  const [defaultTaxRate, setDefaultTaxRate] = useState(15);
  const [stockThreshold, setStockThreshold] = useState(25);
  const [whatsappReceipts, setWhatsappReceipts] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="container mx-auto p-6">
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
      </div>
    </div>
  );
};

export default Settings;
