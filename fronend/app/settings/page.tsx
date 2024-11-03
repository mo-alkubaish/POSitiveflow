"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";

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
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Automated Backup Status Section */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-black mb-4">
            Automated Backup Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Last Successful Backup</p>
              <p className="text-xl font-semibold text-black">
                2025-03-15 14:30:22
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Next Scheduled Backup</p>
              <p className="text-xl font-semibold text-black">
                2025-03-16 02:00:00
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Backup Status</p>
              <p className="text-xl font-semibold text-black">Healthy</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-black mb-2">Backup Details</h3>
          <table className="table w-full border-separate border-spacing-y-2 mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Date</th>
                <th className="px-4 py-2 text-left font-semibold">Time</th>
                <th className="px-4 py-2 text-left font-semibold">Size</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 text-black">2024-03-14</td>
                <td className="px-4 py-2 text-black">14:30:22</td>
                <td className="px-4 py-2 text-black">1.2 GB</td>
                <td className="px-4 py-2 text-green-500">Successful</td>
                <td className="px-4 py-2 text-blue-500 hover:underline cursor-pointer">
                  Download
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 text-black">2024-03-15</td>
                <td className="px-4 py-2 text-black">14:30:18</td>
                <td className="px-4 py-2 text-black">1.1 GB</td>
                <td className="px-4 py-2 text-red-500">Failed</td>
                <td className="px-4 py-2 text-blue-500 hover:underline cursor-pointer">
                  Upload
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-bold text-black mb-2">Backup Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Backup Frequency
              </label>
              <select className="select select-bordered w-full text-black">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Backup Time
              </label>
              <input
                type="time"
                defaultValue="02:00"
                className="input input-bordered w-full text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Retention Period (days)
              </label>
              <input
                type="number"
                defaultValue={30}
                className="input input-bordered w-full text-black"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="btn bg-black text-white">Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
