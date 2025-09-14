import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { MdAccessTime, MdLocationOn } from 'react-icons/md';
import { FaWhatsapp, FaMapMarkerAlt, FaUsers, FaPhoneAlt } from 'react-icons/fa';

const TourCard = ({ tour, index }) => {
  const navigate = useNavigate();

  const handleWhatsAppBooking = () => {
    const message = `Hi! I'm interested in booking the "${tour.name}" tour package. Please provide more details.`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallBooking = () => {
    const phoneNumber = '919876543210'; // You can make this dynamic based on tour data
    const callUrl = `tel:${phoneNumber}`;
    window.location.href = callUrl;
  };

  const handleDetailsClick = () => {
    navigate(`/tour-details/${tour._id || tour.id}`);
  };

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on buttons
    if (e.target.closest('button')) {
      return;
    }
    navigate(`/tour-details/${tour._id || tour.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      onClick={handleCardClick}
    >
      <Card className="overflow-hidden bg-white border border-gray-200 hover:border-yellow-400 transition-all duration-500 shadow-lg hover:shadow-2xl h-full rounded-xl">
        {/* Image Container */}
        <div className="relative h-36 overflow-hidden">
          <img 
            src={tour.images?.[0] || tour.image || '/images/bg.png'} 
            alt={tour.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Price Badge */}
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
            <span className="text-sm font-bold text-yellow-600">₹{tour.price}</span>
          </div>
          
          
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Title and Rating */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
              {tour.name}
            </h3>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <MdAccessTime className="w-3 h-3 text-yellow-500" />
                <span className="font-medium">{tour.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaUsers className="w-3 h-3 text-yellow-500" />
                <span className="font-medium">Max 12</span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-xs mb-4 leading-relaxed line-clamp-2">
            {tour.description}
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap gap-1 mb-4">
            {tour.features?.slice(0, 2).map((feature, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full border border-yellow-200"
              >
                {feature}
              </span>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsAppBooking}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-1"
            >
              <FaWhatsapp className="w-3 h-3" />
              Book on WhatsApp
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCallBooking}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-1"
            >
              <FaPhoneAlt className="w-3 h-3" />
              Book on Call
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDetailsClick}
              className="w-full border-2 border-yellow-400 text-yellow-600 rounded-lg font-semibold text-xs hover:bg-yellow-400 hover:text-white transition-all duration-300 py-2"
            >
              View Details
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TourCard;
