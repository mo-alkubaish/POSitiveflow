"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";

type Discount = {
  name: string;
  type: string;
  value: string;
  startDate: string;
  endDate: string;
  status: string;
};

import discountsData from "../data/discounts.json";
const discounts: Discount[] = discountsData as Discount[];

const Discounts = () => {
  const [discountName, setDiscountName] = useState('');
  const [discountType, setDiscountType] = useState('Percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [applyTo, setApplyTo] = useState('All items');

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-black mb-4">Active Discounts</h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="text-black">
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount, index) => (
                  <tr key={index} className="text-black">
                    <td>{discount.name}</td>
                    <td>{discount.type}</td>
                    <td>{discount.value}</td>
                    <td>{discount.startDate}</td>
                    <td>{discount.endDate}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-white ${discount.status === "Active" ? "bg-green-500" : discount.status === "Scheduled" ? "bg-yellow-500" : "bg-red-500"}`}>
                        {discount.status}
                      </span>
                    </td>
                    <td>
                      <button style={{ marginRight: '8px' }} className="text-gray-600 hover:text-gray-800 focus:outline-none">Edit</button>
                      <button className="text-gray-600 hover:text-gray-800 focus:outline-none">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold text-black mb-4">Create New Discount</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Discount Name"
              className="input input-bordered w-full border-gray-300 bg-gray-50 text-black placeholder-gray-400"
              value={discountName}
              onChange={e => setDiscountName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Discount Value"
              className="input input-bordered w-full border-gray-300 bg-gray-50 text-black placeholder-gray-400"
              value={discountValue}
              onChange={e => setDiscountValue(e.target.value)}
            />
            <select
              className="select select-bordered w-full border-gray-300 bg-gray-50 text-black"
              value={applyTo}
              onChange={e => setApplyTo(e.target.value)}
            >
              <option>All items</option>
              <option>Specific items</option>
            </select>
            <select
              className="select select-bordered w-full border-gray-300 bg-gray-50 text-black"
              value={discountType}
              onChange={e => setDiscountType(e.target.value)}
            >
              <option value="Percentage">Percentage</option>
              <option value="Fixed Amount">Fixed Amount</option>
            </select>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                id="startDate"
                type="date"
                className="input input-bordered w-full border-gray-300 bg-gray-50 text-black"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                id="endDate"
                type="date"
                className="input input-bordered w-full border-gray-300 bg-gray-50 text-black"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>
          
          {/* Button aligned to the right */}
          <div className="flex justify-end">
            <button className="btn bg-black text-white">Create Discount</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
