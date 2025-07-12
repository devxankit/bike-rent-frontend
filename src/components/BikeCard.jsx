import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Enhanced logging utility for BikeCard
const logBikeCardAction = (action, data = null, error = null) => {
  const timestamp = new Date().toISOString();
  console.group(`🛵 [${timestamp}] BIKECARD ${action}`);
  
  if (data) {
    console.log('📤 Data:', data);
  }
  
  if (error) {
    console.error('❌ Error:', error);
    console.error('🔍 Error Details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
  }
  
  console.groupEnd();
};

// BikeCard displays a single bike's info
export default function BikeCard({ bike }) {
  const navigate = useNavigate();
  
  console.log('🛵 [BikeCard] Rendering bike:', { id: bike._id, name: bike.name, location: bike.location });
  
  // Get logged-in user info from localStorage
  let userName = 'User';
  let userPhone = 'XXXXXXXXXX';
  let userEmail = '';
  let isLoggedIn = false;
  
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name && user.phone && user.email) {
      isLoggedIn = true;
      userName = user.name || userName;
      userPhone = user.phone || userPhone;
      userEmail = user.email || '';
      console.log('👤 [BikeCard] User info loaded:', { userName, userPhone: userPhone.substring(0, 3) + '***', userEmail });
    } else {
      console.log('👤 [BikeCard] No user info found in localStorage');
    }
  } catch (e) {
    console.error('👤 [BikeCard] Error parsing user from localStorage:', e);
  }

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
  
  console.log('📞 [BikeCard] Owner phone formatted:', ownerPhone);

  // Build link to this bike card (assuming user is on the bikes page)
  const bikeUrl = `${window.location.origin}/bikes#bike-${bike._id}`;

  // WhatsApp message and link to owner
  const message = encodeURIComponent(
    `Hi, I want to book this bike:\n\nBike: ${bike.name}\nLocation: ${bike.location}\nPrice: ₹${bike.price}/day\n\nMy Name: ${userName}\nMy Phone: ${userPhone}\nMy Email: ${userEmail}\n\nBike Link: ${bikeUrl}`
  );
  // Send to bike owner's WhatsApp number
  const whatsappUrl = `https://wa.me/${ownerPhone}?text=${message}`;

  const handleWhatsAppClick = (e) => {
    console.log('📱 [BikeCard] WhatsApp click for bike:', bike._id);
    
    if (!isLoggedIn) {
      console.warn('🔐 [BikeCard] User not logged in, redirecting to login');
      e.preventDefault();
      toast.info('Please log in to send WhatsApp messages.');
      navigate('/login');
      return;
    }
    
    if (!ownerPhone) {
      console.warn('📞 [BikeCard] No owner phone number available');
      toast.error('Owner phone number not available.');
      e.preventDefault();
      return;
    }
    
    console.log('📱 [BikeCard] Opening WhatsApp with message for bike:', bike._id);
    logBikeCardAction('WHATSAPP_CLICK', { 
      bikeId: bike._id, 
      ownerPhone, 
      userName, 
      userPhone: userPhone.substring(0, 3) + '***' 
    });
    
    // Let the default link behavior happen
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            console.error('🖼️ [BikeCard] Image failed to load for bike:', bike._id);
            e.target.src = 'https://via.placeholder.com/400x300?text=Bike+Image';
          }}
          onLoad={() => {
            console.log('🖼️ [BikeCard] Image loaded successfully for bike:', bike._id);
          }}
        />
        {bike.isBooked && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Booked
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{bike.name}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{bike.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 16v-4" />
            </svg>
            <span>₹{bike.price}/day</span>
          </div>
          
          {bike.features && bike.features.length > 0 && (
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{bike.features.join(', ')}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {bike.isBooked ? (
              <span className="text-red-500 font-semibold">Currently Booked</span>
            ) : (
              <span className="text-green-500 font-semibold">Available</span>
            )}
          </div>
          
          <a
            href={whatsappUrl}
            onClick={handleWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            <WhatsAppIcon className="w-4 h-4 mr-2" />
            Contact Owner
          </a>
        </div>
      </div>
    </motion.div>
  );
}

BikeCard.propTypes = {
  bike: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    location: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    isBooked: PropTypes.bool,
    ownerPhone: PropTypes.string
  }).isRequired
}; 