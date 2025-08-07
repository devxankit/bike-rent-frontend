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
      className="bg-white rounded-lg shadow-md p-4 flex flex-col"
    >
      <div className="w-full h-44 flex items-center justify-center mb-2">
        <img src={bike.image} alt={bike.name} className="object-contain w-full h-full" />
      </div>
      <div className="mb-1">
        <h3 className="font-bold text-xl">{bike.name}</h3>
      </div>
      {bike.ownerPhone && (
        <div className="text-sm text-gray-700 mb-1">Owner: {bike.ownerPhone}</div>
      )}
      <p className="text-gray-600 mb-1">{bike.location}</p>
      <p className="text-blue-600 font-semibold mb-2">₹{bike.price} / day</p>
      {bike.features && bike.features.length > 0 && (
        <ul className="text-sm text-gray-700 mb-2 list-disc list-inside">
          {bike.features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      )}
      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
        {bike.fuelType && <span>Fuel: {bike.fuelType}</span>}
        {bike.seat && <span>Seats: {bike.seat}</span>}
        {bike.trips && <span>Trips: {bike.trips}</span>}
        {bike.payAtPickup && <span className="text-green-600 font-semibold">Pay at Pickup</span>}
      </div>
      {bike.year && (
        <div className="text-xs text-gray-400">Listed on: {new Date(bike.year).toLocaleDateString()}</div>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Book on WhatsApp"
        className="mt-4 inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold rounded px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-lg hover:scale-105"
        style={{ textDecoration: 'none' }}
      >
        <WhatsAppIcon sx={{ color: 'white', fontSize: 22, mr: 1 }} />
        Book on WhatsApp
      </a>
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