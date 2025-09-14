import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TourNavbar from '../components/TourNavbar';
import TourFooter from '../components/TourFooter';
import TourCard from '../components/TourCard';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import api from '../utils/api';

const TourExplore = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    // Initialize AOS
    const AOS = require('aos');
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out',
    });

    // Fetch tours
    fetchTours();
  }, []);

  useEffect(() => {
    // Extract available categories from tours
    extractAvailableCategories();
    // Filter tours based on search and category
    filterTours();
  }, [tours, searchTerm, selectedCategory]);

  const fetchTours = async () => {
    try {
      const response = await api.get('/api/tours');
      setTours(response.data);
      setFilteredTours(response.data);
    } catch (error) {
      console.error('Failed to fetch tours:', error);
      // Fallback to mock data if API fails
      const mockTours = [
        {
          id: 1,
          name: 'Rajasthan Royal Heritage',
          duration: '5 Days / 4 Nights',
          price: 15999,
          originalPrice: 19999,
          discount: 20,
          rating: 4.8,
          reviewCount: 127,
          location: 'Jaipur, Jodhpur, Udaipur, Jaisalmer',
          difficulty: 'Easy',
          groupSize: 'Max 12 people',
          languages: ['English', 'Hindi'],
          images: ['/images/bg.png'],
          description: 'Experience the royal heritage of Rajasthan with visits to magnificent palaces, forts, and desert landscapes.',
          features: ['Palace Tours', 'Desert Safari', 'Cultural Shows', 'Traditional Cuisine'],
          category: 'Cultural',
          tags: ['rajasthan', 'heritage', 'palaces']
        },
        {
          id: 2,
          name: 'Goa Beach Paradise',
          duration: '4 Days / 3 Nights',
          price: 12999,
          originalPrice: 15999,
          discount: 19,
          rating: 4.9,
          reviewCount: 156,
          location: 'North Goa, South Goa',
          difficulty: 'Easy',
          groupSize: 'Max 15 people',
          languages: ['English', 'Hindi'],
          images: ['/images/bg-3.png'],
          description: 'Relax and unwind at the beautiful beaches of Goa with water sports and vibrant nightlife.',
          features: ['Beach Activities', 'Water Sports', 'Nightlife', 'Seafood'],
          category: 'Beach',
          tags: ['goa', 'beach', 'water sports']
        },
        {
          id: 3,
          name: 'Kashmir Valley Explorer',
          duration: '6 Days / 5 Nights',
          price: 18999,
          originalPrice: 22999,
          discount: 17,
          rating: 4.7,
          reviewCount: 98,
          location: 'Srinagar, Gulmarg, Pahalgam, Sonamarg',
          difficulty: 'Moderate',
          groupSize: 'Max 10 people',
          languages: ['English', 'Hindi'],
          images: ['/images/bike-banner-1.png'],
          description: 'Discover the breathtaking beauty of Kashmir with its pristine lakes, snow-capped mountains, and lush valleys.',
          features: ['Houseboat Stay', 'Gondola Ride', 'Trekking', 'Photography'],
          category: 'Adventure',
          tags: ['kashmir', 'mountains', 'lakes']
        },
        {
          id: 4,
          name: 'Spiritual Varanasi Journey',
          duration: '3 Days / 2 Nights',
          price: 8999,
          originalPrice: 11999,
          discount: 25,
          rating: 4.6,
          reviewCount: 89,
          location: 'Varanasi, Sarnath',
          difficulty: 'Easy',
          groupSize: 'Max 12 people',
          languages: ['English', 'Hindi'],
          images: ['/images/bike-banner-2.png'],
          description: 'Embark on a spiritual journey through the ancient city of Varanasi and its sacred ghats.',
          features: ['Ganga Aarti', 'Temple Visits', 'Boat Ride', 'Spiritual Experience'],
          category: 'Spiritual',
          tags: ['varanasi', 'spiritual', 'ghats']
        },
        {
          id: 5,
          name: 'Ladakh Adventure Quest',
          duration: '7 Days / 6 Nights',
          price: 22999,
          originalPrice: 26999,
          discount: 15,
          rating: 4.8,
          reviewCount: 112,
          location: 'Leh, Nubra Valley, Pangong Lake',
          difficulty: 'Hard',
          groupSize: 'Max 8 people',
          languages: ['English', 'Hindi'],
          images: ['/images/bike-banner-3.png'],
          description: 'Experience the raw beauty of Ladakh with its high-altitude lakes, monasteries, and stunning landscapes.',
          features: ['High Altitude', 'Monastery Visits', 'Camel Safari', 'Photography'],
          category: 'Adventure',
          tags: ['ladakh', 'high altitude', 'lakes']
        }
      ];
      setTours(mockTours);
      setFilteredTours(mockTours);
    } finally {
      setLoading(false);
    }
  };

  const extractAvailableCategories = () => {
    if (tours.length === 0) return;

    // Get unique categories from tours and count tours in each category
    const categoryMap = new Map();
    
    tours.forEach(tour => {
      if (tour.category) {
        const category = tour.category;
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
      }
    });

    // Convert to array and sort by count (descending)
    const categories = Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Add "Popular" at the beginning
    const availableCategories = [
      { name: 'Popular', count: tours.length },
      ...categories
    ];

    setAvailableCategories(availableCategories);
  };

  const filterTours = () => {
    let filtered = tours;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tour => 
        tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'Popular') {
      filtered = filtered.filter(tour => tour.category === selectedCategory);
    }

    setFilteredTours(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <TourNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Destinations Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-aos="fade-up"
          >
            {/* Section Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900">Top Destinations</h2>
              <button className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors duration-300">
                Explore all destinations
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={handleSearch}
                className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-lg"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
              {availableCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 ${
                    selectedCategory === category.name
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.name
                      ? 'bg-black/20 text-black'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Tour Cards Grid - Using Original TourCard Component */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
              </div>
            ) : filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTours.map((tour, index) => (
                  <TourCard key={tour.id || tour._id} tour={tour} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20"
                data-aos="fade-up"
              >
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Tours Found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any tours matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('Popular');
                    }}
                    className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <TourFooter />
    </div>
  );
};

export default TourExplore;
