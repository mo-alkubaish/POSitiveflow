import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-base-200">
      <div className="container mx-auto text-center ">
        {/* Title with animation */}
        <motion.h2
          className="text-4xl font-bold text-success"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>

        {/* Description with animation */}
        <motion.p
          className="text-lg text-base-content mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have questions? We’d love to help.
        </motion.p>

        {/* Form with animation */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered mr-4 w-64 md:w-80 lg:w-96 focus:outline-none focus:ring-2 focus:ring-success"
          />
          <button className="btn btn-success hover:scale-105 transition-transform duration-200">Subscribe</button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
