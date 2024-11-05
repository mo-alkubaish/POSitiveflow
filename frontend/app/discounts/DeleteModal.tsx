/**
 * DeleteModal component provides a confirmation dialog for deleting a discount.
 * 
 * Features:
 * - Renders only when `isOpen` is true, overlaying the screen with a semi-transparent background.
 * - Displays a warning message about the irreversible nature of the deletion.
 * - Provides "Cancel" and "Delete Discount" buttons to either close the modal or confirm the deletion.
 * 
 * Props:
 * - `isOpen` (boolean): Controls modal visibility.
 * - `onCancel` (function): Callback to close the modal without deletion.
 * - `onDelete` (function): Callback to confirm the deletion action.
 */


import React from "react";

const DeleteModal = ({ isOpen, onCancel, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold text-black">Confirm Delete Discount</h2>
        <p className="my-4 text-gray-500">
          Once you delete this discount, the action cannot be undone, and all related data will be permanently lost.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="hover:bg-gray-100 text-black font-semibold py-2 px-4 rounded border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded bg-black"
          >
            Delete Discount
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

