/**
 * DiscountForm component allows users to create a new discount with specific details and validation.
 * 
 * Features:
 * - Fields for discount name, type, value, date range, and application scope.
 * - Input validation for numeric discount values and date order (end date must be after start date).
 * - Snackbar notification after successful creation, showing feedback with a progress bar.
 * - Smooth animations for form appearance and snackbar using Framer Motion.
 * 
 * Props:
 * - `addDiscount` (function): Callback to add the newly created discount.
 * 
 * This component manages form state and validations, provides user feedback, and resets after submission.
 */


import React, { useState, useEffect } from "react";
import { DatePickerWithRange } from "../../components/DateRangePicker"
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { determineStatus } from "./discountUtils"; 
import { motion, AnimatePresence } from "framer-motion";
import { DateRange } from "react-day-picker";

const today = new Date();
export const DiscountForm = ({ addDiscount }) => {
  const [discountName, setDiscountName] = useState('');
  const [discountType, setDiscountType] = useState('Percentage');
  const [discountValue, setDiscountValue] = useState('');

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 7)
  });
  const [applyTo, setApplyTo] = useState('All items');
  const [isValueError, setIsValueError] = useState(false);

  const [snackbar, setSnackbar] = useState({ show: false, message: '' });
  const [progress, setProgress] = useState(100);
  const [animate, setAnimate] = useState(''); 

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleValueChange = (e) => {
    if (/^\d*\.?\d*$/.test(e.target.value)) {
      setDiscountValue(e.target.value);
      setIsValueError(false);
    } else {
      setIsValueError(true);
    }
  };

  const handleSubmit = () => {
    if (!dateRange.from || !dateRange.to || dateRange.to < dateRange.from) {
      alert("Please select valid date range.");
      return;
    }

    if (!discountName || !discountValue || isValueError) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const newDiscount = {
      name: discountName,
      type: discountType,
      value: discountValue,
      startDate: dateRange.from.toISOString().substring(0, 10),
      endDate: dateRange.to.toISOString().substring(0, 10),
      status: determineStatus(dateRange.from, dateRange.to)
    };

    addDiscount(newDiscount);
    showSnackbar("Discount Created Successfully!");
    resetForm();
  };

  const resetForm = () => {
    setDiscountName('');
    setDiscountType('Percentage');
    setDiscountValue('');
    setDateRange({
      from: new Date(),
      to: addDays(new Date(), 7)
    });
    setApplyTo('All items');
    setIsValueError(false);
  };

  const showSnackbar = (message) => {
    setSnackbar({ show: true, message });
    setProgress(100);
    setAnimate('animate-fade-in');

    setTimeout(() => {
      setAnimate('animate-fade-out');
      setTimeout(() => {
        setSnackbar({ show: false, message: '' });
        setAnimate('');
      }, 500);
    }, 3000);
  };

  useEffect(() => {
    if (snackbar.show) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 1, 0));
      }, 30);

      return () => clearInterval(interval);
    }
  }, [snackbar.show]);

  return (
    <AnimatePresence>
      <motion.div
        className="bg-white shadow-lg rounded-xl p-6"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h2 className="text-xl font-bold text-black mb-4">Create New Discount</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Discount Name"
            className="input input-bordered w-full border-gray-300 bg-gray-50 text-black placeholder-gray-400"
            value={discountName}
            onChange={e => setDiscountName(e.target.value)}
          />
          <input
            type="text"
            placeholder={isValueError ? "Enter a valid number" : "Discount Value"}
            className={`input input-bordered w-full ${isValueError ? 'border-red-500 bg-red-100' : 'border-gray-300 bg-gray-50'} text-black placeholder-gray-400`}
            value={discountValue}
            onChange={handleValueChange}
          />
          <select
            className="select select-bordered w-full border-gray-300 bg-gray-50 text-black"
            value={applyTo}
            onChange={e => setApplyTo(e.target.value)}
          >
            <option>All items</option>
            <option>Specific items</option>
          </select>
          <select
            className="select select-bordered w-full border-gray-300 bg-gray-50 text-black"
            value={discountType}
            onChange={e => setDiscountType(e.target.value)}
          >
            <option value="Percentage">Percentage</option>
            <option value="Fixed Amount">Fixed Amount</option>
          </select>
          <div className="col-span-2">
            <DatePickerWithRange
              date={dateRange}
              setDate={setDateRange} 
              minDate={new Date()}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="btn bg-black text-white">Create Discount</button>
        </div>

        {snackbar.show && (
          <div
            className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 px-6 py-3 bg-black text-white rounded w-80 ${animate}`}
          >
            {snackbar.message}
            <div
              className="h-1 bg-green-500 mt-2"
              style={{ width: `${progress}%`, transition: "width 0.03s linear" }}
            ></div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
