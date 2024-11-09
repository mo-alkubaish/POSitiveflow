/**
 * A notification component that toggles the visibility of a list of alerts on click.
 *
 * This component displays an icon that users can click to toggle the visibility of a dropdown list containing notifications. The list is hidden by default and will toggle on and off based on user interactions. The styles and structure of the dropdown are defined within 'Notify.css'.
 *
 * Usage:
 * - Include in any component or layout to provide users with timely alerts and notifications.
 * - Ideally placed in a navbar or header for accessibility across various parts of the application.
 *
 * @returns {JSX.Element} The Notify component with conditional rendering based on state for showing or hiding notifications.
 */


"use client";
import React, { useState } from 'react';
import './Notify.css'; 

const Notify: React.FC = () => {
    const [isListVisible, setIsListVisible] = useState(false);

    const handleIconClick = () => {
        setIsListVisible(!isListVisible);
    };

    return (
        <div className="dropdown">
            <button onClick={handleIconClick} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22a2 2 0 01-2-2h4a2 2 0 01-2 2zm6-7v-5a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
            </button>
            {isListVisible && (
                <div className="dropdown-content">
                    <a href="#">Low stock alert:  Cheese (SKU: 12345) - Current stock: 5 units</a>
                    <a href="#">Stock running low: Zaatar (SKU: 67890) - Current stock: 10 units 2</a>
                </div>
            )}
        </div>
    );
};

export default Notify;
