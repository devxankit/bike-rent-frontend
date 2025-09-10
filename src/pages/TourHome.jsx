import React from 'react';
import { motion } from 'framer-motion';
import TourNavbar from '../components/TourNavbar';
import TourFooter from '../components/TourFooter';
import TourBookingForm from '../components/TourBookingForm';
import TourCard from '../components/TourCard';

const TourHome = () => {
  const tourPackages = [
    {
      id: 1,
      name: 'Mountain Adventure',
      duration: '3 Days / 2 Nights',
      price: '₹8,999',
      image: '/images/bg.png',
      description: 'Explore the beautiful mountain ranges with our guided tour package. Experience breathtaking views, local culture, and adventure activities.',
      rating: 4.8
    },
    {
      id: 2,
      name: 'City Explorer',
      duration: '2 Days / 1 Night',
      price: '₹5,999',
      image: '/images/bg-3.png',
      description: 'Discover the hidden gems of the city with our expert guides. Visit historical sites, taste local cuisine, and shop for souvenirs.',
      rating: 4.6
    },
    {
      id: 3,
      name: 'Beach Paradise',
      duration: '4 Days / 3 Nights',
      price: '₹12,999',
      image: '/images/bike-banner-1.png',
      description: 'Relax and unwind at the most beautiful beaches. Enjoy water sports, sunset views, and beachside dining experiences.',
      rating: 4.9
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <TourNavbar />

      {/* Hero Section with Booking Form */}
      <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
               style={{ backgroundImage: 'url(/images/tour-bg.jpeg)' }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-5">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Booking Form on Left */}
            <div className="order-1 lg:order-1 flex justify-center">
              <TourBookingForm />
            </div>
            
            {/* Hero Text on Right */}
            <div className="order-2 lg:order-2 text-white lg:pl-12 flex flex-col items-start relative z-10">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Explore Amazing <span className='text-yellow-400'>Tours</span> <br />
                Your Adventure.
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Discover incredible destinations with our curated tour packages. 
                Professional guides, comfortable accommodations, and unforgettable experiences await you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tour Packages Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Tour Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked experiences for unforgettable memories. Choose from our carefully curated selection of tour packages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPackages.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <TourFooter />
    </div>
  );
};

export default TourHome;