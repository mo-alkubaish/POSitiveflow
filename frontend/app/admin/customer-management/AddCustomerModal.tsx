/**
 * Defines a modal component for adding a customer. It manages form state, validates user input, and handles form submission.
 * The modal only renders when `isOpen` is true. It includes input fields for customer name, email, and phone number with validation.
 * Errors are displayed for each field if the validation fails upon submission.
 */


import React, { useState } from 'react';

type Customer = {
  name: string;
  email: string;
  phoneNumber: string;
};

type AddCustomerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void;
};

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose, onSave }) => {
  const [newCustomer, setNewCustomer] = useState<Customer>({ name: '', email: '', phoneNumber: '' });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({ name: null, email: null, phoneNumber: null });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\(966\) \d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
  };
  

  const validateForm = () => {
    let errorObj = { name: null, email: null, phoneNumber: null };
    let isValid = true;

    if (newCustomer.name.trim() === '') {
      errorObj.name = 'Name is required';
      isValid = false;
    }
    if (!validateEmail(newCustomer.email)) {
      errorObj.email = 'Invalid email format';
      isValid = false;
    }
    if (!validatePhoneNumber(newCustomer.phoneNumber)) {
      errorObj.phoneNumber = 'Invalid phone number';
      isValid = false;
    }

    setErrors(errorObj);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(newCustomer);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-black">Add Customer</h2>
        <div className="space-y-4">
          <InputField
            name="name"
            label="Name"
            value={newCustomer.name}
            onChange={handleInputChange}
            placeholder="Enter customer's name"
            error={errors.name}
          />
          <InputField
            type="email"
            name="email"
            label="Email"
            value={newCustomer.email}
            onChange={handleInputChange}
            placeholder="Enter customer's email"
            error={errors.email}
          />
          <InputField
            name="phoneNumber"
            label="Phone Number"
            value={newCustomer.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            error={errors.phoneNumber}
          />
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded">
              Cancel
            </button>
            <button onClick={handleSubmit} className="bg-black hover:bg-grey-700 text-white font-semibold py-2 px-4 rounded">
              Add Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;

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
