/**
 * TestimonialsSection component displays client testimonials with animated entrances.
 * 
 * Features:
 * - Section Title: "What Our Clients Say," with an animated fade-in effect.
 * - Testimonials: Renders each testimonial from a JSON data file in a card format, displayed side-by-side on larger screens.
 * - Each card includes a testimonial text, client's name, and an icon, with smooth fade-in animations staggered by index for visual appeal.
 * 
 * Animations:
 * - Title and each testimonial card fade in sequentially using Framer Motion, creating a dynamic user experience.
 * 
 * This section is designed to build trust with new users by showcasing positive client feedback.
 */

import React from 'react';
import { motion } from 'framer-motion';
import testimonials from '../data/testimonials.json'; 

const TestimonialsSection = () => {
    return (
      <section id="testimonials" className="py-20  text-gray-800">
        <div className="container mx-auto text-center">
          {/* Animated Section Title */}
          <motion.h2
            className="text-4xl font-bold text-success mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4}}
          >
            What Our Clients Say
          </motion.h2>
  
          {/* Testimonials Displayed Side-by-Side */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="card bg-base-100 shadow-lg w-80 p-6 relative text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.4}}
              >
                <div className="card-body relative">
                  <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-8 h-8 text-success"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h3m0 0V9m0 3c0 3-1 5-4 5H4v-4a4 4 0 014-4h1m6 3h3m0 0V9m0 3c0 3-1 5-4 5h-3v-4a4 4 0 014-4h1" />
                    </svg>
                  </div>
                  <p className="text-lg italic mb-4">"{testimonial.text}"</p>
                  <p className="text-right font-bold">{testimonial.client}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default TestimonialsSection;