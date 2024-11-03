"use client";

import React, { useState } from "react";
import { addCustomer } from "../customerService";
import Navbar from "@/app/components/Navbar";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const handleAddCustomer = () => {
    const newCustomer = {
      name,
      email,
      number,
      loyaltyPoints: 0, // Default value or could be calculated
      lastPurchase: 'N/A' // Default value or could be calculated
    };
    addCustomer(customers, setCustomers, newCustomer);
    // Reset form fields after adding
    setName('');
    setEmail('');
    setNumber('');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-black">All Customers</h1>
            <button className="btn btn-outline text-black bg-gray-50 border-gray-300 hover:bg-gray-100" onClick={handleAddCustomer}>Add Customer</button>
          </div>
          <div className="form">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full mb-4" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full mb-4" />
            <input type="text" placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} className="input input-bordered w-full mb-4" />
          </div>
          {/* Existing table and other UI components */}
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
