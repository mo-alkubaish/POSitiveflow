"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

// Define the Supplier type
type Supplier = {
  name: string;
  email: string;
  phone: string;
};

// Import suppliers data and cast it to an array of Supplier
import suppliersData from "../data/suppliers.json";
const suppliers: Supplier[] = suppliersData as Supplier[];

const SupplierManagement = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-black">Supplier Management</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-full max-w-xs pl-10 bg-gray-50 text-black placeholder-gray-400"
                />
              </div>
              <button className="btn btn-outline text-black bg-gray-50 border-gray-300 hover:bg-gray-100">Add Supplier</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-4 rounded-l-lg">Supplier Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Phone Number</th>
                  <th className="py-2 px-4 rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier: Supplier, index: number) => (
                  <tr key={index} className="bg-white hover:bg-gray-50 shadow-sm rounded-lg">
                    <td className="py-3 px-4 text-black">{supplier.name}</td>
                    <td className="py-3 px-4 text-black">{supplier.email}</td>
                    <td className="py-3 px-4 text-black">{supplier.phone}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button className="text-gray-500 hover:text-gray-700">Edit</button>
                      <button className="text-gray-500 hover:text-gray-700">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
            <span>Showing data 1 to 8 of 80 Suppliers</span>
            <div className="join">
              <div className="flex justify-center items-center mt-6 space-x-2 text-gray-600">
                <button className="btn btn-sm bg-gray-100 text-gray-600 hover:bg-gray-200 w-8 h-8 rounded-md">{"←"}</button>
                <button className="btn btn-sm bg-gray-900 text-white border-2 border-green-500 w-8 h-8 rounded-md shadow-md">1</button>
                <button className="btn btn-sm bg-gray-100 text-gray-600 hover:bg-gray-200 w-8 h-8 rounded-md">2</button>
                <button className="btn btn-sm bg-gray-100 text-gray-600 hover:bg-gray-200 w-8 h-8 rounded-md">3</button>
                <button className="btn btn-sm bg-gray-100 text-gray-600 hover:bg-gray-200 w-8 h-8 rounded-md">4</button>
                <span className="px-3 text-gray-400">...</span>
                <button className="btn btn-sm bg-gray-100 text-gray-600 hover:bg-gray-200 w-8 h-8 rounded-md">10</button>
                <button className="btn btn-sm bg-gray-100 text-gray-600 hover:bg-gray-200 w-8 h-8 rounded-md">{"→"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierManagement;
