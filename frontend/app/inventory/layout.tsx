// layout.tsx
import React from 'react';
import Navbar from '/Users/abdullah/Documents/GitHub/POSitiveflow/frontend/app/components/Navbar';

export default function Layout({ children }) {
  const navLinks = [
    { path: '/inventory/suppliers', label: 'Supplier Management' },
    { path: '/inventory/products', label: 'Product Management' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar navLinks={navLinks} />
      <main>{children}</main>
    </div>
  );
}
