/**
 * Renders a modal for confirming customer deletion. It provides 'Cancel' and 'Delete Customer' options.
 * The modal appears conditionally based on the 'isOpen' prop and offers a warning about the irreversible nature of the deletion.
 */


import React from 'react';

function DeleteConfirmationModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <h2 className="text-lg font-semibold text-black">Confirm Delete Customer</h2>
        <p className="my-4 text-gray-500">Once you delete this customer, the action cannot be undone, and all related data will be permanently lost.</p>
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
            Delete Customer
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
