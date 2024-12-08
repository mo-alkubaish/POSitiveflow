/**
 * UserManagement component provides a comprehensive interface for managing users, with options to add, edit, search, and delete users.
 * 
 * Features:
 * - Search: Filters users by name, email, or role, updating the displayed results in real time.
 * - Pagination: Displays users in paginated format, with controls to navigate pages.
 * - User List: Shows user details (name, email, role) in a table, with actions to edit or delete each user.
 * - Modals: 
 *    - `AddUserModal`: For adding a new user.
 *    - `EditModal`: For editing existing user details.
 *    - Confirmation modal for delete action.
 * 
 * State Management:
 * - `searchTerm`: Controls the search input, filtering the displayed users.
 * - `users`: Maintains the current list of users, including updates after add, edit, and delete actions.
 * - `isModalOpen`, `isEditModalOpen`, `isAddModalOpen`: Boolean states to manage modal visibility.
 * - `selectedUser`: Stores the user currently selected for editing or deletion.
 * 
 * Effects:
 * - Clears local storage upon component mount to reset any cached data.
 * 
 * Animations:
 * - Applies fade-in animation to the user list for a smooth loading experience using Framer Motion.
 * 
 * This component provides a streamlined interface for managing user data with feedback-driven modals and organized pagination.
 */


"use client";
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import searchUsers from "./searchUsers";
import usersData from "../../data/users.json";
import usePagination from "./usePagination";
import { motion } from "framer-motion";
import EditModal from './editModal';
import AddUserModal from './AddUserModal'; 
import TableSkeleton from "@/app/inventory/suppliers/TableSkeleton";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);  
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    localStorage.clear(); 
    console.log('Local storage cleared on page reload.');
  }, []);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setUsers(usersData);
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = searchUsers(users, searchTerm);
  const { currentPage, totalPages, changePage, indexOfFirstItem, indexOfLastItem } = usePagination(filteredUsers.length, 8);
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedUsers = users.filter(u => u !== selectedUser);
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
    const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
    setUsers(updatedUsers);
    setIsEditModalOpen(false);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]); 
    setIsAddModalOpen(false);
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
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                  <h1 className="text-xl md:text-2xl font-bold text-black">User Management</h1>
                  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-0 md:space-x-4 mt-4 md:mt-0">
                      <div className="relative w-full md:max-w-xs">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                          </span>
                          <input
                              type="text"
                              placeholder="Search"
                              className="input input-bordered w-full pl-10 bg-gray-50 text-black placeholder-gray-400"
                              value={searchTerm}
                              onChange={e => setSearchTerm(e.target.value)}
                          />
                      </div>
                      <button className="btn btn-outline w-full md:w-auto text-black bg-gray-50 border-gray-300 hover:bg-gray-100" onClick={() => setIsAddModalOpen(true)}>Add User</button>
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
                        <tr key={index} className="bg-white hover:bg-gray-50 shadow-sm rounded-lg">
                          <td className="py-3 px-4 text-black">{user.name}</td>
                          <td className="py-3 px-4 text-black">{user.email}</td>
                          <td className="py-3 px-4 text-black">{user.role}</td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleEditClick(user)}>Edit</button>
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => handleDeleteClick(user)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center text-xl font-bold py-8 text-black">No users found...</td>
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

              {/* Delete Confirmation Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-4 rounded-lg shadow-xl">
                    <h2 className="text-lg font-semibold text-black">Confirm Delete User</h2>
                    <p className="my-4 text-gray-500">Once you delete this user, the action cannot be undone, and all related data will be permanently lost.</p>
                    <div className="flex justify-end space-x-4">
                      <button onClick={handleCancel} className="hover:bg-gray-100 text-black font-semibold py-2 px-4 rounded border border-gray-300">
                        Cancel
                      </button>
                      <button onClick={handleDeleteConfirm} className="hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded bg-black">
                        Delete User
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Modal */}
              {isEditModalOpen && selectedUser && (
                <EditModal
                  user={selectedUser}
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  onSave={handleSaveChanges}
                />
              )}

              {/* Add Modal */}
              {isAddModalOpen && (
                <AddUserModal
                  isOpen={isAddModalOpen}
                  onClose={() => setIsAddModalOpen(false)}
                  onSave={handleAddUser}
                />
              )}
            </>
          )}
        </div>
      </motion.div>
  );
};

export default UserManagement;
