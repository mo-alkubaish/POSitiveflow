/**
 * Navbar component with responsive links that highlight the current page. Includes a hidden logo and application name on smaller screens.
 */

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/customer-management', label: 'Customer Management' },
    { path: '/discounts', label: 'Discounts' },
    { path: '/user-management', label: 'User Management' },
    { path: '/settings', label: 'Settings' }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex items-center justify-center py-4 relative w-full">
      {/* Logo and PositiveFlow text - hidden on smaller screens */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-lg font-bold hidden lg:flex">
        <img src="/logo.png" alt="PositiveFlow Logo" className="w-8 h-auto" />
        <Link href="/" className="flex items-center">
          <span className="text-green-700">POS</span>
          <span className="text-black">itiveFlow</span>
        </Link>
      </div>

      {/* Navigation links */}
      <div className="bg-white px-6 py-2 rounded-full shadow-md flex space-x-4 overflow-x-auto">
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            href={path}
            className={`px-4 py-2 rounded-md transition-all duration-300 whitespace-nowrap ${
              isActive(path)
                ? 'bg-gray-200 text-black font-semibold'
                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
