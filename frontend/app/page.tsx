/**
 * LandingPage component serves as the main entry for the application's marketing site.
 * 
 * Sections and Features:
 * - Navbar: Includes navigation links to different sections of the page and a logo.
 * - HeroSection: The main introductory section for the brand.
 * - FeaturesSection: Highlights key features of the application.
 * - TestimonialsSection: Displays user testimonials.
 * - UserDemosSection: Showcases user demo videos or images.
 * - ContactSection: Provides a contact form or information.
 * - Footer: Displays copyright information.
 * 
 * Additional Functionality:
 * - Smooth scrolling with `react-scroll` for in-page navigation.
 */


"use client";

import React from "react";
import HeroSection from "./landingPage/heroSection";
import FeaturesSection from "./landingPage/featuresSection";
import TestimonialsSection from "./landingPage/testimonialsSection";
import ContactSection from "./landingPage/contactSection";
import UserDemosSection from "./landingPage/userDemosSection";
import { Link } from "react-scroll";  


import Linkk from 'next/link';

const LandingPage = () => {

  return (
    <div className="bg-base-200 min-h-screen text-base-content">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav className="flex items-center justify-center py-4 relative shadow-none border-0">
  {/* Logo and Brand Name - Always visible */}
  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-lg font-bold">
    <img src="/logo.png" alt="PositiveFlow Logo" className="w-8 h-auto" />
    <Link to="hero" smooth={true} offset={-70} duration={400} className="md:flex cursor-pointer">
      <span className="text-xl font-bold">
        <span className="text-success">POS</span>itiveFlow
      </span>
    </Link>
  </div>

  {/* Responsive Navigation Links - Only visible on medium screens and up */}
  <div className="hidden md:flex bg-white px-6 py-2 rounded-full space-x-4 shadow-none border-0">
    <Link to="features" smooth={true} offset={-70} duration={400} className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-gray-600">Features</Link>
    <Link to="testimonials" smooth={true} offset={-70} duration={400} className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-gray-600">Testimonials</Link>
    <Link to="user-demos" smooth={true} offset={-70} duration={400} className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-gray-600">User Demos</Link>
    <Link to="contact" smooth={true} offset={-70} duration={400} className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer text-gray-600">Contact</Link>
  </div>

  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
  <Linkk href="/landingPage/LoginEmail" className="btn btn-success">Log in</Linkk>
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
