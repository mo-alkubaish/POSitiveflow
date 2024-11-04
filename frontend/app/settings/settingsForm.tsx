import React from "react";

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

        <button className="btn bg-black text-white">Save Changes</button>
      </div>
    </div>
  );
};

export default SettingsForm;
