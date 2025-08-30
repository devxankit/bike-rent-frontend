import React from 'react';
import { motion } from 'framer-motion';

const Tours = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tour Services</h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore amazing destinations with our curated tour packages
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-gray-500">
            Tour services coming soon! We're working on amazing tour packages for you.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Tours;
