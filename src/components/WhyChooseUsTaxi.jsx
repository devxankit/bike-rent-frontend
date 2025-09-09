import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaDollarSign, FaMapMarkedAlt, FaCar, FaHeadset, FaUsers } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WhyChooseUsTaxi = () => {
  // Carousel state
  const carouselImages = [
    './images/taxi-bg-1.png',
    './images/taxi-bg-2.png',
    './images/bike-banner-1.png'
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  const goToNext = () => setActiveIndex((prev) => (prev + 1) % carouselImages.length);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="w-full py-14 bg-white z-[-999]" data-aos="fade-up">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4">
        {/* Left: Why Choose Taxi Rent */}
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-2xl md:text-3xl font-bold text-left mb-6" data-aos="fade-up">Why choose Taxi Rent?</h2>
          <div className="relative flex flex-col gap-0 z-10" data-aos="fade-up">
            {/* Timeline Steps */}
            {[
              { icon: FaShieldAlt, title: 'Verified Drivers & Safe Rides', desc: 'All our drivers are background verified and trained for your safety' },
              { icon: FaDollarSign, title: 'Affordable & Transparent Pricing', desc: 'No hidden charges, clear pricing with upfront cost calculation' },
              { icon: FaMapMarkedAlt, title: 'Google Maps Integrated Easy Booking', desc: 'Seamless booking experience with real-time tracking and navigation' },
              { icon: FaCar, title: 'Sanitized Vehicles & 24x7 Support', desc: 'Clean, sanitized vehicles with round-the-clock customer support' },
              { icon: FaUsers, title: 'Trusted by 1000+ Customers', desc: 'Join thousands of satisfied customers who trust our service' },
            ].map((step, idx, arr) => (
              <div key={idx} className="flex flex-row items-center relative min-h-[56px]" data-aos="fade-up">
                {/* Vertical line (behind icons) */}
                {idx !== arr.length - 1 && (
                  <div className="absolute left-[22px] top-7 w-1 bg-yellow-300 z-0" data-aos="fade-up" style={{ height: 'calc(100% - 2px)' }}></div>
                )}
                {/* Icon in filled circle */}
                <div className="relative z-10 flex items-center justify-center mr-5" data-aos="fade-up">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400">
                    <step.icon size={28} color="#fff" />
                  </div>
                </div>
                {/* Text with hover effect - only this box animates, add margin and border-transparent */}
                <div className="flex-1">
                  <div className={`p-3 rounded-lg border border-transparent transition-all duration-200 hover:bg-white hover:shadow-lg hover:border-yellow-200${idx !== arr.length - 1 ? ' mb-4' : ''}`}>
                    <div className="font-semibold text-base">{step.title}</div>
                    <div className="text-gray-700 text-xs">{step.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Mobile: Stack icons and text, hide vertical line, add spacing */}
          <style>{`
            @media (max-width: 768px) {
              .timeline-mobile-stack { flex-direction: column !important; align-items: flex-start !important; }
              .timeline-mobile-stack .timeline-icons { flex-direction: row !important; margin-right: 0 !important; margin-bottom: 1rem !important; }
              .timeline-mobile-stack .timeline-icons .vertical-line { display: none !important; }
              .timeline-mobile-stack .timeline-icons > div { margin-bottom: 0 !important; margin-right: 1rem !important; }
              .timeline-mobile-stack .timeline-texts { max-width: 100% !important; }
            }
          `}</style>
        </div>
        
        {/* Right: Carousel */}
        <div className="flex justify-center items-center h-full" data-aos="fade-up">
          <div className="relative w-full max-w-xl h-[350px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
            {carouselImages.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={`Taxi Service ${idx + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                style={{ transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsTaxi;
