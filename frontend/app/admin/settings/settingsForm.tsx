/**
 * SettingsForm component provides an interface for updating store settings, such as store name, currency, tax rate, and stock threshold.
 * 
 * Features:
 * - Store Details: Allows input for store name and currency selection.
 * - Tax and Stock Settings: Fields for specifying the default tax rate and low stock alert threshold.
 * - Additional Options: Toggles for enabling WhatsApp receipts and loyalty points.
 * 
 * Snackbar Notification:
 * - Displays a temporary confirmation message upon saving changes, with a fading animation and progress bar to indicate duration.
 * - Progress is managed by a timer in `useEffect`, which reduces the progress bar width over time.
 * 
 * State Management:
 * - Various states manage form inputs, while a `showSnackbar` function triggers the snackbar display.
 * - Settings values are controlled by props, enabling updates in real-time as users interact with the form.
 * 
 * This component ensures a user-friendly experience for configuring store settings, providing immediate feedback for saved changes.
 */


import React, { useState, useEffect } from "react";

const SettingsForm = ({
  storeName,
  setStoreName,
  currency,
  setCurrency,
  defaultTaxRate,
  setDefaultTaxRate,
  stockThreshold,
  setStockThreshold,
  whatsappReceipts,
  setWhatsappReceipts,
  loyaltyPoints,
  setLoyaltyPoints,
}) => {
  const [snackbar, setSnackbar] = useState({ show: false, message: '' });
  const [progress, setProgress] = useState(100); 
  const [animate, setAnimate] = useState('');

  const showSnackbar = (message) => {
    setSnackbar({ show: true, message });
    setProgress(100);
    setAnimate('animate-fade-in');

    setTimeout(() => {
      setAnimate('animate-fade-out');
      setTimeout(() => {
        setSnackbar({ show: false, message: '' });
        setAnimate(''); 
      }, 500); 
    }, 3000);
  };

  useEffect(() => {
    if (snackbar.show) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 1, 0)); 
      }, 30);

      return () => clearInterval(interval);
    }
  }, [snackbar.show]);

  const handleSaveChanges = () => {
    showSnackbar('Changes Saved Successfully!');
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Store Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Store Name
          </label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="input input-bordered w-full mb-4"
            style={{ color: "black" }}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="select select-bordered w-full mb-4 text-black"
          >
            <option value="SAR">SAR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>
        </div>

        {/* Tax and Stock Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Tax Rate (%)
          </label>
          <input
            type="number"
            value={defaultTaxRate}
            onChange={(e) => setDefaultTaxRate(parseInt(e.target.value) || 0)}
            className="input input-bordered w-full mb-4"
            style={{ color: "black" }}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Low Stock Alert Threshold
          </label>
          <input
            type="number"
            value={stockThreshold}
            onChange={(e) => setStockThreshold(parseInt(e.target.value) || 0)}
            className="input input-bordered w-full"
            style={{ color: "black" }}
          />
        </div>
      </div>

      {/* Options */}
      <div className="flex items-center justify-between mt-1">
        <div className="form-control space-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Options
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={whatsappReceipts}
              onChange={(e) => setWhatsappReceipts(e.target.checked)}
              className="checkbox"
            />
            <span className="label-text">Enable WhatsApp receipts</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={loyaltyPoints}
              onChange={(e) => setLoyaltyPoints(e.target.checked)}
              className="checkbox"
            />
            <span className="label-text">Enable loyalty points</span>
          </div>
        </div>

        <button className="btn bg-black text-white" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>

      {/* Snackbar with animation */}
      {snackbar.show && (
        <div
          className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 px-6 py-3 bg-black text-white rounded w-80 ${animate}`}
        >
          {snackbar.message}
          <div
            className="h-1 bg-green-500 mt-2"
            style={{ width: `${progress}%`, transition: "width 0.03s linear" }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SettingsForm;
