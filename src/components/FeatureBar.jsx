import React from 'react';
import { FaShieldAlt, FaHome, FaCreditCard, FaTools, FaMotorcycle, FaHardHat } from 'react-icons/fa';

const features = [
  {
    icon: <FaShieldAlt size={24} color="#facc15" />, // Govt. Compliant
    title: 'Govt. Compliant',
    subtitle: 'Vehicles',
  },
  {
    icon: <FaHome size={24} color="#facc15" />, // Doorstep Delivery
    title: 'Doorstep Delivery of',
    subtitle: 'Vehicles',
  },
  {
    icon: <FaCreditCard size={24} color="#facc15" />, // Instant & Secure Payments
    title: 'Instant & Secure',
    subtitle: 'Payments',
  },
  {
    icon: <FaTools size={24} color="#facc15" />, // Services & Maintenance
    title: 'Services &',
    subtitle: 'Maintenance',
  },
  {
    icon: <FaMotorcycle size={24} color="#facc15" />, // Sanitized Vehicles
    title: 'Sanitized',
    subtitle: 'Vehicles',
  },
  {
    icon: <FaHardHat size={24} color="#ffbe00" />, // Free Helmet
    title: 'Free Helmet',
    subtitle: 'With Every Ride',
  },
];

const FeatureBar = () => (
  <div className="w-full bg-white pt-4 px-1 md:px-0 flex justify-center">
    <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4">
      {features.map((f, i) => (
        <div
          key={i}
          className="flex flex-row items-center h-full min-h-[56px] md:min-h-[64px] justify-center bg-white rounded-xl shadow-sm border border-gray-100 px-1.5 py-2 md:py-3 transition hover:shadow-md text-left gap-2 md:gap-2 min-w-0 max-w-full"
        >
          <div className="flex items-center justify-center shrink-0 min-w-0 h-full">{f.icon}</div>
          <div className="flex flex-col justify-center min-w-0 max-w-full h-full">
            <div className="text-[11px] md:text-[13px] font-bold text-gray-800 leading-tight truncate max-w-full">{f.title}</div>
            <div className="text-[10px] md:text-[12px] text-gray-500 -mt-0.5 truncate max-w-full">{f.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureBar; 