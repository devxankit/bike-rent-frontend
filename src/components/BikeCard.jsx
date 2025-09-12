import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// BikeCard displays a single bike's info
export default function BikeCard({ bike }) {
  // No longer need user info for WhatsApp booking

  // Format owner's phone number for WhatsApp
  let ownerPhone = bike.ownerPhone || '';
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

  // Build link to this bike card (assuming user is on the bikes page)
  const bikeUrl = `${window.location.origin}/bikes#bike-${bike._id}`;

  // Get form data from localStorage
  let formData = null;
  try {
    formData = JSON.parse(localStorage.getItem('bikeRentFormData'));
  } catch {}

  // Build WhatsApp message with form data if available (no user personal info)
  const message = encodeURIComponent(
    `Hi, I want to book this bike:\n\nBike: ${bike.name}\nLocation: ${bike.location}\nPrice: ₹${bike.price}/day` +
    (formData ?
      `\n\nBooking Details:\nCity: ${formData.city || ''}\nPick Up: ${formData.pickDateTime ? new Date(formData.pickDateTime).toLocaleString() : ''}\nDrop Off: ${formData.dropDateTime ? new Date(formData.dropDateTime).toLocaleString() : ''}`
      :
      ''
    ) +
    `\n\nBike Link: ${bikeUrl}`
  );
  // Send to bike owner's WhatsApp number
  const whatsappUrl = `https://wa.me/${ownerPhone}?text=${message}`;



  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img 
          src={bike.image} 
          alt={bike.name} 
          className="object-contain w-full h-full transition-transform duration-300 hover:scale-105" 
        />
      </div>
      
      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <div className="mb-3">
          <h3 className="font-bold text-xl text-gray-900 leading-tight">{bike.name}</h3>
        </div>
        
        {/* Information Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="space-y-2">
            {bike.ownerPhone && (
              <div className="text-sm">
                <span className="text-gray-500 font-medium">Owner</span>
                <p className="text-gray-800 font-semibold">{bike.ownerPhone}</p>
              </div>
            )}
            <div className="text-sm">
              <span className="text-gray-500 font-medium">Location</span>
              <p className="text-gray-800 font-semibold">{bike.location}</p>
            </div>
            {bike.features && bike.features.length > 0 && (
              <div className="text-sm">
                <span className="text-gray-500 font-medium">Features</span>
                <ul className="mt-0.5 space-y-0.5">
                  {bike.features.map((f, i) => (
                    <li key={i} className="text-gray-800 font-medium flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="text-sm">
              <span className="text-gray-500 font-medium">Price</span>
              <p className="text-blue-600 font-bold text-lg">₹{bike.price}<span className="text-sm font-normal text-gray-600">/day</span></p>
            </div>
          </div>
          
          <div className="space-y-2">
            {bike.fuelType && (
              <div className="text-sm">
                <span className="text-gray-500 font-medium">Fuel</span>
                <p className="text-gray-800 font-semibold capitalize">{bike.fuelType}</p>
              </div>
            )}
            {bike.seat && (
              <div className="text-sm">
                <span className="text-gray-500 font-medium">Seats</span>
                <p className="text-gray-800 font-semibold">{bike.seat}</p>
              </div>
            )}
            {bike.year && (
              <div className="text-sm">
                <span className="text-gray-500 font-medium">Listed</span>
                <p className="text-gray-800 font-semibold">{new Date(bike.year).toLocaleDateString()}</p>
              </div>
            )}
            {bike.payAtPickup && (
              <div className="text-sm">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  Pay at Pickup
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Book on WhatsApp"
          className="w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-4 py-2.5 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          style={{ textDecoration: 'none' }}
        >
          <WhatsAppIcon sx={{ color: 'white', fontSize: 18, mr: 1.5 }} />
          Book on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

BikeCard.propTypes = {
  bike: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    location: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    fuelType: PropTypes.string,
    seat: PropTypes.number,
    trips: PropTypes.number,
    payAtPickup: PropTypes.bool,
    year: PropTypes.string,
    ownerPhone: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
}; 