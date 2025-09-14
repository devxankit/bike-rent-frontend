import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaMapMarkerAlt, FaUsers, FaClock, FaStar } from 'react-icons/fa';
import { MdDesignServices } from 'react-icons/md';

const CustomTourPackage = () => {
  const handleCustomTourRequest = () => {
    const message = "Hi! I want to make a custom tour package. Please help me create my dream itinerary.";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            data-aos="zoom-in"
            data-aos-delay="200"
            className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <MdDesignServices className="w-4 h-4" />
            Custom Experience
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Don't See Your <span className="text-yellow-400">Perfect Tour?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let's create something extraordinary together. Our travel experts will design a personalized itinerary just for you.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            data-aos="fade-up"
            data-aos-delay="300"
            className="space-y-8"
          >
            {/* Key Benefits */}
            <div className="space-y-6">
              {[
                { icon: <FaMapMarkerAlt className="w-5 h-5" />, text: "Choose any destination you want" },
                { icon: <FaClock className="w-5 h-5" />, text: "Set your own timeline" },
                { icon: <FaUsers className="w-5 h-5" />, text: "Perfect for any group size" },
                { icon: <FaStar className="w-5 h-5" />, text: "Premium experience guaranteed" }
              ].map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  data-aos="fade-up"
                  data-aos-delay={400 + index * 100}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                    {point.icon}
                  </div>
                  <p className="text-lg text-gray-700 font-medium">{point.text}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              data-aos="fade-up"
              data-aos-delay="800"
              className="pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCustomTourRequest}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
              >
                <FaWhatsapp className="w-5 h-5" />
                Create My Custom Tour
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Banner Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            data-aos="fade-up"
            data-aos-delay="300"
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              data-aos="fade-up"
              data-aos-delay="500"
              className="relative overflow-hidden rounded-2xl shadow-2xl"
            >
              <img 
                src="/images/tour-banner.jpeg" 
                alt="Custom Tour Experience"
                className="w-full h-96 object-cover"
              />
              {/* Subtle overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomTourPackage;
