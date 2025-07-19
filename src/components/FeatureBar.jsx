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
          className="bg-white rounded-xl shadow-sm border border-gray-100 px-3 py-4 md:py-4 transition hover:shadow-md"
        >
          <div className="flex items-start space-x-3">
            {/* Icon container with fixed dimensions */}
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              {f.icon}
            </div>
            
            {/* Text container */}
            <div className="flex-1 min-w-0">
              <div className="text-[11px] md:text-[13px] font-bold text-gray-800 leading-tight truncate">
                {f.title}
              </div>
              <div className="text-[10px] md:text-[12px] text-gray-500 leading-tight truncate mt-0.5">
                {f.subtitle}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureBar; 