/**
 * BackupSettings component allows users to configure backup frequency, time, and data retention period for store data.
 * 
 * Features:
 * - Backup Frequency: Dropdown menu to select how often backups occur (e.g., daily, weekly, monthly).
 * - Backup Time: Input field to specify the time of day for automated backups.
 * - Retention Period: Numeric input for setting the duration (in days) to retain backups.
 * 
 * Snackbar Notification:
 * - Displays a confirmation message when settings are saved, with a progress bar that decreases over time.
 * - Utilizes animations to fade in and fade out, providing visual feedback for successful saves.
 * 
 * State Management:
 * - Snackbar visibility and progress are managed with `useState` and `useEffect`, ensuring a smooth and timed notification display.
 * 
 * This component provides a user-friendly interface for managing backup settings, enabling users to adjust backup preferences with immediate feedback.
 */


import React, { useState, useEffect } from "react";

const BackupSettings = () => {
  const [snackbar, setSnackbar] = useState({ show: false, message: '' });
  const [progress, setProgress] = useState(100);
  const [animate, setAnimate] = useState(''); 

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Backup Frequency
        </label>
        <select className="select select-bordered w-full text-black">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Backup Time
        </label>
        <input
          type="time"
          defaultValue="02:00"
          className="input input-bordered w-full text-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Retention Period (days)
        </label>
        <input
          type="number"
          defaultValue={30}
          className="input input-bordered w-full text-black"
        />
      </div>
      <div className="md:col-start-1 md:col-end-4 flex justify-end mt-4">
        <button
          className="btn bg-black text-white"
          onClick={() => showSnackbar('Settings Saved Successfully!')}
        >
          Save Settings
        </button>
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
    </div>
  );
};

export default BackupSettings;
