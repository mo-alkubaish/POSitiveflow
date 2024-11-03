"use client";

import React from "react";
import { MoonIcon, GlobeAltIcon } from "@heroicons/react/24/solid";
import HeroSection from "./heroSection";
import FeaturesSection from "./featuresSection";
import TestimonialsSection from "./testimonialsSection";
import ContactSection from "./contactSection";
import UserDemosSection from "./userDemosSection";
import { Link } from "react-scroll";  

const LandingPage = () => {
  const toggleTheme = () => {
    console.log("Toggle theme placeholder");
  };

  const toggleLanguage = () => {
    console.log("Toggle language to Arabic");
  };

  return (
    <div className="bg-base-200 min-h-screen text-base-content">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav className="flex items-center justify-center py-4 relative shadow-none border-0">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-lg font-bold">
          <img src="/logo.png" alt="PositiveFlow Logo" className="w-8 h-auto" />
          <Link to="hero" smooth={true} offset={-70} duration={500} className="cursor-pointer">
            <span className="text-xl font-bold">
              <span className="text-success">POS</span>itiveFlow
            </span>
          </Link>
        </div>

        {/* Centered Navigation Links with User Demos Link */}
        <div className="bg-white px-6 py-2 rounded-full flex space-x-4 shadow-none border-0">
          <Link to="features" smooth={true} offset={-70} duration={500} className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-gray-600">Features</Link>
          <Link to="testimonials" smooth={true} offset={-70} duration={500} className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-gray-600">Testimonials</Link>
          <Link to="user-demos" smooth={true} offset={-70} duration={500} className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-gray-600">User Demos</Link>
          <Link to="contact" smooth={true} offset={-70} duration={500} className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-gray-600">Contact</Link>
        </div>

        {/* Theme and Language Buttons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <button className="btn btn-success btn-sm">Sign Up</button>
          <button onClick={toggleTheme} className="p-1 bg-gray-50 rounded-full hover:bg-gray-300">
            <MoonIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={toggleLanguage} className="p-1 bg-blue-200 rounded-full hover:bg-blue-300">
            <GlobeAltIcon className="w-5 h-5 text-blue-500" />
          </button>
        </div>
      </nav>    
      
      {/* Hero Section */}
      <header className="hero min-h-[75vh] bg-base-200" id="hero">
        <HeroSection />
      </header>

      {/* Features Section */}
      <section id="features" className="py-5 bg-base-100">
        <FeaturesSection />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-5 bg-base-200">
        <TestimonialsSection />
      </section>

      {/* User Demos Section */}
      <section id="user-demos" className="py-20 bg-base-100">
        <UserDemosSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-base-200">
        <ContactSection />
      </section>
      
      {/* Footer */}
      <footer className="py-6 bg-base-200">
        <div className="container mx-auto text-center text-base-content">
          © 2024 POSitiveFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
