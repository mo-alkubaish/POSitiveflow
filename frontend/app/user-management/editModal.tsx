/**
 * EditModal component allows users to edit existing user details, including name and role.
 * 
 * Props:
 * - `user` (User | null): The user to be edited; populates the form fields.
 * - `isOpen` (boolean): Controls the visibility of the modal.
 * - `onClose` (function): Callback to close the modal without saving.
 * - `onSave` (function): Callback to save the updated user information.
 * 
 * Features:
 * - Form Fields: Input fields for name (editable), email (read-only), and role (selectable dropdown).
 * - Validation: Ensures that the name field is not empty before submission; displays error messages if validation fails.
 * 
 * State Management:
 * - `editUser` (User | null): Local state to store the editable user details, initialized from the `user` prop.
 * - `errors` (object): Stores validation error messages for form fields.
 * 
 * The modal provides a user-friendly interface for updating user information, with real-time validation and error feedback.
 */


import React, { useState, useEffect } from 'react';

export type User = {
  name: string;
  email: string;
  role: string;
};

type Props = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
};

const EditModal: React.FC<Props> = ({ user, isOpen, onClose, onSave }) => {
  const [editUser, setEditUser] = useState<User | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    if (user) {
      setEditUser({ ...user });
      setErrors({ name: null, email: null, role: null }); 
    }
  }, [user]);

  if (!isOpen || !editUser) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditUser(prev => ({
      ...prev!,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null })); 
    }
  };

  const handleSubmit = () => {
    if (!editUser) return;
    const { name } = editUser;
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Name cannot be empty';
    }
    if (Object.keys(newErrors).length === 0) {
      onSave(editUser);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-6 text-black">Edit User</h2>
        <div className="space-y-4">
          <input
            name="name"
            type="text"
            value={editUser.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter user's name"
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          <input
            name="email"
            type="email"
            value={editUser.email}
            onChange={handleChange}
            disabled 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter user's email"
          />
          <select
            name="role"
            value={editUser.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Inventory Manager">Inventory Manager</option>
            <option value="Store Manager">Store Manager</option>
            <option value="Cashier">Cashier</option>
          </select>
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded">
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} className="bg-black hover:bg-grey-700 text-white font-semibold py-2 px-4 rounded">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
