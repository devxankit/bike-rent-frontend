import React from 'react';
import { Helmet } from 'react-helmet-async';
import TourNavbar from '../../components/TourNavbar';
import Footer from '../../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function TourAbout() {
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>About BookYourRide Tours | Your Trusted Tour Service Partner</title>
        <meta name="title" content="About BookYourRide Tours | Your Trusted Tour Service Partner" />
        <meta name="description" content="Discover BookYourRide reliable, affordable tour services across multiple destinations. Learn our story, values, and commitment to safe, comfortable, and memorable tour experiences for all travelers." />
        <meta name="keywords" content="about BookYourRide tours, tour service company, guided tours, tour packages, tour operator history, trusted tour service" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="BookYourRide" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bookyourride.in/tours/about" />
        <meta property="og:title" content="About BookYourRide Tours | Your Trusted Tour Service Partner" />
        <meta property="og:description" content="Discover BookYourRide reliable, affordable tour services across multiple destinations. Learn our story, values, and commitment to safe, comfortable, and memorable tour experiences for all travelers." />
        <meta property="og:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        <meta property="og:site_name" content="BookYourRide" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.bookyourride.in/tours/about" />
        <meta property="twitter:title" content="About BookYourRide Tours | Your Trusted Tour Service Partner" />
        <meta property="twitter:description" content="Discover BookYourRide reliable, affordable tour services across multiple destinations. Learn our story, values, and commitment to safe, comfortable, and memorable tour experiences for all travelers." />
        <meta property="twitter:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDB813" />
        <link rel="canonical" href="https://www.bookyourride.in/tours/about" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "About BookYourRide Tours | Your Trusted Tour Service Partner",
            "description": "Discover BookYourRide reliable, affordable tour services across multiple destinations. Learn our story, values, and commitment to safe, comfortable, and memorable tour experiences for all travelers.",
            "url": "https://www.bookyourride.in/tours/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "BookYourRide",
              "url": "https://www.bookyourride.in/",
              "logo": "https://www.bookyourride.in/images/bike-rent-logo-2.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "9368584334",
                "contactType": "customer service"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 22.7196,
                  "longitude": 75.8577
                },
                "geoRadius": "500000"
              }
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <TourNavbar />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/tour-bg.jpeg')" }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-aos="fade-up">
              About <span className="text-yellow-400">BookYourRide Tours</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Your trusted partner for comfortable, reliable, and affordable tour services across multiple destinations. 
              We're committed to making your journey safe, convenient, and memorable.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6">
                  BookYourRide Tours started with a simple vision: to make travel accessible, 
                  comfortable, and memorable for everyone. What began as a local tour service has 
                  grown into a trusted name across multiple destinations, serving thousands of satisfied travelers.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  We understand that every journey matters - whether it's a city tour, 
                  a cultural exploration, or an adventure trip. That's why we've built our 
                  service around your comfort, safety, and unforgettable experiences.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold">
                    5+ Years Experience
                  </div>
                  <div className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold">
                    10K+ Happy Travelers
                  </div>
                </div>
              </div>
              <div data-aos="fade-left">
                <img 
                  src="/images/tour-bg.jpeg" 
                  alt="Our Tour Service" 
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do and shape the experience we provide to our travelers.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center" data-aos="fade-up" data-aos-delay="100">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Safety First</h3>
                <p className="text-gray-600">
                  Your safety is our top priority. All our guides are experienced, licensed, 
                  and our vehicles undergo regular maintenance and safety checks.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg text-center" data-aos="fade-up" data-aos-delay="200">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Punctuality</h3>
                <p className="text-gray-600">
                  We understand the value of your time. Our tours start on time and we provide 
                  real-time updates so you always know what to expect.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg text-center" data-aos="fade-up" data-aos-delay="300">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Care</h3>
                <p className="text-gray-600">
                  We believe in building lasting relationships. Our customer support team is 
                  available 24/7 to assist you with any queries or concerns.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg text-center" data-aos="fade-up" data-aos-delay="400">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Transparent Pricing</h3>
                <p className="text-gray-600">
                  No hidden charges, no surprises. We provide clear, upfront pricing so you 
                  know exactly what you're paying for before you book.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg text-center" data-aos="fade-up" data-aos-delay="500">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Service</h3>
                <p className="text-gray-600">
                  Book in seconds, tour in minutes. Our streamlined booking process and 
                  efficient dispatch system ensure you get a tour when you need it.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg text-center" data-aos="fade-up" data-aos-delay="600">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quality Tours</h3>
                <p className="text-gray-600">
                  From city tours to adventure trips, we maintain a diverse range of well-planned 
                  tours to suit every interest and budget.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose BookYourRide Tours?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're not just another tour service. We're your travel partner, committed to making every journey exceptional.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Professional Guides</h3>
                      <p className="text-gray-600">Our guides are experienced, knowledgeable, and passionate about sharing the beauty of each destination.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Availability</h3>
                      <p className="text-gray-600">Whether it's early morning or late night, we're always available for your tour needs.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Updates</h3>
                      <p className="text-gray-600">Get real-time updates about your tour schedule and any changes that might affect your experience.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div data-aos="fade-left">
                <img 
                  src="/images/tour-bg.jpeg" 
                  alt="Why Choose Us" 
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div data-aos="fade-up" data-aos-delay="100">
                <div className="text-4xl md:text-5xl font-extrabold text-black mb-2">10K+</div>
                <div className="text-lg text-black font-semibold">Happy Travelers</div>
              </div>
              <div data-aos="fade-up" data-aos-delay="200">
                <div className="text-4xl md:text-5xl font-extrabold text-black mb-2">5+</div>
                <div className="text-lg text-black font-semibold">Years Experience</div>
              </div>
              <div data-aos="fade-up" data-aos-delay="300">
                <div className="text-4xl md:text-5xl font-extrabold text-black mb-2">25+</div>
                <div className="text-lg text-black font-semibold">Destinations</div>
              </div>
              <div data-aos="fade-up" data-aos-delay="400">
                <div className="text-4xl md:text-5xl font-extrabold text-black mb-2">4.8/5</div>
                <div className="text-lg text-black font-semibold">Traveler Rating</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
}
