/**
 * Invoice component provides a detailed view of an invoice with functionality to print the page or navigate back to the customer page.
 *
 * Functionality:
 * - Displays an invoice with details such as invoice number, date, customer information, items purchased, and total amounts.
 * - Provides buttons for printing the invoice and cancelling (redirecting to the customer management page).
 *
 * Use of Hooks:
 * - useRouter from Next.js is used for navigation back to the customer page on clicking the 'Cancel' button.
 * - The 'Print' button triggers the browser's print functionality to print the invoice directly from the page.
 *
 * Styling:
 * - Uses Tailwind CSS for styling components and layouts, including responsive designs that accommodate various screen sizes.
 * - The invoice layout is centered and formatted for clear readability and printability.
 *
 * The component is designed to be simple yet functional, catering to basic invoicing needs with easy navigation and operation.
 */


"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const Invoice = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/customer'); // Navigate to /customer page
  };

  const handlePrint = () => {
    window.print(); // Directly print the page with all content, including buttons
  };

  return (
    <div className="min-h-screen bg-900 flex items-center justify-center p-4">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
        {/* Invoice Content */}
        <div id="invoice-content" className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Invoice</h2>
          <div className="border-b pb-4 mb-4">
            <p className="text-lg font-medium">Invoice #INV-2025-001</p>
            <p className="text-gray-500">Date: January 15, 2025</p>
          </div>

          <div className="mb-4">
            <div className="flex justify-between">
              <p className="font-medium">Customer Name</p>
              <p>John Doe</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Phone Number</p>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Email</p>
              <p>john.doe@example.com</p>
            </div>
          </div>

          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-medium">Items</h3>
            <div className="flex justify-between mt-2 text-gray-500">
              <p>Product</p>
              <p>Quantity</p>
              <p>Price</p>
              <p>Total</p>
            </div>

            <div className="flex justify-between mt-2">
              <p>Product A</p>
              <p>1</p>
              <p>$10.00</p>
              <p>$20.00</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Product B</p>
              <p>1</p>
              <p>$15.00</p>
              <p>$15.00</p>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <p className="font-medium">Subtotal</p>
            <p>$35.00</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Tax (10%)</p>
            <p>$3.50</p>
          </div>
          <div className="flex justify-between font-semibold text-xl">
            <p>Total</p>
            <p>$38.50</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 p-4">
          <button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded">
            Cancel
          </button>
          <button onClick={handlePrint} className="bg-black hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded">
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
