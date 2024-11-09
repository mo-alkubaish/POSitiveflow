/**
 * AddUserModal component displays a modal for adding a new user with fields for name, email, and role.
 * 
 * Props:
 * - `isOpen` (boolean): Controls whether the modal is visible.
 * - `onClose` (function): Callback to close the modal.
 * - `onSave` (function): Callback to save the new user data.
 * 
 * Features:
 * - Form Fields: Includes inputs for the user's name, email, and role, with real-time validation.
 * - Validation: Checks for required fields and ensures email format correctness; displays error messages for invalid inputs.
 * - Role Selection: Offers predefined roles in a dropdown, guiding the user to select an appropriate role.
 * - Submission: Upon successful validation, `onSave` is called with the new user data, and the modal is closed.
 * 
 * State Management:
 * - `newUser` (object): Tracks input values for the new user.
 * - `errors` (object): Tracks validation errors for each field.
 * 
 * The component provides a user-friendly interface for adding users to the system, with validation and feedback to enhance usability.
 */


import React, { useState } from 'react';

type User = {
  name: string;
  email: string;
  role: string;
};

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
};

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSave }) => {
  const [newUser, setNewUser] = useState<User>({ name: '', email: '', role: '' });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    if (!email || email.trim() === '') {
      return false;
    }
  
    // Check length
    if (email.length > 254) {
      return false
    }
  
    const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
  
    if (!emailRegex.test(email)) {
      return false
    }
    return true;
  };


  const handleSubmit = () => {
    let isValid = true;
    let errorObj = { name: '', email: '', role: '' };

    if (newUser.name === '') {
      isValid = false;
      errorObj.name = 'Name is required';
    }
    if (newUser.email === '' || !validateEmail(newUser.email)) {
      isValid = false;
      errorObj.email = newUser.email === '' ? 'Email is required' : 'Invalid email format';
    }
    if (newUser.role === '') {
      isValid = false;
      errorObj.role = 'Role is required';
    }

    setErrors(errorObj);

    if (isValid) {
      onSave(newUser);
      onClose(); // Close modal after saving user
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-black">Add User</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter user's name"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter user's email"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a role</option>
              <option value="Inventory Manager">Inventory Manager</option>
            <option value="Store Manager">Store Manager</option>
            <option value="Cashier">Cashier</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs italic">{errors.role}</p>}
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded">
              Cancel
            </button>
            <button onClick={handleSubmit} className="bg-black hover:bg-grey-700 text-white font-semibold py-2 px-4 rounded ">
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
