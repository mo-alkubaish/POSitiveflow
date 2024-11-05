/**
 * BackupDetailsTable component displays a table of recent backups, with a responsive design for different screen sizes.
 * 
 * Features:
 * - Desktop View: Renders a table with columns for date, time, size, status, and action (e.g., Download or Upload).
 * - Mobile View: Displays each backup entry as a card for better readability on smaller screens.
 * 
 * Details:
 * - Status color coding: Successful backups are highlighted in green, failed backups in red, providing quick status identification.
 * - Interactive actions: "Download" and "Upload" actions are highlighted in blue with hover effects for user interactivity.
 * 
 * This component enhances the user experience by providing a structured and responsive display of backup details.
 */


import React from "react";

const BackupDetailsTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-separate border-spacing-y-2 mb-6 hidden md:table">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">Date</th>
            <th className="px-4 py-2 text-left font-semibold">Time</th>
            <th className="px-4 py-2 text-left font-semibold">Size</th>
            <th className="px-4 py-2 text-left font-semibold">Status</th>
            <th className="px-4 py-2 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 text-black">2024-03-14</td>
            <td className="px-4 py-2 text-black">14:30:22</td>
            <td className="px-4 py-2 text-black">1.2 GB</td>
            <td className="px-4 py-2 text-green-500">Successful</td>
            <td className="px-4 py-2 text-blue-500 hover:underline cursor-pointer">
              Download
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 text-black">2024-03-15</td>
            <td className="px-4 py-2 text-black">14:30:18</td>
            <td className="px-4 py-2 text-black">1.1 GB</td>
            <td className="px-4 py-2 text-red-500">Failed</td>
            <td className="px-4 py-2 text-blue-500 hover:underline cursor-pointer">
              Upload
            </td>
          </tr>
        </tbody>
      </table>

      {/* Mobile Responsive Cards */}
      <div className="md:hidden space-y-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-black font-semibold">Date: <span className="font-normal">2024-03-14</span></p>
          <p className="text-black font-semibold">Time: <span className="font-normal">14:30:22</span></p>
          <p className="text-black font-semibold">Size: <span className="font-normal">1.2 GB</span></p>
          <p className="text-green-500 font-semibold">Status: <span className="font-normal">Successful</span></p>
          <p className="text-blue-500 hover:underline cursor-pointer font-semibold">Action: <span className="font-normal">Download</span></p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-black font-semibold">Date: <span className="font-normal">2024-03-15</span></p>
          <p className="text-black font-semibold">Time: <span className="font-normal">14:30:18</span></p>
          <p className="text-black font-semibold">Size: <span className="font-normal">1.1 GB</span></p>
          <p className="text-red-500 font-semibold">Status: <span className="font-normal">Failed</span></p>
          <p className="text-blue-500 hover:underline cursor-pointer font-semibold">Action: <span className="font-normal">Upload</span></p>
        </div>
      </div>
    </div>
  );
};

export default BackupDetailsTable;
