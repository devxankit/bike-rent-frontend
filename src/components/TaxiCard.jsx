import React from 'react';
import { FaTaxi, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaStar, FaUsers } from 'react-icons/fa';

const TaxiCard = ({ taxi }) => {
  // Safety check to prevent rendering if taxi is not an object
  if (!taxi || typeof taxi !== 'object' || Array.isArray(taxi)) {
    console.error('TaxiCard received invalid taxi prop:', taxi);
    return null;
  }

  // Ensure all required properties exist and are valid
  const safeType = String(taxi.type || taxi.name || 'Unknown Taxi');
  const safeDescription = String(taxi.description || '');
  const safeBasePrice = Number(taxi.basePrice) || 0;
  const safePricePerKm = Number(taxi.pricePerKm) || 0;
  const safeIsAvailable = Boolean(taxi.isAvailable);
  const safeImage = taxi.image ? String(taxi.image) : null;

  const handleBookNow = () => {
    // TODO: Implement booking functionality
    console.log('Book taxi:', taxi);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Taxi Image */}
      <div className="relative h-48 bg-gray-200">
        {safeImage ? (
          <img
            src={safeImage}
            alt={safeType}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600">
            <FaTaxi className="text-white text-4xl" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            safeIsAvailable 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {safeIsAvailable ? 'Available' : 'Not Available'}
          </span>
        </div>
      </div>

      {/* Taxi Details */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {safeType}
          </h3>
          <div className="flex items-center text-yellow-500">
            <FaStar className="text-sm" />
            <span className="ml-1 text-sm font-medium">4.5</span>
          </div>
        </div>

        {/* Description */}
        {safeDescription && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {safeDescription}
          </p>
        )}

        {/* Pricing */}
        <div className="space-y-1 mb-3">
          {safeBasePrice > 0 && (
            <div className="flex items-center text-gray-700">
              <FaMoneyBillWave className="text-yellow-500 mr-2" />
              <span className="text-sm">
                Base: ₹{safeBasePrice}
                {safePricePerKm > 0 && ` + ₹${safePricePerKm}/km`}
              </span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <FaUsers className="mr-1" />
            <span>4-6 Seats</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span>24/7 Available</span>
          </div>
        </div>

        {/* Book Now Button */}
        <button
          onClick={handleBookNow}
          disabled={!safeIsAvailable}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            safeIsAvailable
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {safeIsAvailable ? 'Book Now' : 'Not Available'}
        </button>
      </div>
    </div>
  );
};

export default TaxiCard;
