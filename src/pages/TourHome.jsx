import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TourNavbar from '../components/TourNavbar';
import TourFooter from '../components/TourFooter';
import TourCard from '../components/TourCard';
import CustomTourPackage from '../components/CustomTourPackage';
import WhyChooseUsTour from '../components/WhyChooseUsTour';
import { MdExplore } from 'react-icons/md';
import api from '../utils/api';
import SEOHead from '../components/SEOHead';

const TourHome = () => {
  const [tourPackages, setTourPackages] = useState([]);

  // Function to scroll to featured tours section
  const scrollToFeaturedTours = () => {
    const featuredSection = document.getElementById('featured-tours');
    if (featuredSection) {
      featuredSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    // Initialize AOS
    const AOS = require('aos');
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    // Fetch featured tours
    fetchFeaturedTours();
  }, []);

  const fetchFeaturedTours = async () => {
    try {
      const response = await api.get('/api/tours/featured');
      setTourPackages(response.data);
    } catch (error) {
      console.error('Failed to fetch featured tours:', error);
      // Set empty array if API fails - data comes from database
      setTourPackages([]);
    }
  };



  const stats = [
    { number: "10K+", label: "Happy Travelers" },
    { number: "500+", label: "Tour Packages" },
    { number: "50+", label: "Destinations" },
    { number: "4.8", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <SEOHead
        title="Tour Packages & Travel Deals | BookyourRide.Com"
        description="Discover amazing tour packages and travel deals with BookyourRide.com. Expert guides, memorable experiences, and custom tour packages for unforgettable adventures. Book now!"
        keywords="tour packages, travel deals, guided tours, custom tours, adventure travel, travel booking, tour guides, vacation packages"
        url="https://www.bookyourride.in/tours"
        image="https://www.bookyourride.in/images/tour-banner.jpeg"
        type="website"
        schemaType="TravelAgency"
      />
      
      {/* Navigation */}
      <TourNavbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
               style={{ backgroundImage: 'url(/images/tour-bg.jpeg)' }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-12 md:pt-16 lg:pt-20 pb-16">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              data-aos="fade-up"
            >
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Discover Amazing <span className='text-yellow-400'>Adventures</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Embark on unforgettable journeys with our expertly crafted tour packages. 
                From mountain peaks to coastal paradises, create memories that last a lifetime.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToFeaturedTours}
              className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-yellow-300 transition-all duration-300 flex items-center gap-2"
            >
              <MdExplore className="w-5 h-5" />
              Explore Tours
            </motion.button>
                
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tour Packages Section */}
      <section id="featured-tours" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            data-aos="fade-up"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Tour Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked experiences for unforgettable memories. Choose from our carefully curated selection of tour packages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tourPackages.map((tour, index) => (
              <TourCard key={tour.id || tour._id || `tour-${index}`} tour={tour} index={index} />
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
            data-aos="fade-up"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/tour-explore'}
              className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-300 transition-all duration-300"
            >
              View All Tours
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Custom Tour Package Section */}
      <CustomTourPackage />

      {/* Why Choose Us Section */}
      <WhyChooseUsTour />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of satisfied travelers who have experienced the world with us. 
              Your dream destination is just a click away.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-yellow-300 transition-all duration-300"
              onClick={() => window.location.href = '/tour-explore'}
            >
              Start Planning Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <TourFooter />
    </div>
  );
};

export default TourHome;