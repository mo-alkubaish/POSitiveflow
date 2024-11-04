// EditModal.tsx
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

  useEffect(() => {
    if (user) {
      setEditUser({...user}); // Copy the user to a new object to avoid direct mutations
    }
  }, [user]);

  if (!isOpen || !editUser) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditUser(prev => ({
      ...prev!,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <h2 className="text-lg font-semibold">Edit User</h2>
        <input
          name="name"
          type="text"
          value={editUser.name}
          onChange={handleChange}
          className="input input-bordered w-full mb-2"
        />
        <input
          name="email"
          type="email"
          value={editUser.email}
          onChange={handleChange}
          className="input input-bordered w-full mb-2"
        />
        <select
          name="role"
          value={editUser.role}
          onChange={handleChange}
          className="select select-bordered w-full mb-2"
        >
          <option value="Inventory Manager">Inventory Manager</option>
          <option value="Sales Manager">Sales Manager</option>
          <option value="HR">HR</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="btn">Cancel</button>
          <button onClick={() => editUser && onSave(editUser)} className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
