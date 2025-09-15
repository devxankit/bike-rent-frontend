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
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
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
            <div 
              className="lg:col-span-2"
              data-aos="fade-up"
            >
               <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl md:rounded-2xl overflow-hidden">
                <img 
                  src={currentTour.images[selectedImage]} 
                  alt={currentTour.name}
                  className="w-full h-full object-cover"
                  key={selectedImage}
                />
                
                {/* Image Navigation */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                >
                  <FaChevronLeft className="w-4 h-4 text-gray-700" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                >
                  <FaChevronRight className="w-4 h-4 text-gray-700" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImage + 1} / {currentTour.images.length}
                </div>
              </div>

               {/* Thumbnail Images */}
               <div className="flex gap-2 sm:gap-3 mt-4 overflow-x-auto pb-2">
                 {currentTour.images.map((image, index) => (
                   <button
                     key={index}
                     onClick={() => setSelectedImage(index)}
                     className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                       selectedImage === index ? 'border-yellow-400' : 'border-gray-200 hover:border-gray-300'
                     }`}
                   >
                     <img src={image} alt={`${currentTour.name} ${index + 1}`} className="w-full h-full object-cover" />
                   </button>
                 ))}
               </div>
            </div>

             {/* Tour Info & Booking */}
             <div 
               className="lg:col-span-1"
               data-aos="fade-up"
               data-aos-delay="200"
             >
               <div className="sticky top-6">
                 <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
                   {/* Price & Discount */}
                   <div className="mb-8">
                     <div className="flex items-center gap-2 sm:gap-3 mb-3">
                       <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                         ₹{currentTour.price}
                       </span>
                       <span className="text-lg sm:text-xl text-gray-500 line-through">₹{currentTour.originalPrice}</span>
                     </div>
                     <div className="flex items-center justify-between">
                       <p className="text-sm text-gray-600 font-medium">Per person</p>
                       <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                         {currentTour.discount}% OFF
                       </span>
                     </div>
                   </div>

                   {/* Quick Info */}
                   <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                     {[
                       { icon: <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />, text: currentTour.duration },
                       { icon: <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />, text: currentTour.location },
                       { icon: <FaUsers className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />, text: currentTour.groupSize },
                       { icon: <MdDirections className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />, text: `Difficulty: ${currentTour.difficulty}` }
                     ].map((item, index) => (
                       <div 
                         key={index}
                         className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-gray-50 rounded-lg"
                       >
                         <div className="flex-shrink-0">
                           {item.icon}
                         </div>
                         <span className="text-xs sm:text-sm text-gray-700 font-medium">{item.text}</span>
                       </div>
                     ))}
                   </div>

                   {/* Action Buttons */}
                   <div className="space-y-4">
                     <button
                       onClick={handleWhatsAppBooking}
                       className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                     >
                       <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
                       <span className="hidden sm:inline">Book via WhatsApp</span>
                       <span className="sm:hidden">Book Now</span>
                     </button>
                   </div>
                </div>
              </div>
            </div>
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
              <div
                 className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
                 data-aos="fade-up"
              >
                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                   Overview
                 </h2>
                 <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-4 sm:mb-6">
                   {currentTour.description}
                 </p>
                
                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                   Tour Highlights
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {currentTour.highlights.map((highlight, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-3"
                    >
                      <FaCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div
                 className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
                 data-aos="fade-up"
                 data-aos-delay="200"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Itinerary
                </h2>
                <div className="space-y-6">
                  {currentTour.itinerary.map((day, index) => (
                    <div 
                      key={index} 
                      className="border-l-4 border-yellow-400 pl-6"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Day {day.day}: {day.title}
                      </h3>
                      <ul className="space-y-2">
                        {day.activities.map((activity, actIndex) => (
                          <li 
                            key={actIndex} 
                            className="flex items-start gap-3"
                          >
                            <FaClock className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-600">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div
                 className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
                 data-aos="fade-up"
                 data-aos-delay="300"
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
              </div>

              {/* What to Bring */}
              <div
                 className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
                 data-aos="fade-up"
                 data-aos-delay="400"
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
              </div>
            </div>

             {/* Sidebar */}
             <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Tour Info */}
              <div
                className="bg-white rounded-2xl p-6 shadow-lg"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                   Tour Information
                 </h3>
                <div className="space-y-4">
                  {[
                    { icon: <FaCalendarAlt className="w-5 h-5 text-yellow-500" />, label: "Best Time", value: currentTour.bestTimeToVisit },
                    { icon: <FaUsers className="w-5 h-5 text-yellow-500" />, label: "Age Restriction", value: currentTour.ageRestriction },
                    { icon: <MdDirections className="w-5 h-5 text-yellow-500" />, label: "Fitness Level", value: currentTour.fitnessLevel },
                    { icon: <FaLanguage className="w-5 h-5 text-yellow-500" />, label: "Languages", value: currentTour.languages.join(', ') }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3"
                    >
                      {item.icon}
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

               {/* Cancellation Policy */}
               <div
                 className="bg-white rounded-2xl p-6 shadow-lg"
                 data-aos="fade-up"
                 data-aos-delay="200"
               >
                 <h3 className="text-xl font-semibold text-gray-900 mb-4">
                   Cancellation Policy
                 </h3>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   {currentTour.cancellationPolicy}
                 </p>
               </div>

               {/* Key Highlights */}
               <div
                 className="bg-white rounded-2xl p-6 shadow-lg"
                 data-aos="fade-up"
                 data-aos-delay="300"
               >
                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                   Key Highlights
                 </h3>

                 {/* Features Grid */}
                 <div className="grid grid-cols-1 gap-3 mb-4">
                   {currentTour.features?.slice(0, 4).map((feature, index) => (
                     <div 
                       key={index}
                       className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg"
                     >
                       <FaCheck className="w-4 h-4 text-green-500" />
                       <span className="text-sm text-gray-700 font-medium">{feature}</span>
                     </div>
                   )) || [
                     'Professional Guide',
                     'All Meals Included',
                     'Transportation',
                     'Safety Equipment'
                   ].map((feature, index) => (
                     <div 
                       key={index}
                       className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg"
                     >
                       <FaCheck className="w-4 h-4 text-green-500" />
                       <span className="text-sm text-gray-700 font-medium">{feature}</span>
                     </div>
                   ))}
                 </div>

                 {/* Group Size */}
                 <div className="space-y-3">
                   <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                     <div className="flex items-center gap-2">
                       <FaUsers className="w-4 h-4 text-purple-500" />
                       <span className="text-sm text-gray-600">Group Size</span>
                     </div>
                     <span className="text-sm font-semibold text-gray-900">{currentTour.groupSize}</span>
                   </div>
                 </div>
               </div>

              {/* Terms & Conditions */}
              <div
                className="bg-white rounded-2xl p-6 shadow-lg"
                data-aos="fade-up"
                data-aos-delay="400"
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
              </div>

              {/* Travel Guidelines */}
              <div
                className="bg-white rounded-2xl p-6 shadow-lg"
                data-aos="fade-up"
                data-aos-delay="500"
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
              </div>

            </div>
          </div>
        </div>
      </section>

       {/* Related Tours */}
       <section className="py-12 md:py-16 lg:py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-16"
            data-aos="fade-up"
          >
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
               You Might Also Like
             </h2>
             <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
               Discover more amazing tour packages that match your interests and travel style.
             </p>
          </div>

           {relatedTours.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedTours.map((relatedTour, index) => (
                <div
                  key={relatedTour._id}
                  data-aos="fade-up"
                  data-aos-delay={100 + index * 100}
                >
                  <TourCard tour={relatedTour} index={index} />
                </div>
              ))}
            </div>
           ) : (
             <div
               className="text-center py-12"
               data-aos="fade-up"
             >
               <p className="text-gray-600 text-lg">No related tours found at the moment.</p>
               <button 
                 onClick={() => navigate('/tour-home')}
                 className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
               >
                 Explore All Tours
               </button>
             </div>
           )}
        </div>
      </section>

      {/* Footer */}
      <TourFooter />
    </div>
  );
};

export default TourDetails;
