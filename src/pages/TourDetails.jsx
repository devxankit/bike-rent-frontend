import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import TourNavbar from '../components/TourNavbar';
import TourFooter from '../components/TourFooter';
import TourCard from '../components/TourCard';
import api from '../utils/api';
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers, 
  FaWhatsapp, 
  FaCheck, 
  FaTimes,
  FaCalendarAlt,
  FaLanguage,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { MdExplore, MdLocalActivity, MdRestaurant, MdHotel, MdDirections } from 'react-icons/md';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [tour, setTour] = useState(null);
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    const AOS = require('aos');
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
      easing: 'ease-out',
      delay: 0,
    });

    // Fetch tour details
    fetchTourDetails();
  }, [id]);

  const fetchTourDetails = async () => {
    try {
      const response = await api.get(`/api/tours/${id}`);
      setTour(response.data);
      
      // Fetch related tours
      const relatedResponse = await api.get(`/api/tours/${id}/related`);
      setRelatedTours(relatedResponse.data);
    } catch (error) {
      console.error('Failed to fetch tour details:', error);
      // Fallback to mock data if API fails
      setTour(tourData[1]);
      setRelatedTours([]);
    } finally {
      setLoading(false);
    }
  };

  // Mock tour data - in real app, this would come from API
  const tourData = {
    1: {
      id: 1,
      name: 'Mountain Adventure',
      duration: '3 Days / 2 Nights',
      price: '₹8,999',
      originalPrice: '₹12,999',
      discount: '31%',
      rating: 4.8,
      reviewCount: 127,
      location: 'Himalayan Mountains, Uttarakhand',
      difficulty: 'Moderate',
      groupSize: 'Max 12 people',
      languages: ['English', 'Hindi'],
      images: [
        '/images/bg.png',
        '/images/bike-banner-1.png',
        '/images/bike-banner-2.png',
        '/images/bike-banner-3.png'
      ],
      description: 'Experience the breathtaking beauty of the Himalayan mountains with our expertly guided adventure tour. This 3-day journey takes you through pristine landscapes, traditional villages, and offers stunning panoramic views that will leave you speechless.',
      highlights: [
        'Trek through scenic mountain trails',
        'Visit traditional Himalayan villages',
        'Experience local culture and cuisine',
        'Photography sessions at sunrise/sunset',
        'Camp under the stars',
        'Visit ancient temples and monasteries'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Acclimatization',
          activities: [
            'Arrive at base camp',
            'Welcome briefing and safety orientation',
            'Light acclimatization walk',
            'Traditional dinner and cultural program'
          ]
        },
        {
          day: 2,
          title: 'Mountain Trek & Village Visit',
          activities: [
            'Early morning trek to viewpoint',
            'Visit local village and interact with residents',
            'Traditional lunch with local family',
            'Photography session and nature walk'
          ]
        },
        {
          day: 3,
          title: 'Summit & Departure',
          activities: [
            'Sunrise trek to summit',
            'Breakfast with mountain views',
            'Descent and souvenir shopping',
            'Departure with memories'
          ]
        }
      ],
      inclusions: [
        'Professional mountain guide',
        'All meals (breakfast, lunch, dinner)',
        'Accommodation in mountain lodges',
        'Transportation to/from base camp',
        'Trekking equipment and safety gear',
        'Photography assistance',
        'Cultural program and local interactions',
        'First aid and emergency support'
      ],
      exclusions: [
        'Personal expenses and shopping',
        'Travel insurance (recommended)',
        'Alcoholic beverages',
        'Tips for guides and staff',
        'Any additional activities not mentioned'
      ],
      whatToBring: [
        'Warm clothing and rain gear',
        'Comfortable trekking shoes',
        'Personal medications',
        'Camera and extra batteries',
        'Sunscreen and sunglasses',
        'Water bottle and snacks'
      ],
      cancellationPolicy: 'Free cancellation up to 7 days before departure. 50% refund for cancellations 3-7 days before. No refund for cancellations less than 3 days before departure.',
      bestTimeToVisit: 'March to June and September to November',
      ageRestriction: 'Minimum age 12 years',
      fitnessLevel: 'Moderate fitness required'
    }
  };


  // Use tour from API or fallback to mock data
  const currentTour = tour || tourData[1];

  const handleWhatsAppBooking = () => {
    const message = `Hi! I'm interested in booking the "${currentTour.name}" tour package. Please provide more details.`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };


  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % currentTour.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + currentTour.images.length) % currentTour.images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (!currentTour) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour Not Found</h1>
          <p className="text-gray-600 mb-4">The tour you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/tour-home')}
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
          >
            Back to Tours
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <TourNavbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <button 
              onClick={() => navigate('/tour-home')}
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Tours
            </button>
            <FaChevronLeft className="w-3 h-3 text-gray-400 rotate-180" />
            <span className="text-gray-600">{currentTour.name}</span>
          </nav>
        </div>
      </div>

       {/* Hero Section with Images */}
       <section className="relative bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {/* Main Image */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              data-aos="fade-right"
            >
               <motion.div 
                 className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl md:rounded-2xl overflow-hidden"
                 initial={{ scale: 0.98, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 0.3, delay: 0.1 }}
               >
                <motion.img 
                  src={currentTour.images[selectedImage]} 
                  alt={currentTour.name}
                  className="w-full h-full object-cover"
                  key={selectedImage}
                  initial={{ scale: 1.02, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                
                {/* Image Navigation */}
                <motion.button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, x: -1 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FaChevronLeft className="w-4 h-4 text-gray-700" />
                </motion.button>
                <motion.button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, x: 1 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FaChevronRight className="w-4 h-4 text-gray-700" />
                </motion.button>

                {/* Image Counter */}
                <motion.div 
                  className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedImage + 1} / {currentTour.images.length}
                </motion.div>
              </motion.div>

               {/* Thumbnail Images */}
               <motion.div 
                 className="flex gap-2 sm:gap-3 mt-4 overflow-x-auto pb-2"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
               >
                 {currentTour.images.map((image, index) => (
                   <motion.button
                     key={index}
                     onClick={() => setSelectedImage(index)}
                     className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                       selectedImage === index ? 'border-yellow-400' : 'border-gray-200 hover:border-gray-300'
                     }`}
                     whileHover={{ scale: 1.02, y: -1 }}
                     whileTap={{ scale: 0.98 }}
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.5 + index * 0.05 }}
                   >
                     <img src={image} alt={`${currentTour.name} ${index + 1}`} className="w-full h-full object-cover" />
                   </motion.button>
                 ))}
               </motion.div>
            </motion.div>

             {/* Tour Info & Booking */}
             <motion.div 
               className="lg:col-span-1"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
               data-aos="fade-left"
             >
               <div className="sticky top-6">
                 <motion.div 
                   className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-200"
                   initial={{ scale: 0.98, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ duration: 0.3, delay: 0.3 }}
                 >
                   {/* Price & Discount */}
                   <motion.div 
                     className="mb-8"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4 }}
                   >
                     <div className="flex items-center gap-2 sm:gap-3 mb-3">
                       <motion.span 
                         className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
                         initial={{ scale: 0.95 }}
                         animate={{ scale: 1 }}
                         transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                       >
                         ₹{currentTour.price}
                       </motion.span>
                       <span className="text-lg sm:text-xl text-gray-500 line-through">₹{currentTour.originalPrice}</span>
                     </div>
                     <div className="flex items-center justify-between">
                       <p className="text-sm text-gray-600 font-medium">Per person</p>
                       <motion.span 
                         className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold"
                         initial={{ scale: 0.8 }}
                         animate={{ scale: 1 }}
                         transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
                       >
                         {currentTour.discount}% OFF
                       </motion.span>
                     </div>
                   </motion.div>


                   {/* Quick Info */}
                   <motion.div 
                     className="space-y-3 sm:space-y-4 mb-6 sm:mb-8"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.7 }}
                   >
                     {[
                       { icon: <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />, text: currentTour.duration },
                       { icon: <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />, text: currentTour.location },
                       { icon: <FaUsers className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />, text: currentTour.groupSize },
                       { icon: <MdDirections className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />, text: `Difficulty: ${currentTour.difficulty}` }
                     ].map((item, index) => (
                       <motion.div 
                         key={index}
                         className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-gray-50 rounded-lg"
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.8 + index * 0.05 }}
                         whileHover={{ x: 2, scale: 1.01 }}
                       >
                         <div className="flex-shrink-0">
                           {item.icon}
                         </div>
                         <span className="text-xs sm:text-sm text-gray-700 font-medium">{item.text}</span>
                       </motion.div>
                     ))}
                   </motion.div>

                   {/* Action Buttons */}
                   <motion.div 
                     className="space-y-4"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.0 }}
                   >
                     <motion.button
                       whileHover={{ scale: 1.01, y: -1 }}
                       whileTap={{ scale: 0.99 }}
                       onClick={handleWhatsAppBooking}
                       className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 1.1 }}
                     >
                       <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
                       <span className="hidden sm:inline">Book via WhatsApp</span>
                       <span className="sm:hidden">Book Now</span>
                     </motion.button>
                   </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

       {/* Tour Details Content */}
       <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 md:space-y-10 lg:space-y-12">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                 className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                 <motion.h2 
                   className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6"
                   initial={{ opacity: 0, x: -10 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.3, delay: 0.1 }}
                   viewport={{ once: true }}
                 >
                   Overview
                 </motion.h2>
                 <motion.p 
                   className="text-gray-600 leading-relaxed text-base sm:text-lg mb-4 sm:mb-6"
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.3, delay: 0.2 }}
                   viewport={{ once: true }}
                 >
                   {currentTour.description}
                 </motion.p>
                
                 <motion.h3 
                   className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4"
                   initial={{ opacity: 0, x: -10 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.3, delay: 0.3 }}
                   viewport={{ once: true }}
                 >
                   Tour Highlights
                 </motion.h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {currentTour.highlights.map((highlight, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 2, scale: 1.01 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.5 + index * 0.05, type: "spring", stiffness: 400 }}
                        viewport={{ once: true }}
                      >
                        <FaCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                      </motion.div>
                      <span className="text-gray-600">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Itinerary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                 className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Itinerary
                </motion.h2>
                <div className="space-y-6">
                  {currentTour.itinerary.map((day, index) => (
                    <motion.div 
                      key={index} 
                      className="border-l-4 border-yellow-400 pl-6"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 2, scale: 1.005 }}
                    >
                      <motion.h3 
                        className="text-xl font-semibold text-gray-900 mb-2"
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        Day {day.day}: {day.title}
                      </motion.h3>
                      <ul className="space-y-2">
                        {day.activities.map((activity, actIndex) => (
                          <motion.li 
                            key={actIndex} 
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -5 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: 0.5 + index * 0.1 + actIndex * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ x: 2 }}
                          >
                            <motion.div
                              initial={{ scale: 0.8, rotate: -45 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              transition={{ duration: 0.2, delay: 0.6 + index * 0.1 + actIndex * 0.05, type: "spring", stiffness: 400 }}
                              viewport={{ once: true }}
                            >
                              <FaClock className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                            </motion.div>
                            <span className="text-gray-600">{activity}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Inclusions & Exclusions */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                 className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
                data-aos="fade-up"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaCheck className="w-5 h-5 text-green-500" />
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {currentTour.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FaCheck className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaTimes className="w-5 h-5 text-red-500" />
                      What's Not Included
                    </h3>
                    <ul className="space-y-2">
                      {currentTour.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FaTimes className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* What to Bring */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                 className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
                data-aos="fade-up"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What to Bring</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {currentTour.whatToBring.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FaCheck className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

             {/* Sidebar */}
             <motion.div 
               className="lg:col-span-1 space-y-4 sm:space-y-6"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.4, delay: 0.3 }}
             >
              {/* Tour Info */}
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                 <motion.h3 
                   className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4"
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.3, delay: 0.1 }}
                   viewport={{ once: true }}
                 >
                   Tour Information
                 </motion.h3>
                <div className="space-y-4">
                  {[
                    { icon: <FaCalendarAlt className="w-5 h-5 text-yellow-500" />, label: "Best Time", value: currentTour.bestTimeToVisit },
                    { icon: <FaUsers className="w-5 h-5 text-yellow-500" />, label: "Age Restriction", value: currentTour.ageRestriction },
                    { icon: <MdDirections className="w-5 h-5 text-yellow-500" />, label: "Fitness Level", value: currentTour.fitnessLevel },
                    { icon: <FaLanguage className="w-5 h-5 text-yellow-500" />, label: "Languages", value: currentTour.languages.join(', ') }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 2, scale: 1.01 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, rotate: -45 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 + index * 0.05, type: "spring", stiffness: 400 }}
                        viewport={{ once: true }}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

               {/* Cancellation Policy */}
               <motion.div
                 initial={{ opacity: 0, x: 15 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                 viewport={{ once: true }}
                 className="bg-white rounded-2xl p-6 shadow-lg"
                 data-aos="fade-left"
                 data-aos-delay="200"
               >
                 <motion.h3 
                   className="text-xl font-semibold text-gray-900 mb-4"
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.3, delay: 0.2 }}
                   viewport={{ once: true }}
                 >
                   Cancellation Policy
                 </motion.h3>
                 <motion.p 
                   className="text-gray-600 text-sm leading-relaxed"
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.3, delay: 0.3 }}
                   viewport={{ once: true }}
                 >
                   {currentTour.cancellationPolicy}
                 </motion.p>
               </motion.div>

               {/* Key Highlights */}
               <motion.div
                 initial={{ opacity: 0, x: 15 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                 viewport={{ once: true }}
                 className="bg-white rounded-2xl p-6 shadow-lg"
                 data-aos="fade-left"
                 data-aos-delay="200"
               >
                 <motion.h3 
                   className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 "
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.3, delay: 0.2 }}
                   viewport={{ once: true }}
                 >
                   Key Highlights
                 </motion.h3>

                 {/* Features Grid */}
                 <div className="grid grid-cols-1 gap-3 mb-4">
                   {currentTour.features?.slice(0, 4).map((feature, index) => (
                     <motion.div 
                       key={index}
                       className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg"
                       initial={{ opacity: 0, x: -10 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                       viewport={{ once: true }}
                       whileHover={{ x: 2, scale: 1.01 }}
                     >
                       <motion.div
                         initial={{ scale: 0.8, rotate: -45 }}
                         whileInView={{ scale: 1, rotate: 0 }}
                         transition={{ duration: 0.2, delay: 0.4 + index * 0.1, type: "spring", stiffness: 400 }}
                         viewport={{ once: true }}
                       >
                         <FaCheck className="w-4 h-4 text-green-500" />
                       </motion.div>
                       <span className="text-sm text-gray-700 font-medium">{feature}</span>
                     </motion.div>
                   )) || [
                     'Professional Guide',
                     'All Meals Included',
                     'Transportation',
                     'Safety Equipment'
                   ].map((feature, index) => (
                     <motion.div 
                       key={index}
                       className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg"
                       initial={{ opacity: 0, x: -10 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                       viewport={{ once: true }}
                       whileHover={{ x: 2, scale: 1.01 }}
                     >
                       <motion.div
                         initial={{ scale: 0.8, rotate: -45 }}
                         whileInView={{ scale: 1, rotate: 0 }}
                         transition={{ duration: 0.2, delay: 0.4 + index * 0.1, type: "spring", stiffness: 400 }}
                         viewport={{ once: true }}
                       >
                         <FaCheck className="w-4 h-4 text-green-500" />
                       </motion.div>
                       <span className="text-sm text-gray-700 font-medium">{feature}</span>
                     </motion.div>
                   ))}
                 </div>

                 {/* Group Size */}
                 <div className="space-y-3">
                   <motion.div 
                     className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
                     initial={{ opacity: 0, x: -10 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.3, delay: 0.7 }}
                     viewport={{ once: true }}
                   >
                     <div className="flex items-center gap-2">
                       <FaUsers className="w-4 h-4 text-purple-500" />
                       <span className="text-sm text-gray-600">Group Size</span>
                     </div>
                     <span className="text-sm font-semibold text-gray-900">{currentTour.groupSize}</span>
                   </motion.div>
                 </div>
               </motion.div>

              {/* Terms & Conditions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
                data-aos="fade-left"
                data-aos-delay="250"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Terms & Conditions</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                  {currentTour.termsAndConditions && currentTour.termsAndConditions.length > 0 ? (
                    currentTour.termsAndConditions.map((term, index) => (
                      <li key={index}>{term}</li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No terms and conditions specified for this tour.</li>
                  )}
                </ul>
              </motion.div>

              {/* Travel Guidelines */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Guidelines</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                  {currentTour.guidelines && currentTour.guidelines.length > 0 ? (
                    currentTour.guidelines.map((guideline, index) => (
                      <li key={index}>{guideline}</li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No travel guidelines specified for this tour.</li>
                  )}
                </ul>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

       {/* Related Tours */}
       <section className="py-12 md:py-16 lg:py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
             <motion.h2 
               className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3, delay: 0.1 }}
               viewport={{ once: true }}
             >
               You Might Also Like
             </motion.h2>
             <motion.p 
               className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4"
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3, delay: 0.2 }}
               viewport={{ once: true }}
             >
               Discover more amazing tour packages that match your interests and travel style.
             </motion.p>
          </motion.div>

           {relatedTours.length > 0 ? (
             <motion.div 
               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 0.4, delay: 0.3 }}
               viewport={{ once: true }}
             >
              {relatedTours.map((relatedTour, index) => (
                <motion.div
                  key={relatedTour._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  viewport={{ once: true }}
                  data-aos="fade-up"
                  data-aos-delay={100 + index * 100}
                >
                  <TourCard tour={relatedTour} index={index} />
                </motion.div>
              ))}
            </motion.div>
           ) : (
             <motion.div
               className="text-center py-12"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4, delay: 0.3 }}
               viewport={{ once: true }}
             >
               <p className="text-gray-600 text-lg">No related tours found at the moment.</p>
               <button 
                 onClick={() => navigate('/tour-home')}
                 className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
               >
                 Explore All Tours
               </button>
             </motion.div>
           )}
        </div>
      </section>

      {/* Footer */}
      <TourFooter />
    </div>
  );
};

export default TourDetails;
