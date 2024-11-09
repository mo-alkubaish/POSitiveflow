// layout.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import Notify from './notify';

export default function Layout({ children }) {
  const navLinks = [
    { path: '/inventory/suppliers', label: 'Supplier Management' },
    { path: '/inventory/products', label: 'Product Management' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar navLinks={navLinks} component={<Notify />} />
      <main>{children}</main>
    </div>
  );
}
