/**
 * AddProductModal provides a modal form for adding new products to the inventory.
 *
 * Features:
 * - Form Input: Collects information such as name, SKU, price, category, stock level, and image URL.
 * - Validation: Ensures that all required fields are filled and that the inputs for price and stock are numbers.
 * - Error Handling: Displays error messages beneath inputs if validation fails.
 * - Dynamic Feedback: Updates the form state and error messages in real time as the user types.
 *
 * Props:
 * - `isOpen`: Boolean that controls the visibility of the modal.
 * - `onClose`: Function to be called to close the modal.
 * - `onSave`: Function that is called to save the new product once validation passes.
 *
 * State:
 * - `newProduct`: Holds the current state of the product being entered.
 * - `errors`: Contains any error messages for form fields to be displayed to the user.
 *
 * Child Components:
 * - `InputField`: A reusable input component used for gathering product information. It accepts props for customization and validation.
 *
 * This modal is designed to provide a user-friendly interface for entering new product data, ensuring data integrity with comprehensive validation.
 */


import React, { useState } from 'react';

type Product = {
  name: string;
  sku: string;
  price: string;
  category: string;
  stock: string;
  image: string;
};

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
};

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave }) => {
  const [newProduct, setNewProduct] = useState<Product>({ name: '', sku: '', price: '', category: '', stock: '', image: '' });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({ name: null, sku: null, price: null, category: null, stock: null, image: null });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errorObj = { name: null, sku: null, price: null, category: null, stock: null, image: null };
    let isValid = true;

    // Validate each field as needed
    if (newProduct.name.trim() === '') {
      errorObj.name = 'Product name is required';
      isValid = false;
    }
    if (newProduct.sku.trim() === '') {
      errorObj.sku = 'SKU is required';
      isValid = false;
    }
    if (!newProduct.price || isNaN(parseFloat(newProduct.price))) {
      errorObj.price = 'Valid price is required';
      isValid = false;
    }
    if (newProduct.category.trim() === '') {
      errorObj.category = 'Category is required';
      isValid = false;
    }
    if (!newProduct.stock || isNaN(parseInt(newProduct.stock))) {
      errorObj.stock = 'Valid stock number is required';
      isValid = false;
    }

    setErrors(errorObj);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(newProduct);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-black">Add Product</h2>
        <div className="space-y-4">
          <InputField
            name="name"
            label="Name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            error={errors.name}
          />
          <InputField
            name="sku"
            label="SKU"
            value={newProduct.sku}
            onChange={handleInputChange}
            placeholder="Enter SKU"
            error={errors.sku}
          />
          <InputField
            type="text"
            name="price"
            label="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            error={errors.price}
          />
          <InputField
            name="category"
            label="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Enter category"
            error={errors.category}
          />
          <InputField
            type="number"
            name="stock"
            label="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Enter stock quantity"
            error={errors.stock}
          />
          <InputField
            name="image"
            label="Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
            placeholder="Enter image URL (optional)"
            error={errors.image}
          />
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded">
              Cancel
            </button>
            <button onClick={handleSubmit} className="bg-black hover:bg-grey-700 text-white font-semibold py-2 px-4 rounded">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;

const InputField = ({ name, label, value, onChange, placeholder, type = "text", error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder={placeholder}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={`${name}-error`}
    />
    {error && <p id={`${name}-error`} className="text-red-500 text-xs italic">{error}</p>}
  </div>
);
