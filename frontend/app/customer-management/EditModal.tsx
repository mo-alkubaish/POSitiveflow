/**
 * EditModal manages the editing of a customer's information within a modal dialog. It pre-fills form fields with the customer's
 * existing data, allows for changes, and validates the phone number format. The modal appears based on the 'isOpen' prop and
 * can be dismissed with no changes or saved with updated data.
 */


import React, { useState, useEffect } from 'react';

function EditModal({ isOpen, customer, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        phone: customer.phone || '',
        email: customer.email || ''
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null })); 
    }
  };

  const validateForm = () => {
    const { phone } = formData;
    const errors = {};
    const phoneRegex = /^(\+?1)?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    if (!phoneRegex.test(phone)) {
      errors.phone = 'Invalid phone number format';
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
        <h2 className="text-xl font-bold mb-6 text-black">Edit Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter customer's name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="(966) 555-5555"
            />
            {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter customer's email"
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
