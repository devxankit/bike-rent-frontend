import React from 'react';
import { FaShieldAlt, FaHome, FaCreditCard, FaTools, FaMotorcycle, FaHardHat } from 'react-icons/fa';

const features = [
  {
    icon: <FaShieldAlt size={26} color="#facc15" />, // Govt. Compliant
    title: 'Govt. Compliant',
    subtitle: 'Safe Vehicles',
  },
  {
    icon: <FaHome size={26} color="#facc15" />, // Doorstep Delivery
    title: 'Doorstep Delivery',
    subtitle: 'To Your Location',
  },
  {
    icon: <FaCreditCard size={26} color="#facc15" />, // Secure Payments
    title: 'Secure Payments',
    subtitle: 'Instant & Easy',
  },
  {
    icon: <FaTools size={26} color="#facc15" />, // Regular Service
    title: 'Regular Service',
    subtitle: 'Well Maintained',
  },
  {
    icon: <FaMotorcycle size={26} color="#facc15" />, // Sanitized Bikes
    title: 'Sanitized Bikes',
    subtitle: 'Clean & Ready',
  },
  {
    icon: <FaHardHat size={26} color="#facc15" />, // Free Helmet
    title: 'Free Helmet',
    subtitle: 'Every Ride Safe',
  },
];

const FeatureBar = () => (
  <div className="w-full bg-white pt-8 px-4 md:px-0 flex justify-center">
    <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4">
      {features.map((f, i) => (
        <div
          key={i}
          className="flex flex-row items-center h-full min-h-[56px] md:min-h-[64px] justify-center bg-white rounded-xl shadow-sm border border-gray-100 px-1.5 py-2 md:py-3 transition hover:shadow-md text-left gap-2 md:gap-2 min-w-0 max-w-full"
        >
          <div className="flex items-center justify-center shrink-0 w-10 h-full">{f.icon}</div>
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