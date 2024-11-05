/**
 * Navbar component with responsive links that highlight the current page. Includes a hidden logo and application name on smaller screens.
 */


"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavLink {
  path: string;
  label: string;
}

interface NavbarProps {
  navLinks: NavLink[];
}

const Navbar = ({ navLinks }: NavbarProps) => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string): boolean => pathname === path;

  let closeTimeout: ReturnType<typeof setTimeout>;
  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => setIsDropdownOpen(false), 200);
  };

  return (
    <div className="flex items-center justify-between py-4 relative w-full px-4 lg:px-0">
      {/* Logo */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-lg font-bold hidden lg:flex">
        <img src="/logo.png" alt="PositiveFlow Logo" className="w-8 h-auto" />
        <Link href="/" className="flex items-center">
          <span className="text-green-700">POS</span>
          <span className="text-black">itiveFlow</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Navigation links */}
      <div
        className={`flex-1 lg:flex justify-center ${
          isMobileMenuOpen ? 'block' : 'hidden'
        } lg:block`}
      >
        <div className="bg-white w-full lg:w-auto px-6 py-2 rounded-full shadow-md flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                isActive(path)
                  ? 'bg-gray-200 text-black font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
              onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on link click
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* User Icon with Dropdown - Shows on Hover */}
      <div
        className="relative ml-4 mr-4 hidden lg:block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* User Icon */}
        <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A10.97 10.97 0 0012 21c2.59 0 4.984-.876 6.879-2.324M15 11a4 4 0 10-8 0 4 4 0 008 0z"
            />
          </svg>
        </div>

        {/* Minimalistic Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-28 bg-white rounded-md z-10">
            <Link
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:text-black"
            >
              Sign Out
            </Link>
          </div>
        )}
      </div>

      {/* Mobile User Icon */}
      <div className="lg:hidden relative">
        <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A10.97 10.97 0 0012 21c2.59 0 4.984-.876 6.879-2.324M15 11a4 4 0 10-8 0 4 4 0 008 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
