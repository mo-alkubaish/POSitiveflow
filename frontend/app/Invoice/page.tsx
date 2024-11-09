import Link from 'next/link';
import React from 'react'

const Invoice = () => {
    return (
        <div className="min-h-screen bg-900 flex items-center justify-center p-4">
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
    
              <div className="flex justify-between mt-6">
                <button className="btn btn-neutral">Send via WhatsApp</button>
                <button className="btn btn-active">Print Invoice</button>
                <button className="btn btn-active"><Link href="customerMainPage">Close</Link></button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Invoice