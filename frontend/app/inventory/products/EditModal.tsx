/**
 * EditModal provides an interface for editing the details of a product. It presents a form within a modal,
 * allowing users to update fields such as name, SKU, price, category, stock, and image URL.
 *
 * Features:
 * - Form Inputs: Allows editing of product details with validation for price and stock to ensure data integrity.
 * - Dynamic Form Handling: Populates form fields with existing product data when the modal opens, providing a seamless editing experience.
 * - Validation: Validates form data to ensure that price and stock inputs are numerical and not empty where required.
 * - Error Display: Shows error messages under fields where validation fails, aiding users in correcting their entries.
 *
 * Props:
 * - `isOpen`: Boolean indicating whether the modal is visible.
 * - `product`: The product object containing existing values for the form fields.
 * - `onSave`: Function to be called with the updated product data on form submission.
 * - `onCancel`: Function to be called to close the modal without saving changes.
 *
 * Behavior:
 * - The modal appears based on the `isOpen` prop and can be closed via the `onCancel` function.
 * - Upon submission, the form is validated and errors are set and displayed if validation fails. If the form is valid, `onSave` is invoked with the updated data.
 *
 * Example Usage:
 * ```jsx
 * <EditModal
 *   isOpen={showEditModal}
 *   product={selectedProduct}
 *   onSave={handleProductUpdate}
 *   onCancel={closeModal}
 * />
 * ```
 *
 * This modal is designed to facilitate quick updates to product information with minimal disruption to the workflow,
 * ensuring data is valid and providing users with immediate feedback on any errors.
 */


import React, { useState, useEffect } from 'react';

function EditModal({ isOpen, product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        price: product.price || '',
        category: product.category || '',
        stock: product.stock.toString() || '',
        image: product.image || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (isNaN(formData.price)) {
      errors.price = 'Price must be a valid number';
    }
    if (isNaN(formData.stock)) {
      errors.stock = 'Stock must be a valid number';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-6 text-black">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter SKU"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter price"
            />
            {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter category"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter stock quantity"
            />
            {errors.stock && <p className="text-red-500 text-xs italic">{errors.stock}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter image URL"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-black hover:bg-grey-700 text-white font-semibold py-2 px-4 rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
