"use client";
import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import searchSuppliers from "./searchSuppliers";
import suppliersData from "../../data/suppliers.json";
import usePagination from "./usePagination";
import { motion } from 'framer-motion';
import EditSupplierModal from './EditSupplierModal'; 
import DeleteSupplierModal from './DeleteSupplierModal'; 
import AddSupplierModal from './AddSupplierModal';
import TableSkeleton from './TableSkeleton'; // Import the skeleton component

const SupplierManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [editableSupplier, setEditableSupplier] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setSuppliers(suppliersData);
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const filteredSuppliers = searchSuppliers(suppliers, searchTerm);
  const { currentPage, totalPages, changePage, indexOfFirstItem, indexOfLastItem } = usePagination(filteredSuppliers.length, 8);
  const currentItems = filteredSuppliers.slice(indexOfFirstItem, indexOfLastItem);

  const handleEditClick = (supplier) => {
    setEditableSupplier(supplier);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedSupplier) => {
    const updatedSuppliers = suppliers.map(supplier => {
      if (supplier.email === editableSupplier.email) {
        return {...supplier, ...updatedSupplier};
      }
      return supplier;
    });
    setSuppliers(updatedSuppliers);
    setIsEditModalOpen(false);
  };
  
  const handleAddSupplier = (newSupplier) => {
    setSuppliers([...suppliers, newSupplier]);
    setIsAddModalOpen(false);
  };

  const handleDeleteClick = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteModalOpen(true);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
    setEditableSupplier(null); 
  };
  
  const handleDeleteConfirm = () => {
    const updatedSuppliers = suppliers.filter(s => s.email !== selectedSupplier.email);
    setSuppliers(updatedSuppliers);
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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <>
         <div className="flex flex-col md:flex-row items-center justify-between mb-4">
    <h1 className="text-xl md:text-2xl font-bold text-black">All Suppliers</h1>
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
        <button className="btn btn-outline w-full md:w-auto text-black bg-gray-50 border-gray-300 hover:bg-gray-100" onClick={() => setIsAddModalOpen(true)}>Add Supplier</button>
    </div>
</div>


              <div className="overflow-x-auto">
                <table className="table w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="py-2 px-4 rounded-l-lg">Supplier Name</th>
                      <th className="py-2 px-4">Phone Number</th>
                      <th className="py-2 px-4">Email</th>
                      <th className="py-2 px-4 rounded-r-lg text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((supplier, index) => (
                        <tr key={index} className="bg-white hover:bg-gray-50 shadow-sm rounded-lg">
                          <td className="py-3 px-4 text-black">{supplier.name}</td>
                          <td className="py-3 px-4 text-black">{supplier.phone}</td>
                          <td className="py-3 px-4 text-black">{supplier.email}</td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleEditClick(supplier)}>Edit</button>
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleDeleteClick(supplier)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center text-xl font-bold py-8 text-black">
                          No Suppliers found...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <EditSupplierModal
                isOpen={isEditModalOpen}
                supplier={editableSupplier}
                onSave={handleSaveChanges}
                onCancel={handleCancel}
              />

              <DeleteSupplierModal
                isOpen={isDeleteModalOpen}
                onCancel={handleCancel}
                onConfirm={handleDeleteConfirm}
              />

              <AddSupplierModal
                isOpen={isAddModalOpen}
                onClose={handleCancel}
                onSave={handleAddSupplier}
              />

              <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
                <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSuppliers.length)} of {filteredSuppliers.length} suppliers</span>
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

export default SupplierManagement;
