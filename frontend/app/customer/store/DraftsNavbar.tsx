"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const DraftsNavbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setIsDropdownOpen(false), 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  return (
    <div className="bg-gray-100 p-2 flex items-center justify-between relative flex-wrap md:flex-nowrap">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Logo Section */}
      <div className="flex items-center space-x-2 text-lg font-bold hidden md:flex">
        <img
          src="/logo.png"
          alt="PositiveFlow Logo"
          className="w-8 h-auto"
        />
        <span className="text-black">
          <span className="text-green-700">POS</span>itiveFlow
        </span>
      </div>

      {/* Profile Icon with Dropdown */}
      <div
        className="relative flex items-center ml-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-2 rounded-full bg-white hover:bg-gray-100 cursor-pointer">
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
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-50">
            <ul className="text-gray-700">
              <Link href="/customer" passHref>
                <li className="px-4 py-3 hover:bg-gray-100">Purshase History</li>
              </Link>
              <Link href="/" passHref>
                <li className="px-4 py-2 hover:bg-gray-100">Sign Out</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DraftsNavbar;
