/**
 * DeleteConfirmationModal displays a modal dialog asking for confirmation before deleting a product.
 *
 * Functionality:
 * - The modal appears when the `isOpen` prop is true, providing a focused task environment by dimming the rest of the screen.
 * - It presents a stark warning that the deletion is irreversible, reinforcing the seriousness of the action.
 *
 * Props:
 * - `isOpen`: Boolean controlling the visibility of the modal. If false, the modal doesn't render.
 * - `onCancel`: Function to call when the user decides against deletion, closing the modal.
 * - `onConfirm`: Function to call when the user confirms deletion, presumably to handle the deletion logic.
 *
 * Styling:
 * - The modal is designed to grab attention with a clear layout and contrasting buttons.
 * - It uses Tailwind CSS for styling, ensuring consistency with the overall application design.
 * - Button styles are explicitly set to ensure they match the modal's warning context, with subtle hover effects for usability.
 *
 * Usage:
 * - This modal is utilized in contexts where deleting a product is an option, ensuring users are aware of the consequences and confirm their intention.
 */


import React from 'react';

function DeleteConfirmationModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <h2 className="text-lg font-semibold text-black">Confirm Delete Product</h2>
        <p className="my-4 text-gray-500">Once you delete this product, the action cannot be undone, and all related data will be permanently lost.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
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
            onClick={onConfirm}
            style={{
              backgroundColor: '#1f2937',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '0.375rem'
            }}
            className="hover:bg-gray-900"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
