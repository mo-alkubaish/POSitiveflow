
/**
 * Header component provides the main navigation bar for the landing page.
 * 
 * Features:
 * - Logo and brand name linked to the hero section.
 * - Smooth scrolling links to different sections: Features, Testimonials, User Demos, and Contact.
 * - "Sign Up" button for user onboarding.
 * - Theme toggle button (moon icon) with  functions.
 * 
 * Props:
 * - `toggleTheme` (function): Callback to switch between light and dark themes.
 * 
 * This component enhances user navigation and provides quick access to theme and language settings.
 */


import React from "react";
import { Link } from "react-scroll";
import { MoonIcon, GlobeAltIcon } from "@heroicons/react/24/solid";

const Header = ({ toggleTheme }) => {
    return (
        <nav className="flex items-center justify-center py-4 relative shadow-none border-0">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-lg font-bold">
                <img src="/logo.png" alt="PositiveFlow Logo" className="w-8 h-auto" />
                <Link to="hero" smooth={true} offset={-70} duration={500} className="cursor-pointer">
                    <span className="text-xl font-bold">
                        <span className="text-success">POS</span>itiveFlow
                    </span>
                </Link>
            </div>

            <div className="bg-white px-6 py-2 rounded-full flex space-x-4 shadow-none border-0">
                <Link to="features" smooth={true} offset={-70} duration={500} className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-gray-600">Features</Link>
                <Link to="testimonials" smooth={true} offset={-70} duration={500} className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-gray-600">Testimonials</Link>
                <Link to="user-demos" smooth={true} offset={-70} duration={500} className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-gray-600">User Demos</Link>
                <Link to="contact" smooth={true} offset={-70} duration={500} className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-gray-600">Contact</Link>
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button className="btn btn-success btn-sm">Sign In</button>
                <button onClick={toggleTheme} className="p-1 bg-gray-50 rounded-full hover:bg-gray-300">
                    <MoonIcon className="w-5 h-5 text-gray-600" />
                </button>
            </div>
        </nav>    
    );
};

export default Header;
