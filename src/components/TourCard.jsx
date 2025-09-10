import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { MdStar, MdAccessTime, MdLocationOn } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

const TourCard = ({ tour, index }) => {
  const handleWhatsAppBooking = () => {
    const message = `Hi! I'm interested in booking the "${tour.name}" tour package. Please provide more details.`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden bg-white border-2 border-gray-100 hover:border-yellow-300 transition-all duration-500 shadow-lg hover:shadow-2xl h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={tour.image} 
            alt={tour.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sm font-bold text-yellow-600">{tour.price}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900">{tour.name}</h3>
            <div className="flex items-center gap-1">
              <MdStar className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600">{tour.rating}</span>
            </div>
          </div>
          
          {/* Duration */}
          <div className="flex items-center gap-2 mb-3">
            <MdAccessTime className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">{tour.duration}</span>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{tour.description}</p>
          
          {/* WhatsApp Book Now Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWhatsAppBooking}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaWhatsapp className="w-4 h-4" />
            Book Now (WhatsApp)
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
};

export default TourCard;
