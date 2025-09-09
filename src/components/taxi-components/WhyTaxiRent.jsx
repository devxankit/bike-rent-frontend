import React, { useEffect } from 'react';
import { FaDollarSign, FaCalendarAlt, FaShieldAlt, FaMapMarkerAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WhyTaxiRent = () => {
  const features = [
    {
      icon: FaDollarSign,
      title: "Lowest Taxi Prices",
      description: "We offer the most competitive pricing in the market without compromising on quality."
    },
    {
      icon: FaCalendarAlt,
      title: "Flexible Booking Plans",
      description: "Choose from hourly, daily, weekly, or monthly plans that suit your needs perfectly."
    },
    {
      icon: FaShieldAlt,
      title: "No Ownership Worries",
      description: "Skip the maintenance, insurance, and registration hassles. Just book and enjoy."
    },
    {
      icon: FaMapMarkerAlt,
      title: "15+ Service Hubs",
      description: "Conveniently located pickup points across the city for easy accessibility."
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="py-16 bg-white" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why TaxiRent?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We simplified taxi bookings so you can focus on what's important to you.
          </p>
        </div>

        {/* Features Cards - Responsive Scrollable */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up">
          {features.map((feature, index) => (
            <div key={index} className="text-center px-4 py-6 rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white max-w-xs mx-auto border border-gray-100">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-yellow-50 w-14 h-14 rounded-full flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{feature.title}</h3>
              <p className="text-gray-700 text-[15px] leading-snug font-normal">{feature.description}</p>
            </div>
          ))}
        </div>
        {/* Mobile: Horizontal Scrollable Cards */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 px-1 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="min-w-[50vw] max-w-[60vw] flex-shrink-0 snap-center bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center px-4 py-6 mx-auto border border-gray-100"
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-yellow-50 w-14 h-14 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{feature.title}</h3>
                <p className="text-gray-700 text-[15px] leading-snug font-normal">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTaxiRent;
