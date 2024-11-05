/**
 * EditDiscountModal allows users to edit an existing discount's details in a modal. It supports:
 * - Input validation for numeric discount values, discount dates, and required fields.
 * - Date selection with DatePicker for start and end dates, ensuring the end date is not before the start date.
 * - Conditional rendering based on the `isOpen` prop and initial discount data passed as props.
 * 
 * The component provides Cancel and Save buttons to either discard changes or save updates.
 */


import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditDiscountModal = ({ discount, isOpen, onClose, onSave }) => {
  const [editDiscount, setEditDiscount] = useState({
    ...discount,
    startDate: discount.startDate ? new Date(discount.startDate) : null,
    endDate: discount.endDate ? new Date(discount.endDate) : null,
  });
  const [isValueError, setIsValueError] = useState(false);

  useEffect(() => {
    if (isOpen && discount) {
      setEditDiscount({
        ...discount,
        startDate: discount.startDate ? new Date(discount.startDate) : null,
        endDate: discount.endDate ? new Date(discount.endDate) : null,
      });
    }
  }, [isOpen, discount]);

  if (!isOpen || !editDiscount) return null;

  const handleValueChange = (e) => {
    if (/^\d*\.?\d*$/.test(e.target.value)) {
      setEditDiscount((prev) => ({ ...prev, value: e.target.value }));
      setIsValueError(false);
    } else {
      setIsValueError(true);
    }
  };

  const handleSubmit = () => {
    if (!editDiscount.name || !editDiscount.value || !editDiscount.startDate || !editDiscount.endDate || isValueError) {
      alert("Please fill in all fields correctly.");
      return;
    }
    if (new Date(editDiscount.endDate) < new Date(editDiscount.startDate)) {
      alert("End Date cannot be before Start Date.");
      return;
    }

    onSave({
      ...editDiscount,
      startDate: editDiscount.startDate.toISOString().split('T')[0],
      endDate: editDiscount.endDate.toISOString().split('T')[0],
    });    
    handleClose();
  };

  const handleClose = () => {
    setTimeout(() => onClose(), 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDiscount((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold text-black mb-4">Edit Discount</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Discount Name"
            className="input input-bordered w-full border-gray-300 bg-gray-50 text-black placeholder-gray-400"
            value={editDiscount.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="value"
            placeholder={isValueError ? "Enter a valid number" : "Discount Value"}
            className={`input input-bordered w-full ${isValueError ? "border-red-500 bg-red-100" : "border-gray-300 bg-gray-50"} text-black placeholder-gray-400`}
            value={editDiscount.value}
            onChange={handleValueChange}
          />
          <select
            name="type"
            className="select select-bordered w-full border-gray-300 bg-gray-50 text-black"
            value={editDiscount.type}
            onChange={handleChange}
          >
            <option value="Percentage">Percentage</option>
            <option value="Fixed Amount">Fixed Amount</option>
          </select>
          <select
            name="applyTo"
            className="select select-bordered w-full border-gray-300 bg-gray-50 text-black"
            value={editDiscount.applyTo || "All items"}
            onChange={handleChange}
          >
            <option>All items</option>
            <option>Specific items</option>
          </select>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <DatePicker
              selected={editDiscount.startDate}
              onChange={(date) => setEditDiscount((prev) => ({ ...prev, startDate: date }))}
              className="input input-bordered w-full border-gray-300 bg-gray-50 text-black"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <DatePicker
              selected={editDiscount.endDate}
              onChange={(date) => setEditDiscount((prev) => ({ ...prev, endDate: date }))}
              className="input input-bordered w-full border-gray-300 bg-gray-50 text-black"
              dateFormat="yyyy-MM-dd"
              minDate={editDiscount.startDate}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={handleClose} className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDiscountModal;
