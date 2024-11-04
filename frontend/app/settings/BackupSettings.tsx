import React from "react";

const BackupSettings = () => {
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
      <div className="flex justify-end mt-4">
        <button className="btn bg-black text-white">Save Settings</button>
      </div>
    </div>
  );
};

export default BackupSettings;
