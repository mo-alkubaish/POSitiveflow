import React from "react";

const BackupDetailsTable = () => {
  return (
    <table className="table w-full border-separate border-spacing-y-2 mb-6">
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
  );
};

export default BackupDetailsTable;
