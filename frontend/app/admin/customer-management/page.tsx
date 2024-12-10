/**
 * CustomerManagement component provides an interface for managing customer records. It includes:
 * - Search functionality to filter customers by name or other attributes.
 * - Pagination to manage large lists of customers.
 * - Modals for adding, editing, and deleting customers with validation and confirmation.
 * - Action buttons for each customer entry, enabling editing or deletion.
 * 
 * This component leverages useState for state management, Framer Motion for animations, and custom hooks for pagination.
 */

"use client";
import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import searchCustomers from "./searchCustomers";
import customersData from "../../data/customers.json";
import usePagination from "./usePagination";
import { motion } from 'framer-motion';
import EditModal from './EditModal'; 
import DeleteConfirmationModal from './DeleteConfirmationModal'; 
import AddCustomerModal from './AddCustomerModal';
import TableSkeleton from '@/app/inventory/suppliers/TableSkeleton';

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [editableCustomer, setEditableCustomer] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setCustomers(customersData);
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

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
  
  const handleAddCustomer = (newCustomer) => {
    const customerWithDefaults = {
      ...newCustomer,
      loyaltyPoints: newCustomer.loyaltyPoints || 0,
      phone: newCustomer.phoneNumber === '' ? 'N/A' : newCustomer.phoneNumber,
      lastPurchase: newCustomer.lastPurchase || 'No purchases'
    };    
    setCustomers([...customers, customerWithDefaults]);
    setIsAddModalOpen(false);
  };

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
    setEditableCustomer(null); 
  };
  
  const handleDeleteConfirm = () => {
    const updatedCustomers = customers.filter(c => c.email !== selectedCustomer.email);
    setCustomers(updatedCustomers);
    setIsDeleteModalOpen(false);
  };

  const tableVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
      <motion.div
        className="container mx-auto p-6"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={tableVariants}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="bg-white shadow-lg rounded-xl p-6">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                  <h1 className="text-xl md:text-2xl font-bold text-black">All Customers</h1>
                  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-0 md:space-x-4 mt-4 md:mt-0">
                      <div className="relative w-full md:max-w-xs">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                          </span>
                          <input
                              type="text"
                              placeholder="Search"
                              className="input input-bordered w-full pl-10 bg-gray-50 text-black placeholder-gray-400"
                              value={searchTerm}
                              onChange={e => setSearchTerm(e.target.value)}
                          />
                      </div>
                      <button className="btn btn-outline w-full md:w-auto text-black bg-gray-50 border-gray-300 hover:bg-gray-100" onClick={() => setIsAddModalOpen(true)}>Add Customer</button>
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
                    {currentItems.length > 0 ? (
                      currentItems.map((customer, index) => (
                        <tr key={index} className="bg-white hover:bg-gray-50 shadow-sm rounded-lg">
                          <td className="py-3 px-4 text-black">{customer.name}</td>
                          <td className="py-3 px-4 text-black">{customer.loyaltyPoints}</td>
                          <td className="py-3 px-4 text-black">{customer.phone}</td>
                          <td className="py-3 px-4 text-black">{customer.email}</td>
                          <td className="py-3 px-4 text-black">{customer.lastPurchase}</td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleEditClick(customer)}>Edit</button>
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleDeleteClick(customer)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center text-xl font-bold py-8 text-black">
                          No Customers found...
                        </td>
                      </tr>
                    )}
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
                isOpen={isDeleteModalOpen}
                onCancel={handleCancel}
                onConfirm={handleDeleteConfirm}
              />

              <AddCustomerModal
                isOpen={isAddModalOpen}
                onClose={handleCancel}
                onSave={handleAddCustomer}
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
            </>
          )}
        </div>
      </motion.div>
  );
};

export default CustomerManagement;
