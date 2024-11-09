/**
 * Invoice Component
 *
 * This component represents an invoice page for a specific purchase.
 * It displays detailed information such as the customer details, the list of purchased items,
 * and the total cost including tax. The information is hardcoded for demonstration purposes.
 *
 * Functionalities:
 * - Displays the invoice number and the date of the invoice.
 * - Shows customer details including name, phone number, and email.
 * - Lists purchased items with product name, quantity, price, and total.
 * - Calculates and shows subtotal, tax (10%), and total amount.
 *
 * Structure:
 * - **Customer Information**: Displays the customer's name, phone, and email.
 * - **Items Section**: Lists each product with its respective quantity, price, and total.
 * - **Totals Section**: Shows the subtotal, tax, and final total.
 *
 * Design:
 * - Responsive and clean UI layout with Tailwind CSS classes.
 * - Simple and easy-to-read structure for invoices.
 *
 * Usage:
 * - This component can be used in a checkout or order history page where the user can view and print their invoices.
 * - It is currently static and uses hardcoded data for the invoice details.
 * 
 * Note: In a real-world scenario, data should be dynamically fetched from an API or passed as props.
 */


import React from 'react'

const Invoice = () => {
    return (
        <div className="min-h-screen bg-900 flex items-center justify-center p-4">
                      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
            <div className="p-6">
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
            </div>
          </div>
      );
}

export default Invoice