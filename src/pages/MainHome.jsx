import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import Footer from '../components/Footer';


const MainHome = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      id: 1,
      title: 'Taxi',
      image: '/images/bike-banner-1.jpeg',
      route: '/taxi',
      description: 'Book your taxi rides'
    },
    {
      id: 2,
      title: 'Bike',
      image: '/images/bike-banner-2.jpeg',
      route: '/home',
      description: 'Rent bikes for your journey'
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">LOGO</div>
          <div className="flex space-x-8">
            <a href="/" className="text-gray-800 hover:text-blue-600 transition-colors font-medium">Home</a>
            <a href="/about" className="text-gray-800 hover:text-blue-600 transition-colors font-medium">About</a>
            <a href="/contact" className="text-gray-800 hover:text-blue-600 transition-colors font-medium">Contact</a>
          </div>
        </div>
      </nav>

      {/* Page Title */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Our Services</h1>
        <p className="text-gray-600 text-lg">Choose from our range of transportation and tour services</p>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center py-12 px-6 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-50"></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {cardData.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
                             <Card 
                 className="cursor-pointer bg-white border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-2xl group relative overflow-hidden h-72"
                 onClick={() => handleCardClick(card.route)}
               >
                 <img 
                   src={card.image} 
                   alt={card.title}
                   className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                 />
               </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainHome;
