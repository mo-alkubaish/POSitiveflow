// simmilar to product file

import React, { useState } from 'react';

type Supplier = {
  name: string;
  email: string;
  phoneNumber: string;
};

type AddSupplierModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplier: Supplier) => void;
};

const AddSupplierModal: React.FC<AddSupplierModalProps> = ({ isOpen, onClose, onSave }) => {
  const [newSupplier, setNewSupplier] = useState<Supplier>({ name: '', email: '', phoneNumber: '(966) ' });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({ name: null, email: null, phoneNumber: null });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSupplier(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbers = e.target.value.replace(/[^\d]/g, '');
    let formatted = '';
    const hasPrefix = numbers.startsWith('966');
    if (!hasPrefix && numbers.length > 0) {
      formatted = '(966) ';
      const remainingDigits = numbers;
      if (remainingDigits.length > 0) {
        formatted += remainingDigits.slice(0, 3);
        if (remainingDigits.length > 3) {
          formatted += `-${remainingDigits.slice(3, 7)}`;
        }
      }
    } else {
      formatted = '(966) ';
      const remainingDigits = hasPrefix ? numbers.slice(3) : numbers;
      if (remainingDigits.length > 0) {
        formatted += remainingDigits.slice(0, 3);
        if (remainingDigits.length > 3) {
          formatted += `-${remainingDigits.slice(3, 7)}`;
        }
      }
    }
    setNewSupplier(prev => ({ ...prev, phoneNumber: formatted }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
    return email && emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\(966\) \d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateForm = () => {
    let errorObj = { name: null, email: null, phoneNumber: null };
    let isValid = true;

    if (newSupplier.name.trim() === '') {
      errorObj.name = 'Name is required';
      isValid = false;
    }
    if (!validateEmail(newSupplier.email)) {
      errorObj.email = 'Invalid email format';
      isValid = false;
    }
    if (!validatePhoneNumber(newSupplier.phoneNumber)) {
      errorObj.phoneNumber = 'Invalid phone number';
      isValid = false;
    }

    setErrors(errorObj);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(newSupplier);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-black">Add Supplier</h2>
        <div className="space-y-4">
          <InputField
            name="name"
            label="Name"
            value={newSupplier.name}
            onChange={handleInputChange}
            placeholder="Enter supplier's name"
            error={errors.name}
          />
          <InputField
            type="email"
            name="email"
            label="Email"
            value={newSupplier.email}
            onChange={handleInputChange}
            placeholder="Enter supplier's email"
            error={errors.email}
          />
          <InputField
            name="phoneNumber"
            label="Phone Number"
            value={newSupplier.phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="(966) 123-4567"
            error={errors.phoneNumber}
          />
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded">
              Cancel
            </button>
            <button onClick={handleSubmit} className="bg-black hover:bg-grey-700 text-white font-semibold py-2 px-4 rounded">
              Add Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplierModal;

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
