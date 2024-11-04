"use client";
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import searchCustomers from "./searchCustomers";
import customersData from "../data/customers.json";
import usePagination from "./usePagination";
import { motion } from 'framer-motion';
import EditModal from './EditModal'; 
import DeleteConfirmationModal from './DeleteConfirmationModal'; 

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState(customersData);
  const [editableCustomer, setEditableCustomer] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = searchCustomers(customers, searchTerm);
  const { currentPage, totalPages, changePage, indexOfFirstItem, indexOfLastItem } = usePagination(filteredCustomers.length, 8);
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const handleEditClick = (customer) => {
    setEditableCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedCustomer) => {
    const updatedCustomers = customers.map(customer => {
      if (customer.email === editableCustomer.email) {
        return {...customer, ...updatedCustomer};
      }
      return customer;
    });
    setCustomers(updatedCustomers);
    setIsEditModalOpen(false);
  };
  

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setEditableCustomer(null); // Optionally reset the editable customer
  };
  

  const handleDeleteConfirm = () => {
    const updatedCustomers = customers.filter(c => c.email !== selectedCustomer.email);
    setCustomers(updatedCustomers);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-black">All Customers</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-full max-w-xs pl-10 bg-gray-50 text-black placeholder-gray-400"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn btn-outline text-black bg-gray-50 border-gray-300 hover:bg-gray-100">Add Customer</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-4 rounded-l-lg">Customer Name</th>
                  <th className="py-2 px-4">Loyalty Points</th>
                  <th className="py-2 px-4">Phone Number</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Last Purchase</th>
                  <th className="py-2 px-4 rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((customer, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="bg-white hover:bg-gray-50 shadow-sm rounded-lg"
                  >
                    <td className="py-3 px-4 text-black">{customer.name}</td>
                    <td className="py-3 px-4 text-black">{customer.loyaltyPoints}</td>
                    <td className="py-3 px-4 text-black">{customer.phone}</td>
                    <td className="py-3 px-4 text-black">{customer.email}</td>
                    <td className="py-3 px-4 text-black">{customer.lastPurchase}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button className="text-gray-500 hover:text-gray-700" onClick={() => handleEditClick(customer)}>Edit</button>
                      <button className="text-gray-500 hover:text-gray-700" onClick={() => handleDeleteClick(customer)}>Delete</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <EditModal
            isOpen={isEditModalOpen}
            customer={editableCustomer}
            onSave={handleSaveChanges}
            onCancel={handleCancel}
          />

          <DeleteConfirmationModal
            isOpen={isModalOpen}
            onCancel={handleCancel}
            onConfirm={handleDeleteConfirm}
          />

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
            <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} customers</span>
            <div className="flex items-center space-x-2">
              <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} className="btn btn-sm bg-gray-100 text-gray-600 hover:bg-gray-200 w-8 h-8 rounded-md">{"←"}</button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => changePage(i + 1)}
                  className={`btn btn-sm w-8 h-8 rounded-md ${currentPage === i + 1 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-sm bg-gray-100 text-gray-600 hover:bg-gray-200 w-8 h-8 rounded-md">{"→"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
