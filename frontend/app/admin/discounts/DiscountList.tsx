/**
 * DiscountList component displays a table of discounts with options to edit or delete each entry.
 * 
 * Features:
 * - Animates entry/exit with Framer Motion for smooth transitions.
 * - Opens EditDiscountModal for modifying discount details.
 * - Opens DeleteModal to confirm deletion of a selected discount.
 * - Highlights each discount's status (Active, Scheduled, Ended) with color-coded labels.
 * 
 * Props:
 * - `discounts` (array): List of discount objects to display.
 * - `updateDiscount` (function): Callback to update a discount.
 * - `deleteDiscount` (function): Callback to delete a discount.
 * 
 * This component manages modal visibility and passes relevant data for editing and deletion actions.
 */


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditDiscountModal from "./EditDiscountModal";
import DeleteModal from "./DeleteModal";
import { Badge } from "@/components/ui/badge"

export const DiscountList = ({ discounts, updateDiscount, deleteDiscount }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleEditClick = (discount) => {
    setSelectedDiscount(discount);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (discount) => {
    setSelectedDiscount(discount);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedDiscount(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedDiscount(null);
  };

  const handleSaveDiscount = (updatedDiscount) => {
    updateDiscount(updatedDiscount);
    handleCloseEditModal();
  };

  const handleDeleteDiscount = () => {
    deleteDiscount(selectedDiscount);
    handleCloseDeleteModal();
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 mb-6"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={containerVariants}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold text-black mb-4">Active Discounts</h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="text-black">
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount, index) => (
                  <tr key={index} className="text-black">
                    <td>{discount.name}</td>
                    <td>{discount.type}</td>
                    <td>{discount.value}</td>
                    <td>{discount.startDate}</td>
                    <td>{discount.endDate}</td>
                    <td>
                    <Badge
                        variant="secondary"
                        className={
                          discount.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : discount.status === "Scheduled"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {discount.status}
                      </Badge>
                    </td>
                    <td>
                      <button
                        onClick={() => handleEditClick(discount)}
                        style={{ marginRight: "8px" }}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(discount)}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </AnimatePresence>

      {isEditModalOpen && (
        <EditDiscountModal
          discount={selectedDiscount}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveDiscount}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onCancel={handleCloseDeleteModal}
          onDelete={handleDeleteDiscount}
        />
      )}
    </>
  );
};
