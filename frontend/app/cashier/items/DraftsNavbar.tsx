/**
 * DraftsNavbar component provides a navigation bar with draft selection and a profile dropdown menu.
 * 
 * Features:
 * - **Draft Selection:** Allows the user to toggle between two draft options (Draft 1 and Draft 2) by clicking buttons.
 * - **Profile Dropdown Menu:** Contains a user profile icon that, on hover, displays a dropdown menu with a "Sign Out" option.
 * 
 * State:
 * - `isDropdownOpen`: Controls the visibility of the profile dropdown menu.
 * - `selectedDraft`: Tracks which draft (Draft 1 or Draft 2) is currently selected.
 * - `closeTimeout`: A reference used to handle delayed closing of the dropdown menu on mouse leave.
 * 
 * Event Handling:
 * - `handleMouseEnter`: Cancels any pending close operation and opens the dropdown menu.
 * - `handleMouseLeave`: Sets a timeout to close the dropdown menu after a short delay, creating a smooth user experience.
 * - `handleDraftClick`: Sets the selected draft state to the clicked draft, which updates the styling to show the active draft.
 * 
 * useEffect:
 * - The `useEffect` cleanup ensures any open close timeout is cleared when the component is unmounted, preventing potential memory leaks.
 * 
 * Layout and Styling:
 * - **Left Logo:** Positioned absolutely with a logo and app name (POSitiveFlow) for branding.
 * - **Center Draft Selection:** Displays buttons for Draft 1 and Draft 2 in a compact, rounded layout with conditional styling for the active draft.
 * - **Right Profile Icon:** Contains an SVG icon that, on hover, shows a dropdown menu with the "Sign Out" option.
 * 
 * Usage:
 * - This component is designed for the top navigation bar, providing quick access to drafts and profile options for the user.
 */
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface DraftsNavbarProps {
  selectedDraft: number;
  setDraft: (draft: number) => void;
}

const DraftsNavbar: React.FC<DraftsNavbarProps> = ({
  selectedDraft,
  setDraft,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [drafts, setDrafts] = useState([1, 2]);
  const closeTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setIsDropdownOpen(false), 200);
  };

  useEffect(() => {
    return () => clearTimeout(closeTimeout.current);
  }, []);

  const handleDraftClick = (draft: number) => {
    setDraft(draft);
  };

  const handleNewDraft = () => {
    const newDraftId = drafts.length > 0 ? Math.max(...drafts) + 1 : 1;
    setDrafts([...drafts, newDraftId]);
  };

  const handleDeleteDraft = (draft: number) => {
    if (window.confirm(`Are you sure you want to delete Draft ${draft}?`)) {
      setDrafts(drafts.filter((d) => d !== draft));
      if (selectedDraft === draft) {
        setDraft(null);  // Reset selected draft if the deleted draft was active
      }
    }
  };

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
      {/* Draft Buttons */}
      <div className="bg-white p-2 flex items-center justify-start rounded-full shadow-md mx-auto space-x-2 overflow-x-auto">
        {drafts.map((draft, index) => (
          <div key={index} className="flex items-center space-x-2">
            <button
              className={`px-4 py-2 whitespace-nowrap ${
                selectedDraft === draft
                  ? "bg-green-100 text-green-700 font-bold rounded-full"
                  : "bg-white text-gray-800"
              }`}
              onClick={() => handleDraftClick(draft)}
            >
              Draft {draft}
            </button>
            <button
              className="p-1 bg-red-100 text-red-500 hover:text-red-700 rounded-full"
              onClick={() => handleDeleteDraft(draft)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
        <button
          className="px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full"
          onClick={() => handleNewDraft()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {/* Profile Dropdown */}
      <div
        className="relative flex items-center"
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
              <Link href="/cashier/shift" passHref>
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
