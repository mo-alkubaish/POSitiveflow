"use client";
import React, { useState } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import searchProducts from "./searchProducts";
import productsData from "../../data/products.json";
import usePagination from "./usePagination";
import { motion } from 'framer-motion';
import EditModal from './EditModal'; 
import DeleteConfirmationModal from './DeleteConfirmationModal'; 
import AddProductModal from './AddProductModal'; // Ensure you have this component similar to AddCustomerModal

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(productsData);
  const [editableProduct, setEditableProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add state for opening add modal

  const filteredProducts = searchProducts(products, searchTerm);
  const { currentPage, totalPages, changePage, indexOfFirstItem, indexOfLastItem } = usePagination(filteredProducts.length, 8);
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleEditClick = (product) => {
    setEditableProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedProduct) => {
    const updatedProducts = products.map(product => {
      if (product.id === editableProduct.id) {
        return {...product, ...updatedProduct};
      }
      return product;
    });
    setProducts(updatedProducts);
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = (product) => {
    setEditableProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false); // Close add modal
    setEditableProduct(null);
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]); // Add new product to the list
    setIsAddModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    const updatedProducts = products.filter(p => p.id !== editableProduct.id);
    setProducts(updatedProducts);
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-black">All Products</h1>
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
            <button className="btn btn-outline text-black bg-gray-50 border-gray-300 hover:bg-gray-100" onClick={() => setIsAddModalOpen(true)}>Add Product</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 rounded-l-lg">Name</th>
                <th className="py-2 px-4">SKU</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Stock</th>
                <th className="py-2 px-4 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((product, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-50 shadow-sm rounded-lg">
                    <td className="py-3 px-4 text-black">{product.name}</td>
                    <td className="py-3 px-4 text-black">{product.sku}</td>
                    <td className="py-3 px-4 text-black">{product.price}</td>
                    <td className="py-3 px-4 text-black">{product.stock}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button className="text-gray-500 hover:text-gray-700" onClick={() => handleEditClick(product)}>Edit</button>
                      <button className="text-gray-500 hover:text-gray-700" onClick={() => handleDeleteClick(product)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-xl font-bold py-8 text-black">
                    No Products found...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <EditModal
          isOpen={isEditModalOpen}
          product={editableProduct}
          onSave={handleSaveChanges}
          onCancel={handleCancel}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onCancel={handleCancel}
          onConfirm={handleDeleteConfirm}
        />

        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={handleCancel}
          onSave={handleAddProduct}
        />

        <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
          <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products</span>
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
    </motion.div>
  );
};

export default ProductManagement;
