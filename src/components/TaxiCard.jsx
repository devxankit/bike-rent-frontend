import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import { useState } from 'react';
import { X } from 'lucide-react';

// TaxiCard displays a single taxi's info
export default function TaxiCard({ taxi }) {
  const [showDialog, setShowDialog] = useState(false);

  // Safety check to prevent rendering if taxi is not an object
  if (!taxi || typeof taxi !== 'object' || Array.isArray(taxi)) {
    console.error('TaxiCard received invalid taxi prop:', taxi);
    return null;
  }

  // Format owner's phone number for WhatsApp
  let ownerPhone = taxi.ownerPhone || '';
  if (ownerPhone) {
    ownerPhone = ownerPhone.replace(/\s+/g, ''); // Remove spaces
    if (ownerPhone.startsWith('+')) {
      // Use as is
    } else if (ownerPhone.startsWith('0') && ownerPhone.length === 11) {
      ownerPhone = '+91' + ownerPhone.slice(1);
    } else if (/^\d{10}$/.test(ownerPhone)) {
      ownerPhone = '+91' + ownerPhone;
    }
    // Otherwise, use as is
  }

  // Build link to this taxi card
  const taxiUrl = `${window.location.origin}/taxi#taxi-${taxi._id}`;

  // Get form data from localStorage
  let formData = null;
  try {
    formData = JSON.parse(localStorage.getItem('taxiRentFormData'));
  } catch {}

  // Build comprehensive WhatsApp message with all booking data
  const buildWhatsAppMessage = () => {
    let message = `🚗 *Taxi Booking Request*\n\n`;
    
    // Taxi Information
    message += `*Taxi Details:*\n`;
    message += `• Taxi Name: ${taxi.name || taxi.type || 'N/A'}\n`;
    message += `• Model: ${taxi.type || taxi.name || 'N/A'}\n`;
    message += `• City: ${taxi.location || 'N/A'}\n`;
    message += `• Seating: ${taxi.seatingCapacity || 4} + Driver\n`;
    
    // Pricing Information
    message += `\n*Pricing:*\n`;
    if (taxi.rentalPricePerDay > 0) {
      message += `• Rental per day: ₹${taxi.rentalPricePerDay}\n`;
    }
    if (taxi.pricePerKm > 0) {
      message += `• Price per km: ₹${taxi.pricePerKm}\n`;
    }
    if (taxi.pricePerTrip > 0) {
      message += `• Price per trip: ₹${taxi.pricePerTrip}\n`;
    }
    
    // Booking Details (if form data available)
    if (formData) {
      message += `\n*Booking Details:*\n`;
      message += `• City: ${formData.city || 'N/A'}\n`;
      message += `• Trip Type: ${formData.tripType || 'N/A'}\n`;
      message += `• Pickup Location: ${formData.pickupLocation || 'N/A'}\n`;
      message += `• Drop Location: ${formData.dropLocation || 'N/A'}\n`;
      message += `• Pickup Date: ${formData.pickDate || 'N/A'}\n`;
      message += `• Pickup Time: ${formData.pickTime || 'N/A'}\n`;
      // Only show drop date/time for round trips
      if (formData.tripType === 'round-trip') {
        message += `• Drop Date: ${formData.dropDate || 'N/A'}\n`;
        message += `• Drop Time: ${formData.dropTime || 'N/A'}\n`;
      }
      message += `• Duration: ${formData.duration || 'N/A'}\n`;
    }
    
    // Additional Features
    if (taxi.features && taxi.features.length > 0) {
      message += `\n*Features:*\n`;
      taxi.features.forEach(feature => {
        message += `• ${feature}\n`;
      });
    }
    
    // Contact and Link
    message += `\n*Taxi Link:* ${taxiUrl}\n\n`;
    message += `Please confirm availability and provide any additional details. Thank you!`;
    
    return message;
  };

  const message = encodeURIComponent(buildWhatsAppMessage());
  // Send to taxi owner's WhatsApp number
  const whatsappUrl = `https://wa.me/${ownerPhone}?text=${message}`;
  // Call taxi owner's phone number
  const callUrl = `tel:${ownerPhone}`;

  // Get the primary price to display
  const getPrimaryPrice = () => {
    if (taxi.rentalPricePerDay > 0) return `Starting Price ₹${taxi.rentalPricePerDay}/day + Toll & Parking`;
    if (taxi.pricePerTrip > 0) return `Starting Price ₹${taxi.pricePerTrip}/trip + Toll & Parking`;
    if (taxi.pricePerKm > 0) return `Starting Price ₹${taxi.pricePerKm}/km + Toll & Parking`;
    return 'Price on request';
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 w-full max-w-sm md:max-w-md mx-auto"
      >
        {/* Large Taxi Image - Takes up most of the card */}
        <div className="relative h-48 sm:h-56 bg-gray-100">
          {taxi.image ? (
            <img
              src={taxi.image}
              alt={taxi.name || taxi.type}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
              <span className="text-white text-5xl">🚗</span>
            </div>
          )}
        </div>

        {/* Minimal Taxi Details */}
        <div className="p-5">
          {/* Taxi Name - Large and prominent */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
            {taxi.name || taxi.type || 'Unknown Taxi'}
          </h3>
          
         

          {/* Seating Capacity */}
          <p className="text-gray-700 mb-3 text-sm line-clamp-1">{taxi.seatingCapacity || 4} + Driver</p>

          {/* Primary Price - Prominent */}
          <div className="text-lg font-bold text-black mb-4">
            {getPrimaryPrice()}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => setShowDialog(true)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg px-4 py-2 transition-all duration-200 text-sm"
            >
              See More
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Book on WhatsApp"
              className="w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-lg text-sm"
              style={{ textDecoration: 'none' }}
            >
              <WhatsAppIcon sx={{ color: 'white', fontSize: 18, mr: 1 }} />
              Book Now (WhatsApp)
            </a>
            <a
              href={callUrl}
              title="Book on Call"
              className="w-full inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-lg text-sm"
              style={{ textDecoration: 'none' }}
            >
              <PhoneIcon sx={{ color: 'white', fontSize: 18, mr: 1 }} />
              Book Now on Call
            </a>
          </div>
        </div>
      </motion.div>

      {/* Detailed Information Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 pt-16 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg max-h-[85vh] flex flex-col mx-2"
          >
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-white rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900 truncate pr-4">
                {taxi.name || taxi.type || 'Taxi Details'}
              </h2>
              <button
                onClick={() => setShowDialog(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Dialog Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* Compact Image */}
              <div className="mb-5">
                <div className="relative h-44 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                  {taxi.image ? (
                    <img
                      src={taxi.image}
                      alt={taxi.name || taxi.type}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                      <span className="text-white text-5xl">🚗</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Basic Info */}
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-gray-900 border-b-2 border-blue-200 pb-2">
                    Basic Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-700 text-sm">Location:</span>
                      <span className="text-gray-900 text-sm font-medium">{taxi.location || 'Not specified'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-700 text-sm">Seating:</span>
                      <span className="text-gray-900 text-sm font-medium">{taxi.seatingCapacity || '4'} + Driver</span>
                    </div>

                    {taxi.acType && (
                      <div className="flex justify-between items-center py-1">
                        <span className="font-medium text-gray-700 text-sm">AC Type:</span>
                        <span className="text-gray-900 text-sm font-medium">{taxi.acType}</span>
                      </div>
                    )}

                    {taxi.fuelType && (
                      <div className="flex justify-between items-center py-1">
                        <span className="font-medium text-gray-700 text-sm">Fuel:</span>
                        <span className="text-gray-900 text-sm font-medium">{taxi.fuelType}</span>
                      </div>
                    )}

                    {taxi.luggageCapacity && (
                      <div className="flex justify-between items-center py-1">
                        <span className="font-medium text-gray-700 text-sm">Luggage:</span>
                        <span className="text-gray-900 text-sm font-medium">{taxi.luggageCapacity}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing Info */}
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-gray-900 border-b-2 border-green-200 pb-2">
                    Pricing
                  </h3>
                  
                  <div className="space-y-3">
                    {taxi.rentalPricePerDay > 0 && (
                      <div className="flex justify-between items-center py-1">
                        <span className="font-medium text-gray-700 text-sm">Per Day:</span>
                        <span className="text-xl font-bold text-green-600">₹{taxi.rentalPricePerDay}</span>
                      </div>
                    )}

                    {taxi.payAtPickup && (
                      <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-center">
                        <span className="text-green-700 font-semibold text-sm">✓ Pay at Pickup Available</span>
                      </div>
                    )}

                    {/* Price Benefits */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">💰</span>
                        <span className="text-gray-700 text-sm">Transparent pricing with no hidden charges</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">⭐</span>
                        <span className="text-gray-700 text-sm">Best value with competitive rates</span>
                      </div>
                      
                      
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              {taxi.features && taxi.features.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-base font-semibold text-gray-900 border-b-2 border-purple-200 pb-2 mb-3">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {taxi.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium border border-blue-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              {taxi.additionalInformation && (
                <div className="mt-5">
                  <h3 className="text-base font-semibold text-gray-900 border-b-2 border-orange-200 pb-2 mb-3">
                    Additional Information
                  </h3>
                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                    <div className="text-sm text-gray-700 whitespace-pre-line">
                      {taxi.additionalInformation}
                    </div>
                  </div>
                </div>
              )}

              {/* Owner Information */}
              {taxi.ownerPhone && (
                <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Contact Information</h3>
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">Phone:</span> {taxi.ownerPhone}
                  </p>
                </div>
              )}

            </div>

            {/* Dialog Footer - Fixed at Bottom */}
            <div className="p-5 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDialog(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl px-4 py-3 transition-all duration-200 text-sm shadow-sm hover:shadow-md"
                >
                  Close
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl px-4 py-3 transition-all duration-200 shadow-sm hover:shadow-lg text-sm"
                  style={{ textDecoration: 'none' }}
                >
                  <WhatsAppIcon sx={{ color: 'white', fontSize: 18, mr: 1 }} />
                  WhatsApp
                </a>
                <a
                  href={callUrl}
                  className="flex-1 inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl px-4 py-3 transition-all duration-200 shadow-sm hover:shadow-lg text-sm"
                  style={{ textDecoration: 'none' }}
                >
                  <PhoneIcon sx={{ color: 'white', fontSize: 18, mr: 1 }} />
                  Call
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

TaxiCard.propTypes = {
  taxi: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    seatingCapacity: PropTypes.number,
    pricePerKm: PropTypes.number,
    pricePerTrip: PropTypes.number,
    rentalPricePerDay: PropTypes.number,
    acType: PropTypes.string,
    luggageCapacity: PropTypes.string,
    fuelType: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    ownerPhone: PropTypes.string,
    tripsCount: PropTypes.number,
    payAtPickup: PropTypes.bool,
    additionalInformation: PropTypes.string,
  }).isRequired,
};
