/**
 * A layout component that wraps child components to provide a consistent structure across the application.
 *
 * This component includes a navigation bar and a notification system, ensuring that these elements are available on every page that uses this layout. The `Navbar` component receives `navLinks` and a `Notify` component as props to customize navigation and manage notifications respectively.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout.
 * @returns {JSX.Element} The layout component that wraps children with navigation and notification functionalities.
 */

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
