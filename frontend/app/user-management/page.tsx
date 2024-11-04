// UserManagement.tsx
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import searchUsers from "./searchUsers";
import usersData from "../data/users.json";
import usePagination from "./usePagination";
import { motion } from "framer-motion";
import EditModal, { User } from './editModal';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);  // State to manage edit modal visibility
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    localStorage.clear(); // Clears all localStorage data
    console.log('Local storage cleared on page reload.');
  }, []);

  const [users, setUsers] = useState(usersData);
  const filteredUsers = searchUsers(users, searchTerm);
  const { currentPage, totalPages, changePage, indexOfFirstItem, indexOfLastItem } = usePagination(filteredUsers.length, 8);
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedUsers = users.filter(user => user !== selectedUser);
    setUsers(updatedUsers);
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedUser) => {
    const updatedUsers = users.map(user => user.email === updatedUser.email ? updatedUser : user);
    setUsers(updatedUsers);
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-black">User Management</h1>
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn btn-outline text-black bg-gray-50 border-gray-300 hover:bg-gray-100">Add User</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-4 rounded-l-lg">User Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Role</th>
                  <th className="py-2 px-4 rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
  {currentItems.length > 0 ? (
    currentItems.map((user, index) => (
      <motion.tr
        key={index}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        className="bg-white hover:bg-gray-50 shadow-sm rounded-lg"
      >
        <td className="py-3 px-4 text-black">{user.name}</td>
        <td className="py-3 px-4 text-black">{user.email}</td>
        <td className="py-3 px-4 text-black">{user.role}</td>
        <td className="py-3 px-4 text-right space-x-2">
          <button className="text-gray-500 hover:text-gray-700" onClick={() => handleEditClick(user)}>Edit</button>
          <button className="text-gray-500 hover:text-gray-700" onClick={() => handleDeleteClick(user)}>Delete</button>
        </td>
      </motion.tr>
    ))
  ) : (
    <tr>
      <td colSpan={4} className="text-center text-xl font-bold py-8 text-black">User not found...</td>
    </tr>
  )}
</tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
            <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} Users</span>
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

          {/* Modal for Delete Confirmation */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg shadow-xl">
                <h2 className="text-lg font-semibold text-black">Confirm Delete User</h2>
                <p className="my-4 text-gray-500"> Once you delete this user, the action cannot be undone, and all related data will be permanently lost.</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancel}
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      border: '1px solid #d1d5db',
                      padding: '8px 16px',
                      borderRadius: '0.375rem'
                    }}
                    className="hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    style={{
                      backgroundColor: '#1f2937',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '0.375rem'
                    }}
                    className="hover:bg-gray-900"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal Component */}
          {isEditModalOpen && selectedUser && (
            <EditModal
              user={selectedUser}
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedUser(null);
              }}
              onSave={handleSaveChanges}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default UserManagement;
