import React from "react";
import BackupDetailsTable from "./BackupDetailsTable"
import BackupSettings from "./BackupSettings"; 


const BackupSection = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      {/* Backup Status */}
      <h2 className="text-2xl font-bold text-black mb-4">Automated Backup Status</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500">Last Successful Backup</p>
          <p className="text-xl font-semibold text-black">2025-03-15 14:30:22</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500">Next Scheduled Backup</p>
          <p className="text-xl font-semibold text-black">2025-03-16 02:00:00</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500">Backup Status</p>
          <p className="text-xl font-semibold text-black">Healthy</p>
        </div>
      </div>

      {/* Backup Details Table */}
      <BackupDetailsTable />

      {/* Backup Settings */}
      <BackupSettings />
    </div>
  );
};

export default BackupSection;
